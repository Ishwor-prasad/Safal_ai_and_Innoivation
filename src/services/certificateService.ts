import { supabase, isSupabaseConfigured } from "../lib/supabase";

// ══════════════════════════════════════════════════════════════════════════
// Types
// ══════════════════════════════════════════════════════════════════════════

export interface CertificateRecipient {
  name: string;
  course: string;
  issuedOn: string; // date string (YYYY-MM-DD)
  phone?: string;   // mobile number (digits, incl. country code if used)
  email?: string;
  location?: string;   // where the training was held
  conductedOn?: string; // training date range, e.g. "27/08/2026 to 01/09/2026"
  leftSignatory?: string;   // default "Ishwor Dhungana"
  leftRole?: string;        // default "Lead AI Facilitator"
  rightSignatory?: string;  // default "Uday Ram Jaishi"
  rightRole?: string;       // default "Chief Executive Officer"
}

export interface PublishedCertificate {
  id: string;
  recipient: CertificateRecipient;
  verifyUrl: string;
}

export interface CertificateBatchMeta {
  id: string;
  batchNumber: string;
  certCount: number;
  createdAt: string;
}

export interface CertificateLookup {
  id: string;
  batchId: string | null;
  recipient: CertificateRecipient;
}

// ══════════════════════════════════════════════════════════════════════════
// Web Crypto helpers (AES-256-GCM via PBKDF2)
// ══════════════════════════════════════════════════════════════════════════

const PBKDF2_ITERATIONS = 310_000;
const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let s = "";
  bytes.forEach((b) => { s += String.fromCharCode(b); });
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export function randomBytes(length: number): Uint8Array {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return arr;
}

async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encrypt(plaintext: string, passphrase: string): Promise<{ cipher: string; salt: string; iv: string }> {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = await deriveKey(passphrase, salt);
  const cipherBuf = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(plaintext)
  );
  return { cipher: toBase64Url(new Uint8Array(cipherBuf)), salt: toBase64Url(salt), iv: toBase64Url(iv) };
}

export async function decrypt(cipher: string, passphrase: string, salt: string, iv: string): Promise<string> {
  const key = await deriveKey(passphrase, fromBase64Url(salt));
  const plainBuf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64Url(iv) },
    key,
    fromBase64Url(cipher)
  );
  return new TextDecoder().decode(plainBuf);
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(input));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ══════════════════════════════════════════════════════════════════════════
// Credential handling — phone or email is the per-trainee unlock key.
// ══════════════════════════════════════════════════════════════════════════

export type CredentialKind = "phone" | "email";

export interface NormalizedCredential {
  kind: CredentialKind;
  value: string;
}

/**
 * Normalize what a trainee types so matching is forgiving:
 * - email → trimmed, lowercase
 * - phone → digits only (accepts +977, spaces, dashes); needs >= 9 digits
 */
export function normalizeCredential(input: string): NormalizedCredential | null {
  const s = input.trim();
  if (!s) return null;
  if (s.includes("@")) {
    return { kind: "email", value: s.toLowerCase() };
  }
  const digits = s.replace(/\D/g, "");
  if (digits.length >= 9) return { kind: "phone", value: digits };
  return null;
}

function credentialKey(cred: NormalizedCredential): string {
  // namespace so a phone and email never collide
  return cred.kind === "phone" ? `safal::p::${cred.value}` : `safal::e::${cred.value}`;
}

async function credentialHash(cred: NormalizedCredential): Promise<string> {
  return sha256Hex(credentialKey(cred));
}

/** Choose the primary credential for a recipient: phone preferred, else email. */
export function primaryCredential(recipient: Pick<CertificateRecipient, "phone" | "email">): NormalizedCredential | null {
  if (recipient.phone) {
    const p = normalizeCredential(recipient.phone);
    if (p && p.kind === "phone") return p;
  }
  if (recipient.email) {
    const e = normalizeCredential(recipient.email);
    if (e && e.kind === "email") return e;
  }
  return null;
}

/** All valid credentials for a recipient — phone AND email each unlock the cert. */
export function credentialsForRecipient(recipient: Pick<CertificateRecipient, "phone" | "email">): NormalizedCredential[] {
  const creds: NormalizedCredential[] = [];
  if (recipient.phone) {
    const p = normalizeCredential(recipient.phone);
    if (p && p.kind === "phone") creds.push(p);
  }
  if (recipient.email) {
    const e = normalizeCredential(recipient.email);
    if (e && e.kind === "email") creds.push(e);
  }
  return creds;
}

