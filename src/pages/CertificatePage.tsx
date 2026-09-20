import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Eye,
  Download,
  Link2,
  Copy,
  Check,
  FileSpreadsheet,
  Lock,
  Users,
  Loader2,
  ArrowRight,
  KeyRound,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  LogOut,
  Search,
  CalendarDays,
  MapPin,
  Hash,
  ArrowLeft,
  Upload,
  FileText,
} from "lucide-react";
import sigLeftUrl from "../assets/signature-left.png";
import sigRightUrl from "../assets/signature-right.png";
import {
  publishCertificateBatch,
  lookupByCredential,
  loadCertificateBatch,
  buildVerifyUrl,
  certificatesToCsv,
  downloadCsv,
  ensureDemoCertificate,
  parseCsvToRecipients,
  checkVaultCode,
  isVaultUnlocked,
  unlockVault,
  listBatches,
  CertificateRecipient,
  CertificateLookup,
  PublishedCertificate,
  CertificateBatchMeta,
} from "../services/certificateService";

interface CertificatePageProps {
  navigate: (path: string) => void;
  language: "en" | "ne";
}

type Lang = "en" | "ne";

// ══════════════════════════════════════════════════════════════════════════
// Canvas certificate renderer (crisp PNG downloads, no external libs)
// Ports the SAFAL A4-landscape design: binary-tech band, network mountains,
// triangle logo, navy/gold/green palette, signature blocks, seal, star.
// Bilingual: body text renders in EN or NE.
// ══════════════════════════════════════════════════════════════════════════

const CERT_W = 1600; // A4 landscape ratio 1.414:1
const CERT_H = 1131;

const ORG_NAVY = "#10253d";
const GOLD = "#b9964f";
const EMERALD = "#00a878";
const BIN_TINT = "rgba(180,105,105,0.14)";
const BRICK = "rgba(183,110,110,0.16)";
const BRICK_LINE = "rgba(183,110,110,0.4)";
const INK = "#1c1c1c";

