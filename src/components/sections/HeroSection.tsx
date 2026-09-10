import React from "react";
import { ArrowRight, Calendar, CheckCircle } from "lucide-react";

interface HeroSectionProps {
  t: any;
  handleNavClick: (sectionId: string) => void;
  setConsultModalOpen: (open: boolean) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  handleNavClick,
  setConsultModalOpen
}) => {
  return (
    <section
      id="hero"
      className="relative bg-white pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden"
    >
      {/* Abstract art layer */}
      <div className="blob h-96 w-96 top-[-6rem] right-[-4rem] bg-brand-muted opacity-70" />
      <div className="blob h-72 w-72 bottom-[-8rem] left-[-5rem] bg-brand-border opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Copy */}
          <div className="lg:col-span-7 space-y-7">
            <span className="eyebrow">{t.hero.badge}</span>

            <h1 className="font-display text-4xl sm:text-6xl xl:text-[4rem] font-semibold tracking-tight text-gray-900 leading-[1.05]">
              {t.hero.title}{" "}
              <span className="text-brand italic">{t.hero.titleAccent}</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setConsultModalOpen(true)}
                className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-center flex items-center justify-center gap-2 cursor-pointer border-none text-sm sm:text-base"
              >
                <span>{t.hero.cta2}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#products"
                onClick={(e) => { e.preventDefault(); handleNavClick("products"); }}
                className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-semibold px-8 py-3.5 rounded-full transition-colors text-sm sm:text-base cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="h-4 w-4 text-gray-500" />
                {t.hero.cta1}
              </a>
            </div>

            {/* Social proof strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              {[
                "CDC Aligned",
                "Bilingual EN · नेपाली",
                "8 Training Tracks"
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <CheckCircle className="h-3.5 w-3.5 text-brand" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Cinematic motion-art cover — Drifted Himalayan base + flowing light */}
          <div className="lg:col-span-5 w-full">
            <div className="offset-frame">
              <div
                className="motion-panel aspect-[4/5] rounded-[1.25rem] shadow-[0_28px_70px_-28px_rgba(17,37,26,0.45)] flex items-center justify-center max-w-sm mx-auto lg:max-w-none"
                aria-hidden="true"
              >
                <img
                  src="/hero-cover.jpg"
                  alt=""
                  className="cover-base"
                  loading="eager"
                  decoding="async"
                />
                <span className="cover-tint" />
                <span className="stream" />
                <span className="stream s2" />
                <span className="aurora-a" />
                <span className="aurora-b" />
                <span className="spin-ring"><i /></span>

                <div className="relative z-10 text-center px-6 sm:px-10 space-y-5 select-none breathe">
                  <span className="eyebrow eyebrow-center justify-center !text-brand-light">AI Studio — काठमाडौँ</span>
                  <div className="font-display leading-none">
                    <span className="block text-6xl sm:text-7xl font-semibold text-white tracking-tight">AI</span>
                    <span className="block text-3xl sm:text-4xl font-semibold text-brand-light italic mt-2">for Nepal</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/60">
                    <span className="pulse-dot" />
                    Now taking 2026 cohorts
                  </div>
                  <span className="section-index text-[5rem] leading-none block select-none">26</span>
                </div>

                {/* Vertical mono label */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 [writing-mode:vertical-rl]">
                  EST. 2023 — AI, SOFTWARE &amp; TRAINING
                </span>

                {/* Offering marquee */}
                <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 py-3 bg-black/25">
                  <div className="marquee-track text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
                    {["शिक्षा", "Education", "व्यवसाय", "Business", "सरकार", "Government", "अनुसन्धान", "Research"].map((d) => (
                      <span key={d} className="flex items-center gap-3.5 shrink-0">
                        <span>{d}</span>
                        <span className="text-brand-light">✦</span>
                      </span>
                    ))}
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