// ══════════════════════════════════════════════════════════════════════════
// Vault gate — one shared secret code (hashed) guarding the upload section.
// Default "goldenpine"; override with VITE_VAULT_CODE.
// ══════════════════════════════════════════════════════════════════════════

const VAULT_OVERRIDE = (import.meta.env.VITE_VAULT_CODE as string | undefined)?.trim();

export async function checkVaultCode(input: string): Promise<boolean> {
  const value = input.trim();
  if (!value) return false;
  const hash = await sha256Hex(value.trim());
  if (VAULT_OVERRIDE) return hash === (await sha256Hex(VAULT_OVERRIDE));
  return hash === "a3321f60796f385245322ef866e94de9b474361e0c511413453a12d0ac877bd8"; // sha256("goldenpine")
}

export function isVaultUnlocked(): boolean {
  try { return sessionStorage.getItem("safal_vault_unlocked") === "1"; } catch { return false; }
}

export function unlockVault() {
  try { sessionStorage.setItem("safal_vault_unlocked", "1"); } catch { /* ignore */ }
}

export function lockVault() {
  try { sessionStorage.removeItem("safal_vault_unlocked"); } catch { /* ignore */ }
}

// ══════════════════════════════════════════════════════════════════════════
// CSV → recipients (paste from Google Sheets)
// ══════════════════════════════════════════════════════════════════════════

/** Parse pasted CSV into recipient rows. Accepts a header row with any of:
 *  name, course, phone/mobile, email, location, conducted-on/date-range */
export function parseCsvToRecipients(csv: string): CertificateRecipient[] {
  const lines = csv.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  // Detect quoted CSV cells (Google Sheets exports quotes on commas)
  const cellsOf = (line: string): string[] => {
    const out: string[] = [];
    let cur = "";
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
        else inQ = !inQ;
      } else if (ch === "," && !inQ) {
        out.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    out.push(cur.trim());
    return out;
  };

  const header = cellsOf(lines[0]).map((h) => h.toLowerCase());
  const idx = (keys: string[]): number => header.findIndex((h) => keys.some((k) => h.includes(k)));

  const colName = idx(["name"]);
  const colCourse = idx(["course", "program", "training", "batch title"]);
  const colPhone = idx(["phone", "mobile", "number", "contact", "telephone", "mob"]);
  const colEmail = idx(["email", "e-mail"]);
  const colLocation = idx(["location", "venue", "place"]);
  const colConducted = idx(["conducted", "date range", "dates", "date"]);

  const recipients: CertificateRecipient[] = [];
  for (let i = 1; i < lines.length; i++) {
    const c = cellsOf(lines[i]);
    const name = colName >= 0 ? c[colName] ?? "" : "";
    if (!name) continue;
    recipients.push({
      name,
      course: colCourse >= 0 ? c[colCourse] || "" : "",
      issuedOn: "",
      phone: colPhone >= 0 ? c[colPhone] || "" : "",
      email: colEmail >= 0 ? c[colEmail] || "" : "",
      location: colLocation >= 0 ? c[colLocation] || "" : "",
      conductedOn: colConducted >= 0 ? c[colConducted] || "" : "",
    });
  }
  return recipients;
}

// ══════════════════════════════════════════════════════════════════════════
// Local (non-Supabase) persistence — used when Supabase is not configured
// so the feature still works in demo/dev mode. Stored data is still encrypted.
// ══════════════════════════════════════════════════════════════════════════

interface LocalRow {
  id: string;
  codeHash: string;
  batchId: string | null;
  cipher: string;
  salt: string;
  iv: string;
}

interface LocalBatch {
  id: string;
  title: string;
  batchNumber: string;
  certCount: number;
  createdAt: string;
  cipher: string;
  salt: string;
  iv: string;
}

const LS_CERTS_KEY = "safal_certificates_v1";
const LS_BATCHES_KEY = "safal_certificate_batches_v1";

function readLocalRows(): LocalRow[] {
  try {
    return JSON.parse(localStorage.getItem(LS_CERTS_KEY) || "[]") as LocalRow[];
  } catch {
    return [];
  }
}

function writeLocalRows(rows: LocalRow[]) {
  localStorage.setItem(LS_CERTS_KEY, JSON.stringify(rows));
}

function readLocalBatches(): LocalBatch[] {
  try {
    return JSON.parse(localStorage.getItem(LS_BATCHES_KEY) || "[]") as LocalBatch[];
  } catch {
    return [];
  }
}

function writeLocalBatches(batches: LocalBatch[]) {
  localStorage.setItem(LS_BATCHES_KEY, JSON.stringify(batches));
}

