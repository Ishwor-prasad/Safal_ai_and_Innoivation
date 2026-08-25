import React, { useState } from "react";
import { BookOpen, GraduationCap, Sliders, Terminal, Briefcase, ArrowRight, Calendar } from "lucide-react";
import { SERVICES, INDUSTRIES } from "../../data";

interface SolutionsSectionProps {
  setConsultModalOpen: (open: boolean) => void;
}

const industryImages = [
  { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format&fit=crop", alt: "Students in a classroom in Nepal" },
  { src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80&auto=format&fit=crop", alt: "Business team reviewing work on a laptop" },
  { src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop", alt: "Officials processing official documents" },
  { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop", alt: "Development team collaborating around a table" }
];

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  setConsultModalOpen
}) => {
  const [solutionsTab, setSolutionsTab] = useState<"solutions" | "industries">("solutions");

  return (
    <>
      {/* SOLUTIONS & INDUSTRIES */}
      <section id="solutions" className="py-20 sm:py-24 bg-surface-soft scroll-mt-16 border-b border-gray-200">
        <div id="industries" className="relative top-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12">

            {/* Sticky intro + switcher */}
            <div className="xl:col-span-4 xl:sticky xl:top-28 h-fit space-y-8">
              <div className="space-y-4">
                <span className="eyebrow">What we do</span>
                <h2 className="font-display text-3xl xl:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                  Solutions built for Nepali institutions
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  From curriculum-aligned teaching assistants to business automation and e-governance tooling — practical systems designed around how organizations in Nepal actually work.
                </p>
              </div>

              <div className="flex flex-col gap-2 p-1.5 rounded-xl bg-gray-100 border border-gray-200">
                <button
                  onClick={() => setSolutionsTab("solutions")}
                  className={`w-full p-4 rounded-lg text-left transition-colors cursor-pointer border-none ${
                    solutionsTab === "solutions"
                      ? "bg-white shadow-sm"
                      : "hover:bg-white/60"
                  }`}
                >
                  <span className={`block text-sm ${solutionsTab === "solutions" ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}>
                    Our Core Solutions
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5 leading-normal">
                    Custom development, AI integration &amp; automation
                  </span>
                </button>
                <button
                  onClick={() => setSolutionsTab("industries")}
                  className={`w-full p-4 rounded-lg text-left transition-colors cursor-pointer border-none ${
                    solutionsTab === "industries"
                      ? "bg-white shadow-sm"
                      : "hover:bg-white/60"
                  }`}
                >
                  <span className={`block text-sm ${solutionsTab === "industries" ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}>
                    Industries We Serve
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5 leading-normal">
                    Education, business, government bodies &amp; NGOs
                  </span>
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="xl:col-span-8">
              {solutionsTab === "solutions" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {SERVICES.map((s, idx) => {
                    const iconsList = [BookOpen, GraduationCap, Terminal, Sliders, Briefcase];
                    const IconComp = iconsList[idx] || BookOpen;
                    return (
                      <div key={s.id} id={`service-card-${s.id}`} className="card-white p-6 lg:p-7 flex flex-col justify-between group">
                        <div>
                          <div className="h-11 w-11 rounded-lg bg-brand-muted border border-brand-border text-brand flex items-center justify-center mb-5 shrink-0">
                            <IconComp className="h-5 w-5" />
                          </div>
                          <h3 className="font-display text-lg font-semibold text-gray-900 mb-2 tracking-tight">
                            {s.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            {s.description}
                          </p>
                        </div>
                        <p className="pt-4 border-t border-gray-100 text-xs text-gray-500 leading-relaxed mt-auto">
                          {s.longDescription}
                        </p>
                        <button
                          onClick={() => setConsultModalOpen(true)}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors cursor-pointer bg-transparent border-none p-0 self-start"
                        >
                          Learn more
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {INDUSTRIES.map((ind, idx) => (
                    <div key={ind.id} id={`industry-card-${ind.id}`} className="card-elevated overflow-hidden flex flex-col group">
                      <div className="photo-frame h-44 rounded-none">
                        <img src={industryImages[idx].src} alt={industryImages[idx].alt} loading="lazy" />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-display text-lg font-semibold text-gray-900 tracking-tight">
                          {ind.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1.5">
                          {ind.subsectors.join(" · ")}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-5">
                          {ind.description}
                        </p>
                        <button
                          onClick={() => setConsultModalOpen(true)}
                          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors cursor-pointer bg-transparent border-none p-0 self-start"
                        >
                          Discuss your use case
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Consultation banner */}
            <div className="xl:col-span-12 mt-4 bg-dark-primary rounded-xl px-6 py-10 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl text-center md:text-left">
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Not sure where AI fits in your organization?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Book a free consultation — we will review your workflows and recommend the training, automation, or custom build that makes sense first.
                </p>
              </div>
              <button
                onClick={() => setConsultModalOpen(true)}
                className="bg-brand hover:bg-brand-dark text-white font-semibold py-3.5 px-7 rounded-lg transition-colors shrink-0 flex items-center gap-2 cursor-pointer border-none text-sm"
              >
                <Calendar className="h-4 w-4" />
                <span>Book a Free Consultation</span>
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
