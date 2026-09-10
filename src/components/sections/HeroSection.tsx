import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

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
    <section id="hero" className="relative bg-[#070E0A] overflow-hidden">
      {/* Full-bleed footage — the hero IS the video */}
      <video
        className="absolute inset-0 w-full h-full object-cover sm:object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Legibility veils — left-weighted for text, bottom fade for marquee */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070E0A]/95 via-[#070E0A]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070E0A]/85 via-transparent to-[#070E0A]/40" />

      {/* Ghost serif word — large, behind the copy */}
      <span
        aria-hidden="true"
        className="ghost-word hero-ghost"
      >
        AI
      </span>

      {/* Constellation dots */}
      <span className="hdot h-2 w-2 top-[22%] right-[24%] text-[#4AE27B]" style={{ animation: "hdot-breathe 6s ease-in-out -1.5s infinite" }} />
      <span className="hdot h-1.5 w-1.5 bottom-[32%] right-[12%] text-[#CFE0D5]" style={{ animation: "hdot-breathe 4.5s ease-in-out infinite" }} />
      <span className="hdot h-1 w-1 top-[40%] right-[58%] text-[#CFE0D5]" style={{ animation: "hdot-breathe 5s ease-in-out -3s infinite" }} />

      {/* Vertical label */}
      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/35 [writing-mode:vertical-rl] z-10 hidden lg:block">
        EST. 2023 — AI, SOFTWARE &amp; TRAINING
      </span>

      {/* Copy on the footage */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 min-h-[92svh] flex flex-col justify-center py-28 sm:py-32">
        <div className="max-w-3xl space-y-7">
          <span className="eyebrow !text-brand-light [&::before]:bg-brand-light">
            {t.hero.badge}
          </span>

          <h1 className="font-display text-[2.75rem] leading-[1.02] sm:text-6xl xl:text-[4.5rem] font-semibold tracking-tight text-white">
            {t.hero.title}{" "}
            <span className="text-brand-light italic">{t.hero.titleAccent}</span>
          </h1>

          <p className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setConsultModalOpen(true)}
              className="bg-brand hover:bg-brand-light text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-center flex items-center justify-center gap-2 cursor-pointer border-none text-sm sm:text-base"
            >
              <span>{t.hero.cta2}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#products"
              onClick={(e) => { e.preventDefault(); handleNavClick("products"); }}
              className="border border-white/30 bg-white/5 backdrop-blur hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm sm:text-base cursor-pointer flex items-center justify-center gap-2"
            >
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
              <span key={item} className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                <CheckCircle className="h-3.5 w-3.5 text-brand-light" />
                {item}
              </span>
            ))}
          </div>

          {/* Cohort pulse */}
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/45 pt-1">
            <span className="pulse-dot" />
            Now taking 2026 cohorts
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-10 border-t border-white/10 bg-black/30 py-3">
        <div className="marquee-track text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
          {["शिक्षा", "Education", "व्यवसाय", "Business", "सरकार", "Government", "अनुसन्धान", "Research"].map((d) => (
            <span key={d} className="flex items-center gap-3.5 shrink-0">
              <span>{d}</span>
              <span className="text-brand-light">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};