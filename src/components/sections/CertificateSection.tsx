import React from "react";
import { ShieldCheck, ArrowRight, FileSpreadsheet, Download, Lock } from "lucide-react";

interface CertificateSectionProps {
  navigate: (path: string) => void;
}

export const CertificateSection: React.FC<CertificateSectionProps> = ({ navigate }) => {
  const steps = [
    { icon: FileSpreadsheet, title: "Encrypted publisher sheet", desc: "Paste trainee names; the whole batch is encrypted with your passphrase before storage." },
    { icon: ShieldCheck, title: "Private per-certificate codes", desc: "Every trainee gets a unique code that is the only key able to unlock their credential." },
    { icon: Download, title: "Shareable & downloadable", desc: "One link verifies the certificate and lets the owner download it as a crisp PNG." },
  ];

  return (
    <section id="certificates" className="py-20 sm:py-24 dark-section border-b border-gray-800 scroll-mt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 space-y-7 relative z-10">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full">
              <Lock className="h-3.5 w-3.5" />
              Encrypted Credentials
            </div>
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Issue authentic digital certificates — <span className="text-gradient-green">encrypted end to end</span>
              </h2>
              <p className="mt-4 text-gray-400 text-base sm:text-lg font-light leading-relaxed max-w-xl">
                Every certificate is encrypted in the browser before it ever leaves your device. The public database
                only ever holds unreadable ciphertext — safe even with a fully public repository.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {steps.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="h-10 w-10 rounded-xl bg-brand/20 border border-brand-border/40 flex items-center justify-center mb-3">
                    <s.icon className="h-5 w-5 text-[#9BD1AE]" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => navigate("/certificates")}
                className="bg-brand hover:bg-brand-light text-white font-semibold px-8 py-3.5 rounded-full transition-all inline-flex items-center justify-center gap-2 group shadow-md border-none cursor-pointer hover:scale-105"
              >
                Open Certificate Center
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/certificates")}
                className="bg-transparent hover:bg-white/5 border border-white/20 text-gray-200 font-medium px-8 py-3.5 rounded-full transition-all text-center text-sm cursor-pointer"
              >
                Verify a certificate
              </button>
            </div>
          </div>

          {/* Visual preview mock */}
          <div className="lg:col-span-6 relative z-10 hidden sm:block">
            <div className="relative max-w-[520px] mx-auto">
              <div className="absolute -inset-8 bg-brand/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative bg-[#FBF9F2] rounded-2xl p-2 shadow-2xl">
                <div className="border-[3px] border-[#1E5A3A] rounded-xl px-6 py-8 text-center">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#1E5A3A] font-semibold">SAFAL AI AND INNOVATION CENTRE</p>
                  <p className="mt-1 font-mono text-[8px] tracking-[0.14em] text-gray-500">CERTIFIED BY SAFALAI.COM.NP</p>
                  <div className="w-40 h-px bg-[#CFE0D5] mx-auto my-6" />
                  <h3 className="font-display text-3xl font-bold text-gray-900">Certificate of<br />Completion</h3>
                  <p className="text-[11px] text-gray-500 mt-4">this is proudly presented to</p>
                  <p className="font-display text-3xl italic text-[#1E5A3A] mt-1">Samir Shrestha</p>
                  <p className="text-[11px] text-gray-600 mt-3">for successfully completing the training program</p>
                  <p className="font-display italic text-base text-[#16412B] mt-1">AI Fundamentals &amp; Prompt Engineering</p>
                  <div className="flex items-center justify-between mt-8">
                    <span className="text-[9px] text-gray-500 font-mono">Issued on 2026-08-30</span>
                    <div className="h-12 w-12 rounded-full border-[3px] border-[#1E5A3A] flex items-center justify-center">
                      <span className="font-display text-[9px] font-bold text-[#1E5A3A]">SAFAL</span>
                    </div>
                    <span className="text-[9px] text-gray-500 font-mono"># 2K7M-Q4BR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};