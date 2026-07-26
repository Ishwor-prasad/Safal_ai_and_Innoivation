import React from "react";
import { GraduationCap, Briefcase, Building, Award, ArrowRight } from "lucide-react";

interface ProductsSectionProps {
  handleNavClick: (sectionId: string) => void;
  navigate: (path: string) => void;
  setConsultModalOpen: (open: boolean) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  handleNavClick,
  navigate,
  setConsultModalOpen
}) => {
  return (
    <section id="products" className="py-24 bg-surface-soft border-b border-gray-200 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
            Direct Practical Tools
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our AI Products &amp; Programs
          </h2>
          <p className="text-gray-600 font-normal">
            We design and construct production-ready AI layers that integrate local context, CDC syllabi guidelines, and regional workflows. Explore our product matrix.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

          {/* Card 1: SAFAL Teacher AI */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase font-bold bg-emerald-50 text-brand border border-emerald-200 shadow-xs">
                  BETA
                </span>
                <GraduationCap className="h-5 w-5 text-brand animate-pulse" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-950 mb-1 tracking-tight">
                SAFAL Teacher AI
              </h3>
              <p className="text-[11px] font-mono text-brand font-semibold mb-4">Nepal's Curriculum Lesson Assistant</p>
              <p className="text-gray-600 text-xs leading-relaxed mb-6 font-normal">
                National curriculum-aligned AI assistant to help educators generate lesson plans, multi-level rubrics, and custom plans in seconds.
              </p>
            </div>
            <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
              <a
                href="#vibe-coding"
                onClick={(e) => { e.preventDefault(); handleNavClick("vibe-coding"); }}
                className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-brand hover:text-emerald-700 transition-colors"
              >
                <span>Launch Sandbox</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: SAFAL Business AI */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  COMING SOON
                </span>
                <Briefcase className="h-5 w-5 text-slate-500" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-950 mb-1 tracking-tight">
                SAFAL Business AI
              </h3>
              <p className="text-[11px] font-mono text-slate-500 font-medium mb-4">Intelligent Enterprise Workflows</p>
              <p className="text-gray-600 text-xs leading-relaxed mb-6 font-normal">
                A centralized execution platform for local SMEs, startups, and enterprises seeking custom automation flows.
              </p>
            </div>
            <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setConsultModalOpen(true)}
                className="bg-transparent border-none p-0 inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-slate-600 hover:text-brand transition-colors cursor-pointer"
              >
                <span>Inquire Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: SAFAL Municipal AI */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  COMING SOON
                </span>
                <Building className="h-5 w-5 text-slate-500" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-950 mb-1 tracking-tight">
                SAFAL Municipal AI
              </h3>
              <p className="text-[11px] font-mono text-slate-500 font-medium mb-4">Digital Governance Assistant</p>
              <p className="text-gray-600 text-xs leading-relaxed mb-6 font-normal">
                Bilingual support portals, records processing, and public grievance tools tailored to Nepalese local municipalities.
              </p>
            </div>
            <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setConsultModalOpen(true)}
                className="bg-transparent border-none p-0 inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-slate-600 hover:text-brand transition-colors cursor-pointer"
              >
                <span>Inquire Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Vibe Coding with AI */}
          <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-emerald-50/20 border-emerald-300/50">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase font-bold bg-emerald-50 text-brand border border-emerald-200 shadow-xs">
                  ENROLLING
                </span>
                <Award className="h-5 w-5 text-brand" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-950 mb-1 tracking-tight">
                Vibe Coding Course
              </h3>
              <p className="text-[11px] font-mono text-brand font-semibold mb-4">Learn Code from the Future</p>
              <p className="text-gray-600 text-xs leading-relaxed mb-6 font-normal">
                Nepal's premier certificate bootcamp. Build production software leveraging next-gen LLMs and Agentic AI tools.
              </p>
            </div>
            <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
              <a
                href="/courses/vibe-coding"
                onClick={(e) => { e.preventDefault(); navigate("/courses/vibe-coding"); }}
                className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-brand hover:text-emerald-700 transition-colors"
              >
                <span>Explore &amp; Enroll</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
