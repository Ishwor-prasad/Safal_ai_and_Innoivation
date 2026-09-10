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
    <section id="hero" className="relative bg-white pt-28 pb-20 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Soft abstract depth — same art language as the rest of the page */}
      <div className="blob h-96 w-96 top-[-6rem] right-[-4rem] bg-brand-muted opacity-60" />
      <div className="blob h-72 w-72 bottom-[-8rem] left-[-5rem] bg-brand-border opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Editorial masthead copy */}
          <div className="lg:col-span-6 space-y-7">
            <span className="eyebrow">{t.hero.badge}</span>

            <h1 className="font-display text-4xl sm:text-6xl xl:text-[4rem] font-semibold tracking-tight text-gray-900 leading-[1.05]">
              {t.hero.title}{" "}
              <span className="text-brand italic">{t.hero.titleAccent}</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <button
                onClick={() => setConsultModalOpen(true)}
                className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-center flex items-center justify-center gap-2 cursor-pointer border-none text-sm sm:text-base"
              >
                <span>{t.hero.cta2}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#solutions"
                onClick={(e) => { e.preventDefault(); handleNavClick("solutions"); }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors cursor-pointer"
              >
                {t.hero.cta1}
                <ArrowRight className="h-3.5 w-3.5" />
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

            {/* Editorial footnote */}
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-400 pt-1">
              <span className="pulse-dot" />
              AI Studio — काठमाडौँ · Now taking 2026 cohorts
            </div>
          </div>

          {/* Featured video card — uses the site's photo-frame + caption language */}
          <div className="lg:col-span-6 w-full">
            <div className="offset-frame">
              <div className="photo-frame rounded-[1.25rem] aspect-[4/5] max-w-md mx-auto lg:max-w-none">
                <img
                  src="/hero-cover.jpg"
                  alt="SAFAL AI hands-on training session with participants in a classroom in Kathmandu"
                  loading="eager"
                  fetchPriority="high"
                />
                <span className="photo-caption flex items-center justify-between font-mono uppercase tracking-[0.2em] text-[10px] text-white/80">
                  <span>Session 01 — AI TRAINING · काठमाडौँ</span>
                  <span className="section-index !text-[2.5rem] leading-none text-brand-light">26</span>
                </span>
              </div>
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-gray-400 text-center lg:text-left">
              LIVE FROM THE WORKSHOP FLOOR — REAL SESSION, REAL PEOPLE
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};