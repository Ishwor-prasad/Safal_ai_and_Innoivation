import React from "react";
import { Target, Eye, CheckCircle2 } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 dark-section scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12 xl:gap-16 items-center">

          <div className="xl:col-span-7 space-y-7">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-light block">
              About Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Built in Nepal, for Nepal
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                SAFAL AI and Innovation Centre is a Kathmandu-based AI company helping schools, businesses, and local governments adopt artificial intelligence in practical, affordable ways.
              </p>
              <p>
                We are not a generic training institute or an offshore consultancy. Everything we build starts from Nepali realities — CDC curricula, bilingual workflows, existing paper processes — and we stay involved long after delivery to make sure the technology is actually used.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

              <div className="p-5 rounded-xl bg-white/[0.04] border border-white/10 space-y-3 transition-colors hover:border-brand-light/30 hover:bg-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <Target className="h-4.5 w-4.5 text-brand-light" />
                  <h3 className="text-sm font-semibold text-white">Our Mission</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Make practical AI accessible to every Nepali institution — regardless of size, budget, or location.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.04] border border-white/10 space-y-3 transition-colors hover:border-brand-light/30 hover:bg-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <Eye className="h-4.5 w-4.5 text-brand-light" />
                  <h3 className="text-sm font-semibold text-white">Our Vision</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To be Nepal's most trusted partner for AI education and applied technology solutions.
                </p>
              </div>

            </div>

            <ul className="space-y-2.5 pt-2 text-sm text-slate-300">
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="h-4 w-4 text-brand-light shrink-0 mt-0.5" />
                <span>Localized first — products tuned to Nepali language and administrative norms</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="h-4 w-4 text-brand-light shrink-0 mt-0.5" />
                <span>Inclusive by design — built to run on standard networks and modest hardware</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="h-4 w-4 text-brand-light shrink-0 mt-0.5" />
                <span>Your data stays yours — strict safeguards around institutional information</span>
              </li>
            </ul>
          </div>

          {/* Motion artwork — original, no stock/AI imagery */}
          <div className="xl:col-span-5 w-full">
            <div className="motion-panel aspect-[4/5] max-w-md mx-auto xl:max-w-none rounded-[1.25rem] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] flex items-center justify-center">
              <span className="aurora-a" />
              <span className="aurora-b" />
              <span className="spin-ring"><i /></span>

              <div className="relative z-10 text-center px-8 space-y-4">
                <span className="eyebrow eyebrow-center justify-center !text-brand-light">Made in Nepal</span>
                <div className="font-display text-4xl sm:text-5xl font-semibold text-white leading-tight tracking-tight">
                  काठमाडौँ
                  <span className="block text-brand-light italic mt-1">Kathmandu</span>
                </div>
                <span className="section-index text-[6rem] leading-none block select-none">01</span>
              </div>

              {/* Vertical mono label */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 [writing-mode:vertical-rl]">
                EST. 2023 — AI, SOFTWARE &amp; TRAINING
              </span>
              {/* District marquee */}
              <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 py-3 bg-black/25">
                <div className="marquee-track text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
                  {["काठमाडौँ", "ललितपुर", "पोखरा", "इटहरी", "विराटनगर", "भरतपुर", "बुटवल"].map((d) => (
                    <span key={d} className="flex items-center gap-3.5 shrink-0">
                      <span>{d}</span>
                      <span className="text-brand-light">✦</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute left-4 bottom-14 right-4 flex items-center justify-between gap-3 z-10">
                <span className="flex items-center gap-2 text-[11px] font-medium text-white/85">
                  <span className="pulse-dot" />
                  Live from Kathmandu
                </span>
                <span className="text-[11px] font-mono text-white/50">27.68°N 85.32°E</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
