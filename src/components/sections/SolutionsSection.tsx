import React, { useState } from "react";
import { BookOpen, Leaf, GraduationCap, Sliders, Terminal, Briefcase, Building, Users, ChevronRight, Calendar } from "lucide-react";
import { SERVICES, INDUSTRIES } from "../../data";

interface SolutionsSectionProps {
  stats: { trained: number; workshops: number; partners: number; learners: number };
  setConsultModalOpen: (open: boolean) => void;
}

const industryImages = [
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=500&h=300&fit=crop",
  "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=500&h=300&fit=crop"
];

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  stats,
  setConsultModalOpen
}) => {
  const [solutionsTab, setSolutionsTab] = useState<"solutions" | "industries">("solutions");

  return (
    <>
      {/* STATISTICS SECTION */}
      <section id="statistics" className="bg-surface-soft py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">

            <div className="p-4" id="stat-trained">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                <span className="text-brand">{stats.trained}+</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 tracking-wide uppercase">
                Professionals Trained
              </p>
            </div>

            <div className="p-4" id="stat-workshops">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                <span className="text-brand">{stats.workshops}+</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 tracking-wide uppercase">
                Workshops Conducted
              </p>
            </div>

            <div className="p-4" id="stat-partners">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                <span className="text-brand">{stats.partners}+</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 tracking-wide uppercase">
                Partner Institutions
              </p>
            </div>

            <div className="p-4" id="stat-impacted">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                <span className="text-brand">{stats.learners}+</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 tracking-wide uppercase">
                Learners Impacted
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* COMBINED SOLUTIONS & INDUSTRIES SECTION */}
      <section id="solutions" className="py-24 bg-surface-muted scroll-mt-10 border-b border-gray-200 relative">
        <div id="industries" className="absolute top-0 left-0 scroll-mt-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12">

            <div className="xl:col-span-4 xl:sticky xl:top-28 h-fit space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
                  Unified Ecosystem
                </span>
                <h2 className="font-display text-3xl xl:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Solutions &amp; Sectors
                </h2>
                <p className="text-gray-600 font-normal text-sm leading-relaxed">
                  We build practical, localized intelligence systems. SAFAL AI is Nepal's core innovation partner building strategic solutions, custom frameworks, and curriculum architectures to empower modern institutions.
                </p>
              </div>

              <div className="flex flex-col gap-3.5 bg-gray-100/50 p-2.5 rounded-2xl border border-gray-200/60 shadow-inner">
                <button
                  onClick={() => setSolutionsTab("solutions")}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 cursor-pointer border-none flex flex-col gap-0.5 ${
                    solutionsTab === "solutions"
                      ? "bg-brand text-white shadow-md"
                      : "bg-white hover:bg-gray-50 text-gray-700 hover:text-brand border border-gray-200"
                  }`}
                >
                  <span className="font-bold text-xs uppercase tracking-wider block">Our Core Solutions</span>
                  <span className={`text-[10px] block font-light leading-normal ${solutionsTab === "solutions" ? "text-white/80" : "text-gray-500"}`}>
                    Custom development, AI tools integration &amp; automation solutions
                  </span>
                </button>
                <button
                  onClick={() => setSolutionsTab("industries")}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 cursor-pointer border-none flex flex-col gap-0.5 ${
                    solutionsTab === "industries"
                      ? "bg-brand text-white shadow-md"
                      : "bg-white hover:bg-gray-50 text-gray-700 hover:text-brand border border-gray-200"
                  }`}
                >
                  <span className="font-bold text-xs uppercase tracking-wider block">Industries We Serve</span>
                  <span className={`text-[10px] block font-light leading-normal ${solutionsTab === "industries" ? "text-white/80" : "text-gray-500"}`}>
                    Education, Business, local Government bodies &amp; NGOs in Nepal
                  </span>
                </button>
              </div>
            </div>

            <div className="xl:col-span-8">
              {solutionsTab === "solutions" ? (
                <div className="flex flex-col md:grid md:grid-cols-2 gap-6 transition-all duration-500 animate-none">
                  {SERVICES.map((s, idx) => {
                    const iconsList = [BookOpen, Leaf, GraduationCap, Sliders, Terminal];
                    const IconComp = iconsList[idx] || Leaf;
                    return (
                      <div
                        key={s.id}
                        id={`service-card-${s.id}`}
                        className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-xl hover:border-brand/30 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-transparent group-hover:bg-brand transition-colors duration-300" />

                          <div className="h-11 w-11 rounded-xl bg-brand/10 border border-brand/20 text-brand flex items-center justify-center mb-5 group-hover:bg-brand group-hover:text-white transition-all duration-300 shrink-0">
                            <IconComp className="h-5 w-5" />
                          </div>

                          <h3 className="font-display text-lg font-bold text-gray-900 mb-2.5 tracking-tight group-hover:text-brand transition-colors">
                            {s.title}
                          </h3>

                          <p className="text-gray-655 text-xs leading-relaxed mb-4 font-normal">
                            {s.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 mt-auto">
                          <p className="text-[11px] text-gray-500 font-normal leading-relaxed">
                            {s.longDescription}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col md:grid md:grid-cols-2 gap-6 transition-all duration-500 animate-none">
                  {INDUSTRIES.map((ind, idx) => {
                    const icons = [BookOpen, Briefcase, Building, Users];
                    const IconComp = icons[idx] || Users;
                    return (
                      <div
                        key={ind.id}
                        id={`industry-card-${ind.id}`}
                        className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-xl hover:border-brand/30 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="image-panel h-36 mb-5 -mt-2">
                            <img src={industryImages[idx]} alt={`${ind.title} AI deployment`} loading="lazy" />
                            <div className="image-panel-caption">
                              <span className="text-[10px] font-mono text-emerald-300 bg-slate-950/90 border border-emerald-500/50 px-2 py-0.5 rounded uppercase tracking-widest font-bold shadow-sm">{ind.title}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-4.5">
                            <div className="h-10 w-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center border border-brand/20 shrink-0">
                              <IconComp className="h-4.5 w-4.5" />
                            </div>
                            <div>
                              <h3 className="font-display text-lg font-bold text-gray-900 tracking-tight group-hover:text-brand transition-colors">
                                {ind.title}
                              </h3>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {ind.subsectors.map((s, i) => (
                                  <span key={i} className="text-[9px] bg-brand/5 text-brand border border-brand/10 font-mono tracking-wider px-2 py-0.5 rounded-full uppercase">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-655 text-xs leading-relaxed mb-5 font-normal">
                            {ind.description}
                          </p>
                        </div>

                        <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-500">
                          <span>Target Deployment Matrix</span>
                          <span className="text-brand flex items-center gap-0.5 group">
                            <span>Inquire Scope</span>
                            <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="col-span-12 mt-8 consult-card-light rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand/5 rounded-full filter blur-[50px] pointer-events-none" />
              <div className="space-y-3 max-w-2xl text-center md:text-left">
                <span className="text-xs font-mono text-brand font-bold tracking-wider uppercase block">
                  Enterprise &amp; Academic Integration
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Need a Customized AI Integration Strategy?
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                  Our core solutions team will analyze your organizational parameters and recommend tailor-made AI automations, workforce training packages, or custom product architecture.
                </p>
              </div>

              <button
                onClick={() => setConsultModalOpen(true)}
                className="bg-brand text-white hover:bg-brand-light font-semibold py-4 px-8 rounded-full transition-all text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 hover:scale-105 shrink-0 flex items-center gap-2 cursor-pointer border-none"
              >
                <span>Request Strategic Call</span>
                <Calendar className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
