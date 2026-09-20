import { supabase, isSupabaseConfigured } from "../lib/supabase";

// ══════════════════════════════════════════════════════════════════════════
// Types
// ══════════════════════════════════════════════════════════════════════════

export interface CertificateRecipient {
  name: string;
  course: string;
  issuedOn: string; // date string (YYYY-MM-DD)
  location?: string;   // where the training was held
  conductedOn?: string; // training date range, e.g. "27/08/2026 to 01/09/2026"
  leftSignatory?: string;   // default "Ishwor Dhungana"
  leftRole?: string;        // default "Lead AI Facilitator"
  rightSignatory?: string;  // default "Uday Ram Jaishi"
  rightRole?: string;       // default "Chief Executive Officer"
}

export interface PublishedCertificate {
  id: string;
  code: string;
  codeHash: string;
  recipient: CertificateRecipient;
  verifyUrl: string;
}

export interface CertificateBatch {
  id: string;
  title: string;
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

const PBKDF2_ITERATIONS = 210_000;
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
// Certificate code generation
// ══════════════════════════════════════════════════════════════════════════

const CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // no 0/O/1/I

export function generateCertificateCode(): string {
  const bytes = randomBytes(8);
  let code = "";
  for (let i = 0; i < bytes.length; i++) {
    code += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
    if (i === 3) code += "-";
  }
  return code;
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
  certificates: PublishedCertificate[];
}

/**
 * Publish a batch of certificates.
 * @param title        Human-readable batch title (stored encrypted with passphrase)
 * @param passphrase   Admin-only key — never stored; used to derive the AES key
 * @param recipients   List of { name, course, issuedOn }
 * Returns the published certificates (each with its code + verify URL) so the
 * admin can copy/share them. The returned codes are the ONLY way to decrypt.
 */
export async function publishCertificateBatch(
  title: string,
  passphrase: string,
  recipients: CertificateRecipient[]
): Promise<PublishResult> {
  const published: PublishedCertificate[] = [];
  let batchId = crypto.randomUUID();

  for (const recipient of recipients) {
    const code = generateCertificateCode();
    const codeHash = await sha256Hex(`safal::${code.toUpperCase()}`);
    const { cipher, salt, iv } = await encrypt(JSON.stringify(recipient), code);

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from("certificates")
        .insert({ batch_id: batchId, code_hash: codeHash, payload: cipher, salt, iv });
      if (error) throw new Error(error.message);
    } else {
      const rows = readLocalRows();
      rows.push({
        id: crypto.randomUUID(),
        codeHash,
        batchId,
        cipher,
        salt,
        iv,
      });
      writeLocalRows(rows);
    }

    published.push({
      id: crypto.randomUUID(),
      code,
      codeHash,
      recipient,
      verifyUrl: buildVerifyUrl(code),
    });
  }

  // Persist the admin sheet (encrypted with the master passphrase)
  const sheetPayload = JSON.stringify({ title, recipients, published });
  const { cipher, salt, iv } = await encrypt(sheetPayload, passphrase);

  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from("certificate_batches")
      .insert({ id: batchId, admin_payload: cipher, salt, iv, cert_count: published.length });
    if (error) throw new Error(error.message);
  } else {
    const batches = readLocalBatches();
    batches.push({
      id: batchId,
      title,
      certCount: published.length,
      createdAt: new Date().toISOString(),
      cipher,
      salt,
      iv,
    });
    writeLocalBatches(batches);
  }

  return { batchId, certificates: published };
}

const DEMO_BATCH_ID = null;

/**
 * Seed a single real demo certificate so visitors can try the verification
 * flow without an admin sheet. The record goes through the exact same
 * encrypt → store → lookup pipeline as published certificates; the returned
 * code is the unlock key. Idempotent per browser (localStorage flag).
 */
