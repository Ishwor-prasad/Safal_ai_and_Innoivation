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
} from "lucide-react";
import {
  publishCertificateBatch,
  lookupCertificate,
  loadCertificateBatch,
  buildVerifyUrl,
  extractCodeFromUrl,
  certificatesToCsv,
  downloadCsv,
  ensureDemoCertificate,
  CertificateRecipient,
  CertificateLookup,
  PublishedCertificate,
} from "../services/certificateService";

interface CertificatePageProps {
  navigate: (path: string) => void;
}

// ══════════════════════════════════════════════════════════════════════════
// Canvas certificate renderer (crisp PNG downloads, no external libs)
// Ports the SAFAL A4-landscape design: binary-tech band, network mountains,
// triangle logo, navy/gold/green palette, signature blocks, seal, star.
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

interface RenderOpts extends CertificateRecipient {
  code?: string;
}

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
  ctx.font = `${fontSize}px Inter, sans-serif`;
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

function drawCertificateImage(cert: RenderOpts): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = CERT_W;
  canvas.height = CERT_H;
  const ctx = canvas.getContext("2d")!;

  const cx = CERT_W / 2;

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
  ctx.font = "700 58px Fraunces, Georgia, serif";
  ctx.fillText("SAFAL AI", headCx, 150);
  ctx.fillStyle = GOLD;
  ctx.font = "500 15px Inter, sans-serif";
  ctx.fillText("A N D   I N N O V A T I O N   C E N T R E", headCx, 186);
  ctx.fillStyle = GOLD;
  ctx.font = "italic 500 14px Inter, sans-serif";
  ctx.fillText("EMPOWERING MINDS, BUILDING INTELLIGENCE", headCx, 214);

  // ── Title ──
  ctx.fillStyle = ORG_NAVY;
  ctx.font = "700 86px Fraunces, Georgia, serif";
  ctx.fillText("CERTIFICATE", cx, 420);
  ctx.fillStyle = GOLD;
  ctx.font = "500 21px Inter, sans-serif";
  ctx.fillText("O F   C O M P L E T I O N", cx, 468);
  const dividerW = 560;
  ctx.beginPath();
  ctx.moveTo(cx - dividerW / 2, 506);
  ctx.lineTo(cx + dividerW / 2, 506);
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 3;
  ctx.stroke();

  // ── "THIS IS TO CERTIFY THAT" ──
  ctx.fillStyle = ORG_NAVY;
  ctx.font = "600 16px Inter, sans-serif";
  ctx.fillText("THIS IS TO CERTIFY THAT", cx, 566);

  // ── Name (serif, gold underline) ──
  const namePx = fitFont(ctx, cert.name, "700 Fraunces, Georgia, serif", 92, 1150);
  ctx.font = `${namePx}px 700 Fraunces, Georgia, serif`;
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
  ctx.font = "400 19px Inter, sans-serif";
  ctx.fillText("has successfully completed the", bodyCx, y);
  y += 40;
  ctx.font = "700 30px Fraunces, Georgia, serif";
  const courseLines = wrapText(ctx, cert.course, bodyW).slice(0, 2);
  ctx.font = `${fitFont(ctx, cert.course, "700 Fraunces, Georgia, serif", 30, bodyW)}px 700 Fraunces, Georgia, serif`;
  courseLines.forEach((l, i) => ctx.fillText(l, bodyCx, y + i * 38));
  y += courseLines.length * 38;
  ctx.font = "400 19px Inter, sans-serif";
  ctx.fillStyle = INK;
  const orgLine = `organized by Safal AI and Innovation Centre, held at ${location}`;
  const orgLines = wrapText(ctx, orgLine, bodyW).slice(0, 2);
  orgLines.forEach((l, i) => ctx.fillText(l, bodyCx, y + i * 30));
  y += orgLines.length * 30;
  const dateLine = `The training was conducted from ${conductedOn}`;
  ctx.fillText(dateLine, bodyCx, y + 2);

  // Closing
  ctx.font = "italic 400 17px Inter, sans-serif";
  ctx.fillStyle = "#5a5a5a";
  ctx.fillText("We commend your dedication and commitment to learning,", bodyCx, y + 64);
  ctx.fillText("and wish you success in your future endeavors.", bodyCx, y + 92);

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
  ctx.textAlign = "center";
  ctx.fillStyle = ORG_NAVY;
  ctx.font = "700 18px Fraunces, Georgia, serif";
  ctx.fillText(cert.leftSignatory || "Ishwor Dhungana", leftX, sigY + 34);
  ctx.fillText(cert.rightSignatory || "Uday Ram Jaishi", rightX, sigY + 34);
  ctx.fillStyle = "#6b675c";
  ctx.font = "500 13px Inter, sans-serif";
  ctx.fillText(cert.leftRole || "Lead AI Facilitator", leftX, sigY + 56);
  ctx.fillText(cert.rightRole || "Chief Executive Officer", rightX, sigY + 56);

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
  ctx.font = "600 30px Fraunces, Georgia, serif";
  ctx.fillText("★", sealX, sealY - 6);
  ctx.font = "600 19px Inter, sans-serif";
  ctx.fillStyle = INK;
  ctx.fillText("VERIFIED", sealX, sealY + 28);

  return canvas;
}