// Real signatures extracted from the official issued certificate (transparent PNGs)
const signatureCache = new Map<string, HTMLImageElement>();
function getSignature(url: string): Promise<HTMLImageElement | null> {
  const hit = signatureCache.get(url);
  if (hit) return Promise.resolve(hit);
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => { signatureCache.set(url, img); resolve(img); };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function drawSignature(ctx: CanvasRenderingContext2D, img: HTMLImageElement | null, cx: number, lineY: number) {
  if (!img || !img.naturalWidth) return;
  const targetH = 96;
  const w = (img.naturalWidth / img.naturalHeight) * targetH;
  ctx.drawImage(img, cx - w / 2, lineY - targetH + 8, w, targetH);
}

const SERIF = "'Fraunces','Noto Sans Devanagari',Georgia,serif";
const BODY = "Inter,'Noto Sans Devanagari',sans-serif";

interface RenderOpts extends CertificateRecipient {
  lang: Lang;
}

const CERT_TEXT: Record<Lang, any> = {
  en: {
    orgSub: "A N D   I N N O V A T I O N   C E N T R E",
    tagline: "EMPOWERING MINDS, BUILDING INTELLIGENCE",
    title: "CERTIFICATE",
    titleSub: "O F   C O M P L E T I O N",
    certifyThat: "THIS IS TO CERTIFY THAT",
    hasCompleted: "has successfully completed the",
    organizedBy: (l: string) => `organized by Safal AI and Innovation Centre, held at ${l}`,
    conducted: (d: string) => `The training was conducted from ${d}`,
    close1: "We commend your dedication and commitment to learning,",
    close2: "and wish you success in your future endeavors.",
    leftRole: "Lead AI Facilitator",
    rightRole: "Chief Executive Officer",
    verified: "VERIFIED",
  },
  ne: {
    orgSub: "र   इनोभेसन   सेन्टर",
    tagline: "सक्षम दिमाग, बुद्धिमत्ता निर्माण",
    title: "प्रमाणपत्र",
    titleSub: "सफल समाप्तिको",
    certifyThat: "यो प्रमाणित गरिन्छ कि",
    hasCompleted: "ले सफलतापूर्वक पूरा गरेको छ",
    organizedBy: (l: string) => `साफल एआई एन्ड इनोभेसन सेन्टरद्वारा आयोजित, स्थान: ${l}`,
    conducted: (d: string) => `तालिम ${d} सम्म सञ्चालन गरिएको थियो`,
    close1: "हामी तपाईंको समर्पण र सिकाइप्रतिको प्रतिबद्धताको प्रशंसा गर्दछौं,",
    close2: "र तपाईंको भविष्यका प्रयासहरूमा सफलताको कामना गर्दछौं।",
    leftRole: "प्रमुख एआई प्रशिक्षक",
    rightRole: "प्रमुख कार्यकारी अधिकृत",
    verified: "प्रमाणित",
  },
};

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function fitFont(ctx: CanvasRenderingContext2D, text: string, family: string, startPx: number, maxWidth: number): number {
  let px = startPx;
  ctx.font = `${px}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && px > 20) {
    px -= 2;
    ctx.font = `${px}px ${family}`;
  }
  return px;
}

function drawCircularText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  fontSize: number
) {
  ctx.font = `${fontSize}px ${BODY}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const step = (Math.PI * 2) / (text.length * 1.05);
  for (let i = 0; i < text.length; i++) {
    const angle = startAngle + step * i;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.fillText(text[i], 0, -radius);
    ctx.restore();
  }
}

async function drawCertificateImage(cert: RenderOpts): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = CERT_W;
  canvas.height = CERT_H;
  const ctx = canvas.getContext("2d")!;

  const cx = CERT_W / 2;
  const T = CERT_TEXT[cert.lang];

  // ── Paper (cream, subtle vignette) ──
  const paper = ctx.createLinearGradient(0, 0, 0, CERT_H);
  paper.addColorStop(0, "#fdfcf8");
  paper.addColorStop(0.55, "#f9f6ef");
  paper.addColorStop(1, "#f4efe4");
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, CERT_W, CERT_H);

  // ── Binary-tech backdrop (rotated, faint) ──
  const bitRow = "0101011010010110100101101010010110100101011001010101101";
  const binCx = CERT_W * 3 / 5;
  const binCy = CERT_H * 0.3;
  ctx.save();
  ctx.translate(binCx, binCy);
  ctx.rotate(-0.14);
  ctx.fillStyle = BIN_TINT;
  ctx.font = "16px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  for (let i = -8; i <= 8; i++) {
    ctx.fillText(bitRow, i * 170, i * 30 * -1 + 10);
  }
  ctx.restore();

  // ── Network mountains (bottom polygon) ──
  const mTop = CERT_H - 566;
  const mp: Array<[number, number]> = [
    [0, 1], [0.1, 0.57], [0.18, 0.78], [0.3, 0.2], [0.43, 0.7],
    [0.53, 0.35], [0.66, 0.75], [0.78, 0.27], [0.9, 0.7], [1, 0.45], [1, 1],
  ];
  ctx.beginPath();
  ctx.moveTo(0, CERT_H);
  mp.forEach(([px, py]) => ctx.lineTo(px * CERT_W, mTop + py * 566));
  ctx.closePath();
  ctx.fillStyle = BRICK;
  ctx.fill();
  ctx.beginPath();
  mp.forEach(([px, py], i) => {
    const [x, y] = [px * CERT_W, mTop + py * 566];
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = BRICK_LINE;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, CERT_H - 1);
  ctx.lineTo(CERT_W, CERT_H - 1);
  ctx.strokeStyle = BRICK_LINE;
  ctx.lineWidth = 2;
  ctx.stroke();

  // ── Triangle logo (top-left) ──
  const logo = [
    { x: 245, y: 96 },
    { x: 158, y: 226 },
    { x: 332, y: 226 },
  ];
  ctx.beginPath();
  ctx.moveTo(logo[0].x, logo[0].y);
  ctx.lineTo(logo[1].x, logo[1].y);
  ctx.lineTo(logo[2].x, logo[2].y);
  ctx.closePath();
  ctx.fillStyle = EMERALD;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(235, 122);
  ctx.lineTo(196, 200);
  ctx.moveTo(255, 122);
  ctx.lineTo(294, 200);
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(245, 122);
  ctx.lineTo(245, 196);
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // ── Header wordmark ──
  const headCx = CERT_W * 0.5;
  ctx.textAlign = "center";
  ctx.fillStyle = ORG_NAVY;
  ctx.font = `700 58px ${SERIF}`;
  ctx.fillText("SAFAL AI", headCx, 150);
  ctx.fillStyle = GOLD;
  ctx.font = `500 15px ${BODY}`;
  ctx.fillText(T.orgSub, headCx, 186);
  ctx.fillStyle = GOLD;
  ctx.font = `italic 500 14px ${BODY}`;
  ctx.fillText(T.tagline, headCx, 214);

  // ── Title ──
  ctx.fillStyle = ORG_NAVY;
  ctx.font = `700 86px ${SERIF}`;
  ctx.fillText(T.title, cx, 420);
  ctx.fillStyle = GOLD;
  ctx.font = `500 21px ${BODY}`;
  ctx.fillText(T.titleSub, cx, 468);
  const dividerW = 560;
  ctx.beginPath();
  ctx.moveTo(cx - dividerW / 2, 506);
  ctx.lineTo(cx + dividerW / 2, 506);
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 3;
  ctx.stroke();

  // ── "THIS IS TO CERTIFY THAT" ──
  ctx.fillStyle = ORG_NAVY;
  ctx.font = `600 16px ${BODY}`;
  ctx.fillText(T.certifyThat, cx, 566);

  // ── Name (serif, gold underline) ──
  const namePx = fitFont(ctx, cert.name, `700 ${SERIF}`, 92, 1150);
  ctx.font = `${namePx}px 700 ${SERIF}`;
  ctx.fillStyle = ORG_NAVY;
  ctx.fillText(cert.name, cx, 682);
  const nameWidth = ctx.measureText(cert.name).width;
  ctx.beginPath();
  ctx.moveTo(cx - nameWidth / 2 - 18, 706);
  ctx.lineTo(cx + nameWidth / 2 + 18, 706);
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 4;
  ctx.stroke();

  // ── Body ──
  const bodyCx = cx;
  const bodyW = 1000;
  const location = cert.location || "Prakriti Resources Centre, Kathmandu";
  const conductedOn = cert.conductedOn || cert.issuedOn;
  let y = 772;
  ctx.textAlign = "center";
  ctx.fillStyle = INK;
  ctx.font = `400 19px ${BODY}`;
  ctx.fillText(T.hasCompleted, bodyCx, y);
  y += 40;
  ctx.font = `700 30px ${SERIF}`;
  const courseLines = wrapText(ctx, cert.course, bodyW).slice(0, 2);
  ctx.font = `${fitFont(ctx, cert.course, `700 ${SERIF}`, 30, bodyW)}px 700 ${SERIF}`;
  courseLines.forEach((l, i) => ctx.fillText(l, bodyCx, y + i * 38));
  y += courseLines.length * 38;
  ctx.font = `400 19px ${BODY}`;
  ctx.fillStyle = INK;
  const orgLine = T.organizedBy(location);
  const orgLines = wrapText(ctx, orgLine, bodyW).slice(0, 2);
  orgLines.forEach((l, i) => ctx.fillText(l, bodyCx, y + i * 30));
  y += orgLines.length * 30;
  const dateLine = T.conducted(conductedOn);
  ctx.fillText(dateLine, bodyCx, y + 2);

  // Closing
  ctx.font = `italic 400 17px ${BODY}`;
  ctx.fillStyle = "#5a5a5a";
  ctx.fillText(T.close1, bodyCx, y + 64);
  ctx.fillText(T.close2, bodyCx, y + 92);

  // ── Signatures ──
  const sigY = 1024;
  const leftX = 620;
  const rightX = 1035;
  ctx.strokeStyle = "#b8b2a0";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(leftX - 150, sigY);
  ctx.lineTo(leftX + 150, sigY);
  ctx.moveTo(rightX - 150, sigY);
  ctx.lineTo(rightX + 150, sigY);
  ctx.stroke();

  // ── Real handwritten signatures (from the official issued certificate) ──
  const [sigLeft, sigRight] = await Promise.all([getSignature(sigLeftUrl), getSignature(sigRightUrl)]);
  drawSignature(ctx, sigLeft, leftX, sigY);
  drawSignature(ctx, sigRight, rightX, sigY);

  ctx.textAlign = "center";
  ctx.fillStyle = ORG_NAVY;
  ctx.font = `700 18px ${SERIF}`;
  ctx.fillText(cert.leftSignatory || "Ishwor Dhungana", leftX, sigY + 34);
  ctx.fillText(cert.rightSignatory || "Uday Ram Jaishi", rightX, sigY + 34);
  ctx.fillStyle = "#6b675c";
  ctx.font = `500 13px ${BODY}`;
  ctx.fillText(cert.leftRole || T.leftRole, leftX, sigY + 56);
  ctx.fillText(cert.rightRole || T.rightRole, rightX, sigY + 56);

  // ── Star (left) ──
  ctx.fillStyle = GOLD;
  ctx.font = "110px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("★", 205, 996);

  // ── Seal (right) ──
  const sealX = 1330;
  const sealY = 970;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 96, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(185,150,79,0.08)";
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = GOLD;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(sealX, sealY, 84, 0, Math.PI * 2);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  drawCircularText(ctx, "SAFAL AI AND INNOVATION CENTRE ESTD. 2026", sealX, sealY, 74, -Math.PI / 2, 15);
  ctx.fillStyle = ORG_NAVY;
  ctx.textAlign = "center";
  ctx.font = `600 30px ${SERIF}`;
  ctx.fillText("★", sealX, sealY - 6);
  ctx.font = `600 19px ${BODY}`;
  ctx.fillStyle = INK;
  ctx.fillText(T.verified, sealX, sealY + 28);

  return canvas;
}

