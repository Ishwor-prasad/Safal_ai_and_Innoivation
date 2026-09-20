import React from "react";
import { ShieldCheck, ArrowRight, FileSpreadsheet, Download, Lock } from "lucide-react";

interface CertificateSectionProps {
  navigate: (path: string) => void;
}

export const CertificateSection: React.FC<CertificateSectionProps> = ({ navigate }) => {
  const steps = [
    { icon: FileSpreadsheet, title: "Encrypted publisher sheet", desc: "Paste trainee names from Google Sheets; the whole batch is encrypted with your passphrase before storage." },
    { icon: ShieldCheck, title: "Phone or email is the key", desc: "Each trainee unlocks their own certificate with just the phone or email they registered — no codes to hand out." },
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
              <div className="absolute -inset-8 bg-[#00a878]/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative bg-[#FBF9F2] rounded-2xl p-2 shadow-2xl">
                <div className="relative rounded-xl px-6 py-8 text-center overflow-hidden">
                  <p className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#b76e6e]/50 tracking-[0.3em] whitespace-nowrap rotate-[-3deg]">
                    0101011001010110 0101011001010110 0101011001010110
                  </p>
                  <p className="relative font-display text-2xl font-bold text-[#10253d]">SAFAL AI</p>
                  <p className="relative text-[8px] tracking-[0.28em] text-[#b9964f] font-semibold">AND INNOVATION CENTRE</p>
                  <p className="relative text-[8px] italic tracking-[0.12em] text-[#b9964f] mt-0.5">EMPOWERING MINDS, BUILDING INTELLIGENCE</p>

                  <div className="relative mt-6">
                    <h3 className="font-display text-3xl font-bold text-[#10253d]">CERTIFICATE</h3>
                    <p className="text-[9px] tracking-[0.3em] text-[#b9964f] font-semibold mt-1">OF COMPLETION</p>
                    <div className="w-32 h-px bg-[#b9964f] mx-auto mt-3" />
                  </div>

                  <p className="relative text-[9px] tracking-[0.14em] text-[#10253d] font-semibold mt-5">THIS IS TO CERTIFY THAT</p>
                  <p className="relative font-display text-3xl text-[#10253d] mt-2 border-b-[3px] border-[#b9964f] inline-block pb-1">Samir Shrestha</p>
                  <p className="relative text-[10px] text-gray-600 mt-4">has successfully completed the</p>
                  <p className="relative font-display text-sm font-semibold text-[#10253d]">AI Fundamentals &amp; Prompt Engineering</p>
                  <p className="relative text-[10px] text-gray-600 mt-2">organized by Safal AI and Innovation Centre,<br />held at Prakriti Resources Centre, Kathmandu.</p>
                  <p className="relative text-[10px] text-gray-500 italic mt-2">We commend your dedication and commitment to learning,<br />and wish you success in your future endeavors.</p>

                  <div className="relative flex items-center justify-center gap-8 mt-8 pb-1">
                    <span className="text-2xl text-[#b9964f] leading-none">★</span>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-32 border-t border-[#b8b2a0]" />
                      <p className="text-[9px] font-bold text-[#10253d]">Ishwor Dhungana</p>
                      <p className="text-[8px] text-gray-500">Lead AI Facilitator</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-32 border-t border-[#b8b2a0]" />
                      <p className="text-[9px] font-bold text-[#10253d]">Uday Ram Jaishi</p>
                      <p className="text-[8px] text-gray-500">Chief Executive Officer</p>
                    </div>
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