// ══════════════════════════════════════════════════════════════════════════
// Page
// ══════════════════════════════════════════════════════════════════════════

export const CertificatePage: React.FC<CertificatePageProps> = ({ navigate }) => {
  const [tab, setTab] = useState<"verify" | "publish">("verify");

  // ── Verify state ──
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyName, setVerifyName] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [certificate, setCertificate] = useState<CertificateLookup | null>(null);
  const [certCanvas, setCertCanvas] = useState<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const certContainerRef = useRef<HTMLDivElement | null>(null);

  // ── Publish state ──
  const [passphrase, setPassphrase] = useState("");
  const [sheetTitle, setSheetTitle] = useState("");
  const [course, setCourse] = useState("");
  const [namesText, setNamesText] = useState("");
  const [issuedOn, setIssuedOn] = useState(() => new Date().toISOString().slice(0, 10));
  const [location, setLocation] = useState("");
  const [conductedOn, setConductedOn] = useState("");
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [published, setPublished] = useState<PublishedCertificate[] | null>(null);
  const [publishedTitle, setPublishedTitle] = useState<string | null>(null);
  const [publishCopied, setPublishCopied] = useState(false);
  const [reloadMode, setReloadMode] = useState(false);
  const [reloadAuth, setReloadAuth] = useState("");
  const [reloadLoading, setReloadLoading] = useState(false);
  const [reloadError, setReloadError] = useState<string | null>(null);

  // Pre-fill code from URL ?v=...
  useEffect(() => {
    const fromUrl = extractCodeFromUrl();
    if (fromUrl) {
      setVerifyCode(fromUrl);
      setTab("verify");
    }
  }, []);

  // Mount the drawn certificate canvas into the DOM when it is generated
  useEffect(() => {
    if (!certCanvas) return;
    certCanvas.className = "max-w-full h-auto rounded-sm shadow-xl border border-gray-200";
    certContainerRef.current?.appendChild(certCanvas);
    return () => { certCanvas.remove(); };
  }, [certCanvas]);

  const renderCertificate = useCallback((c: { recipient: CertificateRecipient; code?: string }) => {
    const canvas = drawCertificateImage({
      ...c.recipient,
      code: c.code || "VERIFIED",
    });
    setCertCanvas(canvas);
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError(null);
    setCertificate(null);
    setCertCanvas(null);
    if (!verifyCode.trim()) {
      setVerifyError("Please enter the certificate code sent to you.");
      return;
    }
    setVerifyLoading(true);
    try {
      const result = await lookupCertificate(verifyCode);
      if (!result) {
        setVerifyError("No certificate found for that code. Please check the code and try again.");
        return;
      }
      if (verifyName.trim() && verifyName.trim().toLowerCase() !== result.recipient.name.trim().toLowerCase()) {
        setVerifyError("The name you entered does not match the certificate for this code.");
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
    a.download = `SAFAL-Certificate-${verifyCode || "verified"}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyLink = async () => {
    const url = buildVerifyUrl(certificate ? verifyCode : verifyCode);
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
      const found = await lookupCertificate(demo.code);
      if (!found) {
        setVerifyError("Demo certificate wasn't found after seeding. Please try again.");
        return;
      }
      setVerifyCode(demo.code);
      setVerifyName(found.recipient.name);
      setCertificate(found);
      renderCertificate(found);
    } catch (err: any) {
      setVerifyError(err.message || "Failed to load demo certificate.");
    } finally {
      setVerifyLoading(false);
    }
  };

  // ── Publish handlers ──
  const parseNames = (): CertificateRecipient[] => {
    const lines = namesText.split("\n").map((l) => l.trim()).filter(Boolean);
    const recipients: CertificateRecipient[] = [];
    for (const line of lines) {
      // support "Name | Course" format, else fall back to the shared course field
      const [rawName, rawCourse] = line.split("|").map((s) => s.trim());
      if (!rawName) continue;
      recipients.push({
        name: rawName,
        course: rawCourse || course.trim() || "Artificial Intelligence & Innovation Training",
        issuedOn,
        location: location.trim() || undefined,
        conductedOn: conductedOn.trim() || undefined,
      });
    }
    return recipients;
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishError(null);
    setPublished(null);

    if (!passphrase.trim()) {
      setPublishError("Set a passphrase first. It encrypts the sheet — keep it safe, it cannot be recovered.");
      return;
    }
    if (passphrase.length < 8) {
      setPublishError("Passphrases shorter than 8 characters are too easy to guess.");
      return;
    }
    const recipients = parseNames();
    if (recipients.length === 0) {
      setPublishError("Add at least one trainee name (one per line).");
      return;
    }

    setPublishLoading(true);
    try {
      const result = await publishCertificateBatch(sheetTitle.trim() || "Untitled batch", passphrase, recipients);
      setPublished(result.certificates);
      setPublishedTitle(sheetTitle.trim() || "Untitled batch");
      setReloadAuth(result.batchId);
    } catch (err: any) {
      setPublishError(err.message || "Failed to publish the batch. Please try again.");
    } finally {
      setPublishLoading(false);
    }
  };

  const handleReloadAuth = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!passphrase.trim()) {
      setReloadError("Enter the passphrase you used when publishing.");
      return;
    }
    setReloadLoading(true);
    setReloadError(null);
    setPublished(null);
    try {
      const batch = await loadCertificateBatch(reloadAuth || null, passphrase);
      if (!batch) {
        setReloadError("Nothing found. In demo mode use a batch list id; in live mode pass the batch uuid.");
        return;
      }
      setPublished(batch.certificates);
      setPublishedTitle(batch.title);
    } catch (err: any) {
      setReloadError(err.message || "Failed to load the sheet. Check the passphrase.");
    } finally {
      setReloadLoading(false);
    }
  };

  const handleCopyAll = async () => {
    if (!published) return;
    const text = published.map((c) => `${c.recipient.name}\t${c.code}\t${c.verifyUrl}`).join("\n");
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
    downloadCsv(`SAFAL-certificates-${d}.csv`, csv);
  };

  const resetPublishForm = () => {
    setPublished(null);
    setPublishedTitle(null);
    setPublishError(null);
    setPublishCopied(false);
  };

  const inputCls =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all";

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
            Encrypted Verification System
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Digital Certificates, <br />
            <span className="text-gradient-green">Verified &amp; Encrypted</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-light">
            Every SAFAL AI certificate is issued with a unique private code. Enter the code to verify
            authenticity and download your official completion certificate — guarded by modern encryption.
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
              <Eye className="h-4 w-4" /> Verify a Certificate
            </button>
            <button
              onClick={() => setTab("publish")}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer border-none ${
                tab === "publish" ? "bg-white shadow-sm text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <FileSpreadsheet className="h-4 w-4" /> Publisher Sheet
            </button>
          </div>
        </div>

        {tab === "verify" ? (
          <div className="max-w-5xl mx-auto">
            {/* Verify form */}
            <form
              onSubmit={handleVerify}
              className="card-elevated p-6 sm:p-8 mb-10 max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <KeyRound className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-950 text-lg leading-tight">Verify your certificate</h3>
                  <p className="text-xs text-gray-500">Enter the private code sent to you, then your full name.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">Certificate code</label>
                  <input
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                    placeholder="e.g. 2K7M-Q4BR"
                    className={`${inputCls} font-mono tracking-widest`}
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">Full name</label>
                  <input
                    value={verifyName}
                    onChange={(e) => setVerifyName(e.target.value)}
                    placeholder="As printed on the certificate"
                    className={inputCls}
                  />
                </div>
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
                  Verify Certificate
                </button>
                <button
                  type="button"
                  onClick={handleLoadDemo}
                  disabled={verifyLoading}
                  className="border border-gray-300 hover:border-brand hover:text-brand text-gray-600 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer bg-white disabled:opacity-60"
                >
                  {verifyLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Eye className="h-5 w-5" />}
                  View sample certificate
                </button>
              </div>
            </form>

            {/* Result */}
            {certificate && certCanvas && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand">
                    <CheckCircle2 className="h-5 w-5" />
                    Certificate verified for {certificate.recipient.name}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-2 text-sm font-medium border border-gray-200 hover:border-brand hover:text-brand text-gray-600 px-4 py-2.5 rounded-xl transition-all cursor-pointer bg-white"
                    >
                      {copied ? <Check className="h-4 w-4 text-brand" /> : <Link2 className="h-4 w-4" />}
                      {copied ? "Link copied" : "Copy share link"}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 text-sm font-semibold bg-brand hover:bg-brand-dark text-white px-5 py-2.5 rounded-xl transition-all cursor-pointer border-none"
                    >
                      <Download className="h-4 w-4" /> Download PNG
                    </button>
                  </div>
                </div>

                <div
                  ref={certContainerRef}
                  className="bg-surface-muted border border-gray-200 rounded-2xl p-6 sm:p-10 flex justify-center overflow-x-auto"
                />

                <p className="text-center text-xs text-gray-500 font-mono">
                  Verify this credential anytime at {window.location.origin}/certificates · Signature of authenticity
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Publisher Sheet */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: create sheet */}
              <div className="card-elevated p-6 sm:p-8 h-fit">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Lock className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-950 text-lg leading-tight">Create a publisher sheet</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Paste trainee names. The whole sheet is encrypted with your passphrase before it is stored — the
                  passphrase is never saved anywhere. Each trainee receives a unique code; only that code unlocks their certificate.
                </p>

                <form onSubmit={handlePublish} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">Sheet passphrase (min 8 chars)</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      <input
                        type="password"
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                        placeholder="Used to encrypt & decrypt this sheet"
                        className={`${inputCls} pl-10`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">Batch title (optional)</label>
                      <input
                        value={sheetTitle}
                        onChange={(e) => setSheetTitle(e.target.value)}
                        placeholder="e.g. Vibe Coding Batch 3"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">Issued date</label>
                      <input type="date" value={issuedOn} onChange={(e) => setIssuedOn(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">Location (optional)</label>
                      <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Prakriti Resources Centre, Kathmandu"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">Conducted on (optional)</label>
                      <input
                        value={conductedOn}
                        onChange={(e) => setConductedOn(e.target.value)}
                        placeholder="e.g. 27/08/2026 to 01/09/2026"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">Default course (used unless a name has " | course")</label>
                    <input
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      placeholder="e.g. AI Fundamentals & Prompt Engineering"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">Trainee names — one per line</label>
                    <textarea
                      value={namesText}
                      onChange={(e) => setNamesText(e.target.value)}
                      rows={7}
                      placeholder={"Binod Bastola | MERN Stack Development\nAshmita Jha\nPankaj Ghimire"}
                      className={`${inputCls} resize-y font-mono text-[13px] leading-relaxed`}
                    />
                    <p className="text-[11px] text-gray-400 mt-1.5">
                      Tip: use <code className="font-mono bg-gray-100 px-1 rounded">Name | Course</code> for per-person courses.
                    </p>
                  </div>

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
                    Encrypt &amp; Publish {parseNames().length > 0 ? `${parseNames().length} certificates` : ""}
                  </button>
                </form>

                {/* Reload existing */}
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <button
                    onClick={() => { setReloadMode(!reloadMode); setReloadError(null); }}
                    className="text-sm font-semibold text-brand hover:text-brand-dark inline-flex items-center gap-2 cursor-pointer border-none bg-transparent"
                  >
                    <Users className="h-4 w-4" />
                    Reload an existing sheet (re-copy links)
                  </button>

                  {reloadMode && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">Batch id (live mode) or leave blank (demo mode lists below)</label>
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
                        Decrypt &amp; reload
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
                    <h3 className="font-display font-semibold text-gray-900 text-lg mb-1">No published sheet yet</h3>
                    <p className="text-sm text-gray-500 max-w-sm">
                      Create a sheet on the left, then every shareable link and code will appear here — ready to copy and export as Excel/CSV.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <h3 className="font-display font-bold text-gray-950 text-lg leading-tight truncate max-w-[240px]">{publishedTitle}</h3>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">{published.length} certificate{published.length !== 1 ? "s" : ""} encrypted &amp; stored</p>
                        {reloadAuth && (
                          <p className="text-[11px] text-gray-400 font-mono mt-0.5">Batch id: <span className="text-gray-500">{reloadAuth}</span> — keep it to reload this sheet later</p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={handleExportCsv}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold border border-gray-200 hover:border-brand hover:text-brand text-gray-600 px-3 py-2 rounded-lg transition-all cursor-pointer bg-white"
                        >
                          <FileSpreadsheet className="h-3.5 w-3.5" /> Export CSV
                        </button>
                        <button
                          onClick={handleCopyAll}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold border border-gray-200 hover:border-brand hover:text-brand text-gray-600 px-3 py-2 rounded-lg transition-all cursor-pointer bg-white"
                        >
                          {publishCopied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
                          {publishCopied ? "Copied" : "Copy all"}
                        </button>
                        <button
                          onClick={resetPublishForm}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3 py-2 rounded-lg transition-all cursor-pointer bg-white"
                          title="Start a new sheet"
                        >
                          <LogOut className="h-3.5 w-3.5" /> New
                        </button>
                      </div>
                    </div>

                    <div className="max-h-[520px] overflow-y-auto rounded-xl border border-gray-150">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-surface-muted sticky top-0">
                          <tr className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Code</th>
                            <th className="px-4 py-3 font-medium w-64">Share link</th>
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
                                <span className="font-mono text-xs bg-emerald-50 border border-emerald-200 text-brand px-2 py-1 rounded-md">{c.code}</span>
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

            {/* Security note */}
            <div className="mt-10 card-white p-6 flex items-start gap-4">
              <Lock className="h-6 w-6 text-brand shrink-0 mt-0.5" />
              <div className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-900">Why this is safe even on a public website / repository:</span>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Every certificate is encrypted in your browser with AES-256-GCM; only its private code (which only the trainee receives) can unlock it.</li>
                  <li>The master sheet is encrypted with your passphrase, which is never transmitted or stored.</li>
                  <li>What lives in the database is ciphertext and a one-way hash — the same data anyone could pull from the public repo stays unreadable.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Want to issue certificates for your institution?
          </h3>
          <p className="text-gray-600 font-light max-w-2xl mx-auto">
            Our publisher sheet lets you encrypt a full batch of trainees in seconds and hand every one of them a
            verifiable, downloadable credential.
          </p>
          <button
            onClick={() => { setTab("publish"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3.5 rounded-full transition-all border-none cursor-pointer inline-flex items-center gap-2 shadow-md shadow-brand/10"
          >
            Open Publisher Sheet <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};