export async function ensureDemoCertificate(): Promise<{ code: string; recipient: CertificateRecipient } | null> {
  const flag = "safal_demo_seeded_v1";
  const cached = localStorage.getItem(flag);
  if (cached) {
    try {
      const marker = JSON.parse(cached) as { code: string; recipient: CertificateRecipient };
      const codeHash = await sha256Hex(`safal::${marker.code.toUpperCase()}`);
      const rowStillExists = isSupabaseConfigured
        ? Boolean((await supabase.from("certificates").select("id").eq("code_hash", codeHash).maybeSingle()).data)
        : readLocalRows().some((r) => r.codeHash === codeHash);
      if (rowStillExists) return marker;
    } catch { /* fall through and re-seed */ }
  }

  const recipient: CertificateRecipient = {
    name: "Samir Shrestha",
    course: "AI Fundamentals & Prompt Engineering",
    issuedOn: "2026-08-30",
    location: "Prakriti Resources Centre, Kathmandu",
    conductedOn: "27/08/2026 to 01/09/2026",
  };
  const code = generateCertificateCode();
  const codeHash = await sha256Hex(`safal::${code.toUpperCase()}`);
  const { cipher, salt, iv } = await encrypt(JSON.stringify(recipient), code);

  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from("certificates")
      .insert({ batch_id: DEMO_BATCH_ID, code_hash: codeHash, payload: cipher, salt, iv });
    if (error) throw new Error(error.message);
  } else {
    const rows = readLocalRows();
    rows.push({ id: crypto.randomUUID(), codeHash, batchId: DEMO_BATCH_ID, cipher, salt, iv });
    writeLocalRows(rows);
  }

  const marker = { code, recipient };
  try { localStorage.setItem(flag, JSON.stringify(marker)); } catch { /* ignore quota */ }
  return marker;
}

/**
 * Look up a certificate by its code.
 * The code is the decryption key — nothing is revealed unless the code is correct.
 */
export async function lookupCertificate(code: string): Promise<CertificateLookup | null> {
  const trimmed = code.trim().toUpperCase();
  if (!trimmed) return null;

  const codeHash = await sha256Hex(`safal::${trimmed}`);
  let row: { id: string; batch_id: string | null; payload: string; salt: string; iv: string } | null = null;

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("certificates")
      .select("id, batch_id, payload, salt, iv")
      .eq("code_hash", codeHash)
      .maybeSingle();
    if (error) throw new Error(error.message);
    row = data as typeof row;
  } else {
    const local = readLocalRows().find((r) => r.codeHash === codeHash);
    if (local) row = { id: local.id, batch_id: local.batchId, payload: local.cipher, salt: local.salt, iv: local.iv };
  }

  if (!row) return null;

  try {
    const json = await decrypt(row.payload, trimmed, row.salt, row.iv);
    const recipient = JSON.parse(json) as CertificateRecipient;
    return { id: row.id, batchId: row.batch_id, recipient };
  } catch {
    return null; // wrong code / tampered row
  }
}

/**
 * Load an admin's published sheet back so they can re-copy links.
 */
export async function loadCertificateBatch(
  code: string | null,
  passphrase: string
): Promise<{ title: string; certificates: PublishedCertificate[] } | null> {
  if (isSupabaseConfigured) {
    if (!code) return null;
    const { data, error } = await supabase
      .from("certificate_batches")
      .select("id, admin_payload, salt, iv")
      .eq("id", code)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return null;

    try {
      const json = await decrypt(data.admin_payload, passphrase, data.salt, data.iv);
      return JSON.parse(json) as { title: string; certificates: PublishedCertificate[] };
    } catch {
      return null; // wrong passphrase
    }
  }

  const batch = readLocalBatches().find((b) => b.id === code) ?? null;
  if (!batch) return null;
  try {
    const json = await decrypt(batch.cipher, passphrase, batch.salt, batch.iv);
    return JSON.parse(json) as { title: string; certificates: PublishedCertificate[] };
  } catch {
    return null;
  }
}

export function buildVerifyUrl(code: string): string {
  return `${window.location.origin}${window.location.pathname === "/certificates" ? "/certificates" : ""}?v=${encodeURIComponent(code)}`;
}

export function extractCodeFromUrl(): string | null {
  try {
    return new URLSearchParams(window.location.search).get("v");
  } catch {
    return null;
  }
}

// CSV export of the admin sheet — opens directly in Excel / Google Sheets
export function certificatesToCsv(certificates: PublishedCertificate[]): string {
  const header = ["Name", "Course", "Issued On", "Certificate Code", "Verify Link"];
  const rows = certificates.map((c) => [
    c.recipient.name,
    c.recipient.course,
    c.recipient.issuedOn,
    c.code,
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