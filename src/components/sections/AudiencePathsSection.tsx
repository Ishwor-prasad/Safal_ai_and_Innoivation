import React from "react";
import { Briefcase, GraduationCap, User, ArrowRight, Calendar } from "lucide-react";
import { AUDIENCE_PATHS } from "../../data";

interface AudiencePathsSectionProps {
  t: any;
  setConsultSector: (sector: string) => void;
  setConsultModalOpen: (open: boolean) => void;
  handleNavClick: (sectionId: string) => void;
}

export const AudiencePathsSection: React.FC<AudiencePathsSectionProps> = ({
  t,
  setConsultSector,
  setConsultModalOpen,
  handleNavClick
}) => {
  const iconsList = [Briefcase, GraduationCap, User];

  const handleCardAction = (id: string) => {
    if (id === "individuals") {
      handleNavClick("training");
      return;
    }
    setConsultSector(id === "corporates" ? "Enterprise" : "Education");
    setConsultModalOpen(true);
  };

  return (
    <section className="py-20 sm:py-24 bg-surface-soft border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="eyebrow">{t.audience?.eyebrow ?? "Who is this for?"}</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight mt-4">
            {t.audience?.heading ?? "Pick your path — we'll handle the rest"}
          </h2>
          <p className="text-gray-600 leading-relaxed mt-3">
            {t.audience?.subheading ?? "Three ways to work with us, each with its own clear starting point."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {AUDIENCE_PATHS.map((path, idx) => {
            const IconComp = iconsList[idx] || Briefcase;
            return (
              <div key={path.id} className="card-white p-7 lg:p-8 flex flex-col group">
                <div className="h-12 w-12 rounded-full bg-brand-muted border border-brand-border text-brand flex items-center justify-center mb-6 shrink-0">
                  <IconComp className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 tracking-tight mb-2">
                  {path.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {path.description}
                </p>
                <button
                  onClick={() => handleCardAction(path.id)}
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold py-3 px-5 rounded-full transition-colors cursor-pointer border-none text-sm shrink-0"
                >
                  {path.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setConsultModalOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            <Calendar className="h-4 w-4" />
            {t.audience?.fallbackCta ?? "Not sure which path? Book a free consultation"}
          </button>
        </div>
      </div>
    </section>
  );
};