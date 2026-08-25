import React from "react";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";

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
      className="relative bg-white pt-28 pb-16 sm:pt-40 sm:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Copy */}
          <div className="lg:col-span-6 space-y-7">
            <span className="eyebrow">{t.hero.badge}</span>

            <h1 className="font-display text-4xl sm:text-5xl xl:text-[3.5rem] font-bold tracking-tight text-gray-900 leading-[1.1]">
              {t.hero.title}{" "}
              <span className="text-brand">{t.hero.titleAccent}</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#products"
                onClick={(e) => { e.preventDefault(); handleNavClick("products"); }}
                className="bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-3.5 rounded-lg transition-colors text-center flex items-center justify-center gap-2 cursor-pointer border-none text-sm sm:text-base"
              >
                <span>{t.hero.cta1}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={() => setConsultModalOpen(true)}
                className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-semibold px-7 py-3.5 rounded-lg transition-colors text-sm sm:text-base cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="h-4 w-4 text-gray-500" />
                {t.hero.cta2}
              </button>
            </div>
          </div>

          {/* Editorial photograph */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] rounded-xl overflow-hidden bg-slate-100 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.25)]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop"
                alt="Students and professionals learning together with laptops during an AI training session"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

              <div className="absolute left-4 bottom-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-lg">
                <div className="p-2 bg-brand-muted rounded-md shrink-0">
                  <BookOpen className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">SAFAL Teacher AI</p>
                  <p className="text-xs text-gray-500">CDC-aligned lesson plans in seconds</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
