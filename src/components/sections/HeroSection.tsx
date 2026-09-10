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
                "8 Training Tracks",
                "ram-tamang.com.np"
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <CheckCircle className="h-3.5 w-3.5 text-brand" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Portrait — Ram Kumar Tamang */}
          <div className="lg:col-span-5 w-full">
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              <div className="offset-frame">
                <div className="relative aspect-[4/5] rounded-[1.25rem] overflow-hidden bg-surface-muted shadow-[0_28px_70px_-28px_rgba(17,37,26,0.45)]">
                  <img
                    src="/ram_tamang.jpg"
                    alt="Ram Kumar Tamang — Product Lead at SAFAL AI"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                </div>

                <div className="absolute left-4 bottom-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 flex items-center gap-3 bg-white/90 backdrop-blur rounded-full px-4 py-3 shadow-lg">
                  <div className="p-1.5 bg-brand-muted rounded-full">
                    <span className="block h-2 w-2 rounded-full bg-brand" />
                  </div>
                  <div className="pr-1">
                    <a
                      href="https://ram-tamang.com.np"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-gray-900 leading-tight hover:text-brand transition-colors block"
                    >
                      Ram Kumar Tamang
                    </a>
                    <p className="text-xs text-gray-500">Product Lead · ram-tamang.com.np</p>
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