// ══════════════════════════════════════════════════════════════════════════
// Public API
// ══════════════════════════════════════════════════════════════════════════

export interface PublishResult {
  batchId: string;
  batchNumber: string;
  certificates: PublishedCertificate[];
  skipped: { name: string; reason: string }[];
}

/**
 * Publish a batch of certificates.
 * @param title        Human-readable batch title (stored encrypted with passphrase)
 * @param batchNumber  Public label, e.g. "42" or "43" — shown in the batch browser
 * @param passphrase   Vault passphrase — never stored; encrypts the admin sheet copy
 * @param recipients   Each must carry at least a phone OR email (the unlock key)
 */
export async function publishCertificateBatch(
  title: string,
  batchNumber: string,
  passphrase: string,
  recipients: CertificateRecipient[]
): Promise<PublishResult> {
  const published: PublishedCertificate[] = [];
  const skipped: { name: string; reason: string }[] = [];
  const batchId = crypto.randomUUID();

  for (const recipient of recipients) {
    const creds = credentialsForRecipient(recipient);
    if (creds.length === 0) {
      const reason = recipient.phone || recipient.email
        ? `Unrecognized contact format (use 9+ digit number or email)` : `No phone or email`;
      skipped.push({ name: recipient.name || "(unnamed)", reason });
      continue;
    }
    const id = crypto.randomUUID();

    // One row per credential so the trainee's phone AND email both unlock.
    for (const cred of creds) {
      const hash = await credentialHash(cred);
      const { cipher, salt, iv } = await encrypt(JSON.stringify(recipient), credentialKey(cred));

      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from("certificates")
          .insert({ batch_id: batchId, code_hash: hash, payload: cipher, salt, iv });
        if (error) throw new Error(error.message);
      } else {
        const rows = readLocalRows();
        rows.push({ id, codeHash: hash, batchId, cipher, salt, iv });
        writeLocalRows(rows);
      }
    }

    published.push({
      id,
      recipient,
      verifyUrl: buildVerifyUrl(),
    });
  }

  // Persist the admin sheet (encrypted with the vault passphrase)
  const sheetPayload = JSON.stringify({ title, batchNumber, certificates: published });
  const { cipher, salt, iv } = await encrypt(sheetPayload, passphrase);

  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from("certificate_batches")
      .insert({
        id: batchId,
        admin_payload: cipher,
        salt,
        iv,
        cert_count: published.length,
        metadata: { batch_number: batchNumber },
      });
    if (error) throw new Error(error.message);
  } else {
    const batches = readLocalBatches();
    batches.push({
      id: batchId,
      title,
      batchNumber,
      certCount: published.length,
      createdAt: new Date().toISOString(),
      cipher,
      salt,
      iv,
    });
    writeLocalBatches(batches);
  }

  return { batchId, batchNumber, certificates: published, skipped };
}

/** Public batch browser (number + count + date only — names stay encrypted). */
export async function listBatches(): Promise<CertificateBatchMeta[]> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("certificate_batches")
      .select("id, created_at, cert_count, metadata")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r: any) => ({
      id: r.id,
      batchNumber: String(r?.metadata?.batch_number ?? r.id.slice(0, 8)),
      certCount: Number(r?.cert_count ?? 0),
      createdAt: r.created_at,
    }));
  }
  return readLocalBatches()
    .map((b) => ({ id: b.id, batchNumber: b.batchNumber, certCount: b.certCount, createdAt: b.createdAt }))
    .reverse();
}

const DEMO_BATCH_ID = null;

/**
 * Seed a single real demo certificate so visitors can try the flow.
 * Uses open demo credentials (phone 9800000000 or email demo@safalai.com.np).
 * Idempotent per browser; self-heals if the row is removed.
 */