// ══════════════════════════════════════════════════════════════════════════
// Page
// ══════════════════════════════════════════════════════════════════════════

const UI: Record<Lang, any> = {
  en: {
    badge: "Encrypted Verification System",
    title1: "Digital Certificates,",
    title2: "Verified & Encrypted",
    hero: "Complete a batch, upload the trainee sheet, and every one of them gets a verifiable certificate locked to their phone or email.",
    verifyTab: "Verify a Certificate",
    publishTab: "Upload Center",
    verifyHeading: "Unlock your certificate",
    verifySub: "Enter the phone number or email used in your registration. Your credential is the only key.",
    credLabel: "Phone number or email",
    credPlaceholder: "e.g. 9801234567  or  name@email.com",
    verifyBtn: "Verify Certificate",
    sampleBtn: "View sample certificate",
    notFound: "No certificate was found for that phone or email. If you just completed a batch, contact your trainer.",
    demoHint: "Demo unlocked with 9800000000 or demo@safalai.com.np · name Samir Shrestha",
    verifiedFor: "Certificate verified for",
    copyLink: "Copy share link",
    copyLinkDone: "Link copied",
    download: "Download PNG",
    verifyAnywhere: "Verify this credential anytime on safalai.com.np/certificates · Secured with AES-256-GCM",
    vaultFail: "Incorrect vault code. Please try again.",
    vaultLoading: "Checking…",
    vaultOpen: "Unlock Upload Center",
    vaultSub: "This section is locked. Enter the secret vault code to upload a trainee sheet.",
    vaultPlaceholder: "Secret vault code",
    vaultBtn: "Unlock",
    batchNo: "Batch number",
    batchNoPlaceholder: "e.g. 42 or 43",
    batchTitle: "Batch title (optional)",
    batchTitlePlaceholder: "e.g. AI Teachers Masterclass",
    issuedOn: "Issued date",
    location: "Location (optional)",
    locationPlaceholder: "e.g. Prakriti Resources Centre",
    conductedOn: "Conducted on (optional)",
    conductedPlaceholder: "e.g. 27/08/2026 to 01/09/2026",
    defaultCourse: "Default course (optional — fills empty Course cells)",
    csvLabel: "Paste trainees from Google Sheets (CSV)",
    csvTip: "Paste from a sheet, upload a .csv file, or load a sheet link. Columns: Name, Course, Phone/Mobile, Email (Location, Conducted-on optional). Rows without a phone or email are skipped.",
    csvEmpty: "No rows detected yet. Paste your sheet above.",
    uploadCsv: "Upload .csv file",
    sheetLink: "Load from Google Sheets link",
    sheetLinkPlaceholder: "https://docs.google.com/spreadsheets/d/...",
    loadSheet: "Load sheet",
    sheetLinkErr: "Couldn't open that sheet — make sure it's shared 'Anyone with the link → Viewer' and it starts with a header row.",
    back: "Back to verification",
    publishBtn: (n: number) => `Encrypt & Publish ${n} certificates`,
    noValidRows: "No valid rows — every trainee needs at least a phone or email.",
    skipped: (n: number) => `${n} row(s) skipped — no phone/email`,
    reload: "Reload a sheet (re-copy links)",
    reloadSub: "Batch id + vault code. In demo mode a batch list currently shown below.",
    reloadBtn: "Decrypt & reload",
    noSheet: "Nothing published yet",
    noSheetSub: "Create a sheet on the left — every shareable link appears here.",
    certCount: (n: number) => `${n} certificate${n !== 1 ? "s" : ""} encrypted & stored`,
    batchId: (id: string) => `Batch id: ${id}`,
    export: "Export CSV",
    copyAll: "Copy all",
    new: "New",
    thName: "Name",
    thCred: "Phone / Email",
    thLink: "Share link",
    securityTitle: "Why this is safe even on a public website / repository:",
    sec1: "Every certificate is encrypted in your browser with its owner's phone or email as the AES-256-GCM key — nothing visible without that credential.",
    sec2: "Batch sheets are encrypted with the vault code, which is never stored or transmitted.",
    sec3: "The database only holds ciphertext + one-way hashes, so a full public dump stays unreadable.",
    footerTitle: "Running a training batch?",
    footerSub: "Publish a batch, hand each trainee their credential, and they verify + download their own certificate.",
    footerBtn: "Open Upload Center",
    batchesHeading: "Find your batch",
    batchesEmpty: "No batches published yet.",
    batchOf: (n: string) => `Batch ${n}`,
    navigate: (path: string) => path,
  },
  ne: {
    badge: "इन्क्रिप्टेड प्रमाणीकरण प्रणाली",
    title1: "डिजिटल प्रमाणपत्र,",
    title2: "प्रमाणित र इन्क्रिप्टेड",
    hero: "ब्याच पूरा गरेपछि विद्यार्थीको सूची अपलोड गर्नुहोस् — प्रत्येकलाई उनको फोन वा इमेलसँग बाँधिएको प्रमाणपत्र प्राप्त हुन्छ।",
    verifyTab: "प्रमाणपत्र जाँच्नुहोस्",
    publishTab: "अपलोड केन्द्र",
    verifyHeading: "आफ्नो प्रमाणपत्र अनलक गर्नुहोस्",
    verifySub: "दर्तामा प्रयोग गरिएको फोन नम्बर वा इमेल लेख्नुहोस्। तपाईंको विवरण नै कुञ्जी हो।",
    credLabel: "फोन नम्बर वा इमेल",
    credPlaceholder: "जस्तै: 9801234567 वा name@email.com",
    verifyBtn: "प्रमाणपत्र प्रमाणित गर्नुहोस्",
    sampleBtn: "नमूना प्रमाणपत्र हेर्नुहोस्",
    notFound: "त्यो फोन वा इमेलको लागि कुनै प्रमाणपत्र फेला परेन। ब्याच भर्खरै पूरा भएको भए आफ्नो प्रशिक्षकलाई सम्पर्क गर्नुहोस्।",
    demoHint: "नमूना: 9800000000 वा demo@safalai.com.np · नाम Samir Shrestha",
    verifiedFor: "का लागि प्रमाणपत्र प्रमाणित भयो",
    copyLink: "लिंक कपी गर्नुहोस्",
    copyLinkDone: "लिंक कपी भयो",
    download: "PNG डाउनलोड",
    verifyAnywhere: "safalai.com.np/certificates मा जुनसुकै बेला प्रमाणित गर्नुहोस् · AES-256-GCM द्वारा सुरक्षित",
    vaultFail: "भल्ट कोड गलत छ। फेरि प्रयास गर्नुहोस्।",
    vaultLoading: "जाँच हुँदै…",
    vaultOpen: "अपलोड केन्द्र खोल्नुहोस्",
    vaultSub: "यो सेक्सन लक गरिएको छ। अपलोड गर्न गोप्य भल्ट कोड लेख्नुहोस्।",
    vaultPlaceholder: "गोप्य भल्ट कोड",
    vaultBtn: "खोल्नुहोस्",
    batchNo: "ब्याच नम्बर",
    batchNoPlaceholder: "जस्तै: 42 वा 43",
    batchTitle: "ब्याच शीर्षक (वैकल्पिक)",
    batchTitlePlaceholder: "जस्तै: AI Teachers Masterclass",
    issuedOn: "जारी मिति",
    location: "स्थान (वैकल्पिक)",
    locationPlaceholder: "जस्तै: Prakriti Resources Centre",
    conductedOn: "सञ्चालन मिति (वैकल्पिक)",
    conductedPlaceholder: "जस्तै: २७/०८/२०२६ देखि ०१/०९/२०२६",
    defaultCourse: "पूर्वनिर्धारित पाठ्यक्रम (वैकल्पिक)",
    csvLabel: "गुगल शीटबाट विद्यार्थी टाँस्नुहोस् (CSV)",
    csvTip: "शीटबाट टाँस्नुहोस्, .csv फाइल अपलोड गर्नुहोस् वा शीट लिंक लोड गर्नुहोस्। Name, Course, Phone/Mobile, Email स्तम्भहरू (Location, Conducted-on वैकल्पिक)। फोन वा इमेल नभएका लाई छोडिन्छ।",
    csvEmpty: "अहिलेसम्म कुनै पङ्क्ति देखिएको छैन। माथि आफ्नो शीट टाँस्नुहोस्।",
    uploadCsv: ".csv फाइल अपलोड",
    sheetLink: "गुगल शीट लिंकबाट लोड",
    sheetLinkPlaceholder: "https://docs.google.com/spreadsheets/d/...",
    loadSheet: "शीट लोड",
    sheetLinkErr: "शीट खोल्न सकिएन — 'Anyone with the link → Viewer' सेयर गरिएको र हेडर पङ्क्तिले सुरु भएको सुनिश्चित गर्नुहोस्।",
    back: "प्रमाणीकरणमा फर्कनुहोस्",
    publishBtn: (n: number) => `${n} प्रमाणपत्र इन्क्रिप्टेड र प्रकाशित गर्नुहोस्`,
    noValidRows: "मान्य पङ्क्ति छैन — प्रत्येक विद्यार्थीलाई फोन वा इमेल चाहिन्छ।",
    skipped: (n: number) => `${n} पङ्क्ति छाडियो — फोन/इमेल छैन`,
    reload: "पहिलेको शीट पुनः खोल्नुहोस्",
    reloadSub: "ब्याच id र भल्ट कोड।",
    reloadBtn: "डिक्रिप्ट गरी खोल्नुहोस्",
    noSheet: "अहिलेसम्म केही प्रकाशित छैन",
    noSheetSub: "बायाँबाट शीट बनाउनुहोस् — सबै लिंक यहाँ देखिनेछन्।",
    certCount: (n: number) => `${n} प्रमाणपत्र इन्क्रिप्टेड र भण्डारण गरियो`,
    batchId: (id: string) => `ब्याच id: ${id}`,
    export: "CSV निर्यात",
    copyAll: "सबै कपी",
    new: "नयाँ",
    thName: "नाम",
    thCred: "फोन / इमेल",
    thLink: "शेयर लिंक",
    securityTitle: "सार्वजनिक वेबसाइट/रिपोजिटरी भए पनि यो किन सुरक्षित छ:",
    sec1: "हरेक प्रमाणपत्र मालिकको फोन वा इमेललाई AES-256-GCM कुञ्जी बनाएर ब्राउजरमै इन्क्रिप्ट हुन्छ — सो विवरण बिना केही पढ्न सकिँदैन।",
    sec2: "ब्याच शीट भल्ट कोडले इन्क्रिप्ट हुन्छ, जुन कहिल्यै भण्डारण हुँदैन।",
    sec3: "डाटाबेसमा सिफरटेक्स्ट र वन-वे ह्यास मात्रै हुन्छ — सार्वजनिक डाटा बाँड्दा पनि अपठनीय नै रहन्छ।",
    footerTitle: "तालिम ब्याच चलाउँदै हुनुहुन्छ?",
    footerSub: "ब्याच प्रकाशित गर्नुहोस्, प्रत्येक विद्यार्थीलाई विवरण दिनुहोस् — उनीहरू आफैं प्रमाणित गरेर डाउनलोड गर्न सक्छन्।",
    footerBtn: "अपलोड केन्द्र खोल्नुहोस्",
    batchesHeading: "आफ्नो ब्याच पत्ता लगाउनुहोस्",
    batchesEmpty: "अहिलेसम्म कुनै ब्याच प्रकाशित छैन।",
    batchOf: (n: string) => `ब्याच ${n}`,
    navigate: (path: string) => path,
  },
};