export async function ensureDemoCertificate(): Promise<{ credential: NormalizedCredential; recipient: CertificateRecipient } | null> {
  const flag = "safal_demo_seeded_v1";
  const cached = localStorage.getItem(flag);
  if (cached) {
    try {
      const marker = JSON.parse(cached) as { credential: NormalizedCredential; recipient: CertificateRecipient };
      const hash = await credentialHash(marker.credential);
      const rowStillExists = isSupabaseConfigured
        ? Boolean((await supabase.from("certificates").select("id").eq("code_hash", hash).maybeSingle()).data)
        : readLocalRows().some((r) => r.codeHash === hash);
      if (rowStillExists) return marker;
    } catch { /* fall through and re-seed */ }
  }

  const demoPhone = "9800000000";
  const recipient: CertificateRecipient = {
    name: "Samir Shrestha",
    course: "AI Fundamentals & Prompt Engineering",
    issuedOn: "2026-08-30",
    phone: demoPhone,
    email: "demo@safalai.com.np",
    location: "Prakriti Resources Centre, Kathmandu",
    conductedOn: "27/08/2026 to 01/09/2026",
  };
  const cred = normalizeCredential(demoPhone)!;
  const creds = credentialsForRecipient(recipient);
  for (const c of creds) {
    const hash = await credentialHash(c);
    const { cipher, salt, iv } = await encrypt(JSON.stringify(recipient), credentialKey(c));

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from("certificates")
        .insert({ batch_id: DEMO_BATCH_ID, code_hash: hash, payload: cipher, salt, iv });
      if (error) throw new Error(error.message);
    } else {
      const rows = readLocalRows();
      rows.push({ id: crypto.randomUUID(), codeHash: hash, batchId: DEMO_BATCH_ID, cipher, salt, iv });
      writeLocalRows(rows);
    }
  }

  const marker = { credential: cred, recipient };
  try { localStorage.setItem(flag, JSON.stringify(marker)); } catch { /* ignore quota */ }
  return marker;
}

/**
 * Find + unlock a certificate using a phone number or email.
 * The credential is the decryption key — nothing is revealed without it.
 */
export async function lookupByCredential(input: string): Promise<CertificateLookup | null> {
  const cred = normalizeCredential(input);
  if (!cred) return null;

  const hash = await credentialHash(cred);
  let row: { id: string; batch_id: string | null; payload: string; salt: string; iv: string } | null = null;

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("certificates")
      .select("id, batch_id, payload, salt, iv")
      .eq("code_hash", hash)
      .maybeSingle();
    if (error) throw new Error(error.message);
    row = data as typeof row;
  } else {
    const local = readLocalRows().find((r) => r.codeHash === hash);
    if (local) row = { id: local.id, batch_id: local.batchId, payload: local.cipher, salt: local.salt, iv: local.iv };
  }

  if (!row) return null;

  try {
    const json = await decrypt(row.payload, credentialKey(cred), row.salt, row.iv);
    const recipient = JSON.parse(json) as CertificateRecipient;
    return { id: row.id, batchId: row.batch_id, recipient };
  } catch {
    return null; // wrong credential / tampered row
  }
}

/**
 * Load an admin's published sheet back so they can re-copy links.
 */
export async function loadCertificateBatch(
  batchId: string | null,
  passphrase: string
): Promise<{ title: string; batchNumber: string; certificates: PublishedCertificate[] } | null> {
  if (isSupabaseConfigured) {
    if (!batchId) return null;
    const { data, error } = await supabase
      .from("certificate_batches")
      .select("id, admin_payload, salt, iv, metadata")
      .eq("id", batchId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return null;

    try {
      const json = await decrypt(data.admin_payload, passphrase, data.salt, data.iv);
      const parsed = JSON.parse(json) as { title: string; batchNumber?: string; certificates?: PublishedCertificate[]; recipients?: PublishedCertificate[] };
      return {
        title: parsed.title,
        batchNumber: parsed.batchNumber ?? String((data.metadata as any)?.batch_number ?? ""),
        certificates: parsed.certificates ?? parsed.recipients ?? [],
      };
    } catch {
      return null; // wrong passphrase
    }
  }

  const batch = readLocalBatches().find((b) => b.id === batchId) ?? null;
  if (!batch) return null;
  try {
    const json = await decrypt(batch.cipher, passphrase, batch.salt, batch.iv);
    const parsed = JSON.parse(json) as { title: string; batchNumber?: string; certificates?: PublishedCertificate[]; recipients?: PublishedCertificate[] };
    return {
      title: parsed.title,
      batchNumber: parsed.batchNumber ?? batch.batchNumber,
      certificates: parsed.certificates ?? parsed.recipients ?? [],
    };
  } catch {
    return null;
  }
}

export function buildVerifyUrl(): string {
  return `${window.location.origin}/certificates`;
}

// CSV export of the admin sheet — opens directly in Excel / Google Sheets
export function certificatesToCsv(certificates: PublishedCertificate[]): string {
  const header = ["Name", "Course", "Phone", "Email", "Issued On", "Verify Link"];
  const rows = certificates.map((c) => [
    c.recipient.name,
    c.recipient.course,
    c.recipient.phone || "",
    c.recipient.email || "",
    c.recipient.issuedOn,
    c.verifyUrl,
  ]);
  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;
  return [header, ...rows].map((r) => r.map(escape).join(",")).join("\n");
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}