export const CertificatePage: React.FC<CertificatePageProps> = ({ navigate, language }) => {
  const lang = language === "ne" ? "ne" : "en";
  const T = UI[lang];

  const [tab, setTab] = useState<"verify" | "publish">("verify");

  // ── Verify state ──
  const [credential, setCredential] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [certificate, setCertificate] = useState<CertificateLookup | null>(null);
  const [certCanvas, setCertCanvas] = useState<HTMLCanvasElement | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const certContainerRef = useRef<HTMLDivElement | null>(null);
  const certOverlayHostRef = useRef<HTMLDivElement | null>(null);

  // ── Batch browser state ──
  const [batches, setBatches] = useState<CertificateBatchMeta[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);

  // ── Publish state ──
  const [vaultCode, setVaultCode] = useState("");
  const [vaultUnlocked, setVaultUnlocked] = useState(isVaultUnlocked());
  const [vaultLoading, setVaultLoading] = useState(false);
  const [vaultError, setVaultError] = useState<string | null>(null);

  const [batchNumber, setBatchNumber] = useState("");
  const [sheetTitle, setSheetTitle] = useState("AI for Teachers");
  const [issuedOn, setIssuedOn] = useState(() => new Date().toISOString().slice(0, 10));
  const [location, setLocation] = useState("Online");
  const [conductedOn, setConductedOn] = useState("");
  const [course, setCourse] = useState("");
  const [csvText, setCsvText] = useState("");
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [published, setPublished] = useState<PublishedCertificate[] | null>(null);
  const [publishedTitle, setPublishedTitle] = useState<string | null>(null);
  const [publishedBatchNumber, setPublishedBatchNumber] = useState<string | null>(null);
  const [publishCopied, setPublishCopied] = useState(false);
  const [showSheetLink, setShowSheetLink] = useState(false);
  const [sheetLinkInput, setSheetLinkInput] = useState("");
  const [sheetLoading, setSheetLoading] = useState(false);
  const [sheetLinkError, setSheetLinkError] = useState<string | null>(null);
  const [reloadMode, setReloadMode] = useState(false);
  const [reloadAuth, setReloadAuth] = useState("");
  const [reloadLoading, setReloadLoading] = useState(false);
  const [reloadError, setReloadError] = useState<string | null>(null);

  // Load the batch browser list on mount
  useEffect(() => {
    let alive = true;
    setBatchLoading(true);
    listBatches()
      .then((b) => { if (alive) setBatches(b); })
      .catch(() => { if (alive) setBatches([]); })
      .finally(() => { if (alive) setBatchLoading(false); });
    return () => { alive = false; };
  }, []);

  // Mount the drawn certificate canvas into the DOM wherever it is being shown
  useEffect(() => {
    if (!certCanvas) return;
    certCanvas.className = "max-w-full h-auto rounded-sm shadow-xl border border-gray-200";
    const host = fullscreen ? certOverlayHostRef.current : certContainerRef.current;
    host?.appendChild(certCanvas);
    return () => { certCanvas.remove(); };
  }, [certCanvas, language, fullscreen]);

  const renderCertificate = useCallback(async (c: CertificateLookup) => {
    const canvas = await drawCertificateImage({ ...c.recipient, lang });
    setCertCanvas(canvas);
    setFullscreen(true);
  }, [lang]);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setVerifyError(null);
    setCertificate(null);
    setCertCanvas(null);
    if (!credential.trim()) {
      setVerifyError(T.verifySub);
      return;
    }
    setVerifyLoading(true);
    try {
      const result = await lookupByCredential(credential);
      if (!result) {
        setVerifyError(T.notFound);
        return;
      }
      setCertificate(result);
      renderCertificate(result);
    } catch (err: any) {
      setVerifyError(err.message || "Verification failed. Please try again.");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleDownload = () => {
    if (!certCanvas) return;
    const a = document.createElement("a");
    a.href = certCanvas.toDataURL("image/png");
    a.download = `SAFAL-Certificate-${(certificate?.recipient.name || "verified").replace(/\s+/g, "-")}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyLink = async () => {
    const url = buildVerifyUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadDemo = async () => {
    setVerifyError(null);
    setVerifyLoading(true);
    try {
      const demo = await ensureDemoCertificate();
      if (!demo) {
        setVerifyError("Could not prepare the demo certificate. Please try again.");
        return;
      }
      setCredential(demo.recipient.phone || demo.credential.value);
      const found = await lookupByCredential(demo.credential.value);
      if (!found) {
        setVerifyError("Demo certificate wasn't found after seeding. Please try again.");
        return;
      }
      setCertificate(found);
      renderCertificate(found);
    } catch (err: any) {
      setVerifyError(err.message || "Failed to load demo certificate.");
    } finally {
      setVerifyLoading(false);
    }
  };

  // ── Vault gate handlers ──
  const handleVaultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVaultError(null);
    setVaultLoading(true);
    try {
      const ok = await checkVaultCode(vaultCode);
      if (!ok) {
        setVaultError(T.vaultFail);
        return;
      }
      unlockVault();
      setVaultUnlocked(true);
    } catch {
      setVaultError(T.vaultFail);
    } finally {
      setVaultLoading(false);
    }
  };

  // ── Publish handlers ──
  const buildRecipients = (): CertificateRecipient[] => {
    const parsed = parseCsvToRecipients(csvText);
    return parsed.map((r) => ({
      ...r,
      course: (r.course || course).trim() || "Artificial Intelligence & Innovation Training",
      issuedOn,
      location: (r.location || location).trim() || undefined,
      conductedOn: (r.conductedOn || conductedOn).trim() || undefined,
    }));
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishError(null);
    setPublished(null);

    if (!vaultUnlocked || !vaultCode) {
      setPublishError(T.vaultSub);
      return;
    }
    if (!batchNumber.trim()) {
      setPublishError(`${T.batchNo} ${T.batchNoPlaceholder}`);
      return;
    }
    const recipients = buildRecipients();
    if (recipients.length === 0) {
      setPublishError(T.noValidRows);
      return;
    }

    setPublishLoading(true);
    try {
      const result = await publishCertificateBatch(
        sheetTitle.trim() || `Batch ${batchNumber.trim()}`,
        batchNumber.trim(),
        vaultCode, // the vault code doubles as the sheet-encryption key
        recipients
      );
      setPublished(result.certificates);
      setPublishedTitle(sheetTitle.trim() || `Batch ${batchNumber.trim()}`);
      setPublishedBatchNumber(result.batchNumber);
      setReloadAuth(result.batchId);
      if (result.skipped.length > 0) {
        setPublishError(T.skipped(result.skipped.length) + ` — ${result.skipped.slice(0, 3).map(s => s.name).join(", ")}`);
      }
    } catch (err: any) {
      setPublishError(err.message || "Failed to publish the batch. Please try again.");
    } finally {
      setPublishLoading(false);
    }
  };

  const handleReloadAuth = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!vaultUnlocked || !vaultCode) {
      setReloadError(T.vaultSub);
      return;
    }
    setReloadLoading(true);
    setReloadError(null);
    setPublished(null);
    try {
      const batch = await loadCertificateBatch(reloadAuth.trim() || null, vaultCode);
      if (!batch) {
        setReloadError("Nothing found — check the batch id and try again.");
        return;
      }
      setPublished(batch.certificates);
      setPublishedTitle(batch.title);
      setPublishedBatchNumber(batch.batchNumber);
    } catch (err: any) {
      setReloadError(err.message || "Failed to load the sheet. Check the vault code.");
    } finally {
      setReloadLoading(false);
    }
  };

  const handleCopyAll = async () => {
    if (!published) return;
    const text = published.map((c) => `${c.recipient.name}\t${c.recipient.phone || c.recipient.email || ""}\t${c.recipient.email || ""}\t${c.verifyUrl}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setPublishCopied(true);
    setTimeout(() => setPublishCopied(false), 2000);
  };

  const handleExportCsv = () => {
    if (!published) return;
    const csv = certificatesToCsv(published);
    const d = new Date().toISOString().slice(0, 10);
    downloadCsv(`SAFAL-batch-${publishedBatchNumber || d}-${d}.csv`, csv);
  };

  const handleCsvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setCsvText(String(reader.result || "")); setSheetLinkError(null); };
    reader.onerror = () => setSheetLinkError(T.sheetLinkErr);
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleSheetLinkLoad = async () => {
    setSheetLinkError(null);
    setSheetLoading(true);
    try {
      const m = sheetLinkInput.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
      if (!m) { setSheetLinkError(T.sheetLinkErr); return; }
      const res = await fetch(`https://docs.google.com/spreadsheets/d/${m[1]}/export?format=csv`);
      if (!res.ok) { setSheetLinkError(T.sheetLinkErr); return; }
      const text = await res.text();
      setCsvText(text);
    } catch {
      setSheetLinkError(T.sheetLinkErr);
    } finally {
      setSheetLoading(false);
    }
  };

  const handleBack = () => {
    setFullscreen(false);
    document.getElementById("verify-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const resetPublishForm = () => {
    setPublished(null);
    setPublishedTitle(null);
    setPublishedBatchNumber(null);
    setPublishError(null);
    setPublishCopied(false);
  };

  const inputCls =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all";

  const parsedRecipients = csvText.trim() ? parseCsvToRecipients(csvText) : [];

  return (
    <div className="bg-white flex-1 animate-fade-in">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-white via-[#f5f5f7] to-white pt-24 pb-10 sm:pt-36 sm:pb-14 overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-brand/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-green-400/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-widest bg-emerald-50 border border-emerald-200 text-brand px-3 py-1.5 rounded-full shadow-xs">
            <ShieldCheck className="h-3.5 w-3.5" />
            {T.badge}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            {T.title1} <br />
            <span className="text-gradient-green">{T.title2}</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light">
            {T.hero}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-0 pt-8 pb-20">
        <div className="flex justify-center mb-10">
          <div className="bg-surface-muted border border-gray-200 p-1 rounded-xl flex flex-wrap justify-center gap-1">
            <button
              onClick={() => setTab("verify")}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer border-none ${
                tab === "verify" ? "bg-white shadow-sm text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Eye className="h-4 w-4" /> {T.verifyTab}
            </button>
            <button
              onClick={() => setTab("publish")}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer border-none ${
                tab === "publish" ? "bg-white shadow-sm text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <FileSpreadsheet className="h-4 w-4" /> {T.publishTab}
            </button>
          </div>
        </div>

        {tab === "verify" ? (
          <div className="max-w-5xl mx-auto">
            {/* Verify form */}
            <form
              id="verify-form"
              onSubmit={handleVerify}
              className="card-elevated p-6 sm:p-8 mb-10 max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <KeyRound className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-950 text-lg leading-tight">{T.verifyHeading}</h3>
                  <p className="text-xs text-gray-500">{T.verifySub}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">{T.credLabel}</label>
                <input
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  placeholder={T.credPlaceholder}
                  className={inputCls}
                  autoComplete="tel"
                />
              </div>

              {verifyError && (
                <div className="mt-4 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{verifyError}</span>
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={verifyLoading}
                  className="flex-1 bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border-none disabled:opacity-60"
                >
                  {verifyLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
                  {T.verifyBtn}
                </button>
                <button
                  type="button"
                  onClick={handleLoadDemo}
                  disabled={verifyLoading}
                  className="border border-gray-300 hover:border-brand hover:text-brand text-gray-600 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer bg-white disabled:opacity-60"
                >
                  {verifyLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Eye className="h-5 w-5" />}
                  {T.sampleBtn}
                </button>
              </div>
            </form>

            {/* Batch browser */}
            <div className="card-elevated p-6 sm:p-8 mb-10 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Search className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-950 text-lg leading-tight">{T.batchesHeading}</h3>
                  <p className="text-xs text-gray-500">{T.batchesEmpty === "No batches published yet." ? T.verifySub : ""}</p>
                </div>
              </div>
              {batchLoading ? (
                <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading…
                </div>
              ) : batches.length === 0 ? (
                <p className="text-sm text-gray-400">{T.batchesEmpty}</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {batches.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => { setCredential(""); setCertificate(null); setCertCanvas(null); setVerifyError(null); }}
                      className="text-left border border-gray-200 hover:border-brand hover:bg-emerald-50/40 rounded-xl px-4 py-3 transition-all cursor-pointer bg-white flex items-center gap-3"
                    >
                      <div className="h-9 w-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                        <Hash className="h-4 w-4 text-brand" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{T.batchOf(b.batchNumber)}</div>
                        <div className="text-[11px] text-gray-400">
                          {b.certCount} · {new Date(b.createdAt).toLocaleDateString(lang === "ne" ? "ne-NP" : "en-GB")}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              <p className="mt-4 text-[11px] text-gray-400">{T.demoHint}</p>
            </div>

            {/* Result */}
            {certificate && certCanvas && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand">
                    <CheckCircle2 className="h-5 w-5" />
                    {T.verifiedFor} {certificate.recipient.name}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-2 text-sm font-medium border border-gray-200 hover:border-brand hover:text-brand text-gray-600 px-4 py-2.5 rounded-xl transition-all cursor-pointer bg-white"
                    >
                      {copied ? <Check className="h-4 w-4 text-brand" /> : <Link2 className="h-4 w-4" />}
                      {copied ? T.copyLinkDone : T.copyLink}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 text-sm font-semibold bg-brand hover:bg-brand-dark text-white px-5 py-2.5 rounded-xl transition-all cursor-pointer border-none"
                    >
                      <Download className="h-4 w-4" /> {T.download}
                    </button>
                  </div>
                </div>

                <div
                  ref={certContainerRef}
                  className="bg-surface-muted border border-gray-200 rounded-2xl p-6 sm:p-10 flex justify-center overflow-x-auto"
                />

                <p className="text-center text-xs text-gray-500 font-mono">
                  {T.verifyAnywhere}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Vault gate */}
            {!vaultUnlocked ? (
              <div className="max-w-md mx-auto card-elevated p-8 text-center">
                <div className="h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-7 w-7 text-brand" />
                </div>
                <h3 className="font-display font-bold text-gray-950 text-xl">{T.vaultOpen}</h3>
                <p className="text-sm text-gray-500 mt-2 mb-6">{T.vaultSub}</p>
                <form onSubmit={handleVaultSubmit} className="space-y-4">
                  <input
                    type="password"
                    value={vaultCode}
                    onChange={(e) => setVaultCode(e.target.value)}
                    placeholder={T.vaultPlaceholder}
                    className={`${inputCls} text-center tracking-widest`}
                    autoComplete="off"
                  />
                  {vaultError && (
                    <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 text-left">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{vaultError}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={vaultLoading}
                    className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border-none disabled:opacity-60"
                  >
                    {vaultLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
                    {T.vaultBtn}
                  </button>
                </form>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: create sheet */}
                <div className="card-elevated p-6 sm:p-8 h-fit">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                      <Lock className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-gray-950 text-lg leading-tight">{T.publishTab}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Every trainee row is encrypted in your browser. The phone or email in the sheet is the only key that
                    unlocks that trainee's certificate — no code to hand out, nothing to lose.
                  </p>

                  <form onSubmit={handlePublish} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">{T.batchNo}</label>
                        <div className="relative">
                          <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                          <input
                            value={batchNumber}
                            onChange={(e) => setBatchNumber(e.target.value)}
                            placeholder={T.batchNoPlaceholder}
                            className={`${inputCls} pl-10`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">{T.issuedOn}</label>
                        <div className="relative">
                          <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                          <input type="date" value={issuedOn} onChange={(e) => setIssuedOn(e.target.value)} className={`${inputCls} pl-10`} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">{T.batchTitle}</label>
                        <input
                          value={sheetTitle}
                          onChange={(e) => setSheetTitle(e.target.value)}
                          placeholder={T.batchTitlePlaceholder}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">{T.location}</label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                          <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder={T.locationPlaceholder}
                            className={`${inputCls} pl-10`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">{T.conductedOn}</label>
                        <input
                          value={conductedOn}
                          onChange={(e) => setConductedOn(e.target.value)}
                          placeholder={T.conductedPlaceholder}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">{T.defaultCourse}</label>
                        <input
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          placeholder="e.g. AI Fundamentals & Prompt Engineering"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">{T.csvLabel}</label>
                      <textarea
                        value={csvText}
                        onChange={(e) => setCsvText(e.target.value)}
                        rows={8}
                        placeholder={"Name,Course,Phone,Email\nBinod Bastola,MERN Stack Development,9801234567,binod@email.com\nAshmita Jha,AI Fundamentals,9807654321,ashmita@email.com"}
                        className={`${inputCls} resize-y font-mono text-[13px] leading-relaxed`}
                      />
                      <p className="text-[11px] text-gray-400 mt-1.5">{T.csvTip}</p>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 border border-gray-200 hover:border-brand hover:text-brand px-3 py-2 rounded-lg transition-all cursor-pointer bg-white">
                          <Upload className="h-3.5 w-3.5" /> {T.uploadCsv}
                          <input type="file" accept=".csv,text/csv" className="hidden" onChange={handleCsvFile} />
                        </label>
                        <button
                          type="button"
                          onClick={() => { setShowSheetLink(!showSheetLink); setSheetLinkError(null); }}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 border border-gray-200 hover:border-brand hover:text-brand px-3 py-2 rounded-lg transition-all cursor-pointer bg-white"
                        >
                          <FileText className="h-3.5 w-3.5" /> {T.sheetLink}
                        </button>
                      </div>

                      {showSheetLink && (
                        <div className="mt-2 space-y-2">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              value={sheetLinkInput}
                              onChange={(e) => setSheetLinkInput(e.target.value)}
                              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleSheetLinkLoad(); } }}
                              placeholder={T.sheetLinkPlaceholder}
                              className={`${inputCls} font-mono text-xs`}
                            />
                            <button
                              type="button"
                              onClick={handleSheetLinkLoad}
                              disabled={sheetLoading}
                              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-brand hover:bg-brand-dark px-4 py-2 rounded-lg transition-all cursor-pointer border-none disabled:opacity-60 shrink-0"
                            >
                              {sheetLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowRight className="h-3.5 w-3.5" />}
                              {T.loadSheet}
                            </button>
                          </div>
                          {sheetLinkError && (
                            <p className="text-[11px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{sheetLinkError}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Live preview */}
                    {parsedRecipients.length > 0 && (
                      <div className="rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-4 py-2.5 bg-surface-muted text-[10px] font-mono uppercase tracking-widest text-gray-500 flex items-center justify-between">
                          <span>{parsedRecipients.length} rows</span>
                          <span className="text-brand">OK</span>
                        </div>
                        <div className="max-h-44 overflow-y-auto divide-y divide-gray-100">
                          {parsedRecipients.slice(0, 8).map((r, i) => {
                            const ok = Boolean(r.phone || r.email);
                            return (
                              <div key={i} className="px-4 py-2 text-xs flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="text-gray-900 font-medium truncate">{r.name}</div>
                                  <div className="text-[10px] text-gray-400 truncate">{r.course || "—"}</div>
                                </div>
                                <div className="shrink-0 text-right font-mono text-[10px]">
                                  {ok
                                    ? <span className="text-gray-500">{r.phone || r.email}</span>
                                    : <span className="text-red-500 bg-red-50 px-1.5 py-0.5 rounded">skip</span>}
                                </div>
                              </div>
                            );
                          })}
                          {parsedRecipients.length > 8 && (
                            <div className="px-4 py-2 text-[10px] text-gray-400">+{parsedRecipients.length - 8} more</div>
                          )}
                        </div>
                      </div>
                    )}

                    {publishError && (
                      <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{publishError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={publishLoading}
                      className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border-none disabled:opacity-60"
                    >
                      {publishLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                      {T.publishBtn(parsedRecipients.length)}
                    </button>
                  </form>

                  {/* Reload existing */}
                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <button
                      onClick={() => { setReloadMode(!reloadMode); setReloadError(null); }}
                      className="text-sm font-semibold text-brand hover:text-brand-dark inline-flex items-center gap-2 cursor-pointer border-none bg-transparent"
                    >
                      <Users className="h-4 w-4" />
                      {T.reload}
                    </button>

                    {reloadMode && (
                      <div className="mt-4 space-y-3">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">{T.reloadSub}</label>
                          <input
                            value={reloadAuth}
                            onChange={(e) => setReloadAuth(e.target.value)}
                            placeholder="Batch id"
                            className={`${inputCls} font-mono text-xs`}
                          />
                        </div>
                        {reloadError && (
                          <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{reloadError}</span>
                          </div>
                        )}
                        <button
                          onClick={(e) => handleReloadAuth(e)}
                          disabled={reloadLoading}
                          className="w-full border border-brand text-brand hover:bg-brand hover:text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                        >
                          {reloadLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                          {T.reloadBtn}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: results */}
                <div className="card-elevated p-6 sm:p-8 min-h-[400px]">
                  {!published ? (
                    <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center py-16">
                      <div className="h-16 w-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
                        <FileSpreadsheet className="h-8 w-8 text-brand" />
                      </div>
                      <h3 className="font-display font-semibold text-gray-900 text-lg mb-1">{T.noSheet}</h3>
                      <p className="text-sm text-gray-500 max-w-sm">{T.noSheetSub}</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <h3 className="font-display font-bold text-gray-950 text-lg leading-tight truncate max-w-[240px]">{publishedTitle}</h3>
                          <p className="text-xs text-gray-500 font-mono mt-0.5">{T.certCount(published.length)}</p>
                          {reloadAuth && (
                            <p className="text-[11px] text-gray-400 font-mono mt-0.5">{T.batchId(reloadAuth)}</p>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={handleExportCsv}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold border border-gray-200 hover:border-brand hover:text-brand text-gray-600 px-3 py-2 rounded-lg transition-all cursor-pointer bg-white"
                          >
                            <FileSpreadsheet className="h-3.5 w-3.5" /> {T.export}
                          </button>
                          <button
                            onClick={handleCopyAll}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold border border-gray-200 hover:border-brand hover:text-brand text-gray-600 px-3 py-2 rounded-lg transition-all cursor-pointer bg-white"
                          >
                            {publishCopied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
                            {publishCopied ? T.copyLinkDone : T.copyAll}
                          </button>
                          <button
                            onClick={resetPublishForm}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3 py-2 rounded-lg transition-all cursor-pointer bg-white"
                            title="Start a new sheet"
                          >
                            <LogOut className="h-3.5 w-3.5" /> {T.new}
                          </button>
                        </div>
                      </div>

                      <div className="max-h-[520px] overflow-y-auto rounded-xl border border-gray-200">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-surface-muted sticky top-0">
                            <tr className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                              <th className="px-4 py-3 font-medium">{T.thName}</th>
                              <th className="px-4 py-3 font-medium">{T.thCred}</th>
                              <th className="px-4 py-3 font-medium w-64">{T.thLink}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {published.map((c) => (
                              <tr key={c.id} className="hover:bg-surface-soft transition-colors">
                                <td className="px-4 py-3">
                                  <div className="font-medium text-gray-900 leading-tight">{c.recipient.name}</div>
                                  <div className="text-[11px] text-gray-400 mt-0.5 line-clamp-1 max-w-[180px]">{c.recipient.course}</div>
                                </td>
                                <td className="px-4 py-3">
                                  <span className="font-mono text-[11px] bg-emerald-50 border border-emerald-200 text-brand px-2 py-1 rounded-md block max-w-[160px] truncate">
                                    {c.recipient.phone || c.recipient.email || "—"}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <a
                                    href={c.verifyUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.preventDefault()}
                                    className="text-xs text-brand hover:text-brand-dark font-mono break-all inline-flex items-center"
                                  >
                                    <Link2 className="h-3.5 w-3.5 mr-1 shrink-0" />
                                    <span className="line-clamp-1 max-w-[170px]">{c.verifyUrl}</span>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Security note */}
            <div className="mt-10 card-white p-6 flex items-start gap-4">
              <Lock className="h-6 w-6 text-brand shrink-0 mt-0.5" />
              <div className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-900">{T.securityTitle}</span>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>{T.sec1}</li>
                  <li>{T.sec2}</li>
                  <li>{T.sec3}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-screen certificate view (opens on every successful verify) */}
      {fullscreen && certificate && certCanvas && (
        <div className="fixed inset-0 z-[100] bg-gray-950/90 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2.5 rounded-xl transition-all cursor-pointer bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" /> {T.back}
              </button>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2.5 rounded-xl transition-all cursor-pointer bg-transparent"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Link2 className="h-4 w-4" />}
                  {copied ? T.copyLinkDone : T.copyLink}
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 text-sm font-semibold bg-brand hover:bg-brand-light text-white px-5 py-2.5 rounded-xl transition-all cursor-pointer border-none"
                >
                  <Download className="h-4 w-4" /> {T.download}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400 mb-4">
              <CheckCircle2 className="h-5 w-5" />
              {T.verifiedFor} {certificate.recipient.name}
            </div>

            <div
              ref={certOverlayHostRef}
              className="bg-surface-muted border border-white/10 rounded-2xl p-4 sm:p-10 flex justify-center overflow-x-auto"
            />

            <p className="text-center text-xs text-gray-400 font-mono mt-5">{T.verifyAnywhere}</p>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {T.footerTitle}
          </h3>
          <p className="text-gray-600 font-light max-w-2xl mx-auto">
            {T.footerSub}
          </p>
          <button
            onClick={() => { setTab("publish"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3.5 rounded-full transition-all border-none cursor-pointer inline-flex items-center gap-2 shadow-md shadow-brand/10"
          >
            {T.footerBtn} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};