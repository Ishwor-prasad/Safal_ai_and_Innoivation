import React, { useState } from "react";
import { ChevronRight, Check, GraduationCap } from "lucide-react";
import { TRAINING_PROGRAMS, RESEARCH_FOCUS_AREAS } from "../../data";
import { TrainingProgram } from "../../types";

interface LearningHubSectionProps {
  setSelectedSyllabusProg: (prog: TrainingProgram | null) => void;
  setConsultSector: (sector: string) => void;
  setConsultMessage: (msg: string) => void;
  setConsultModalOpen: (open: boolean) => void;
}

export const LearningHubSection: React.FC<LearningHubSectionProps> = ({
  setSelectedSyllabusProg,
  setConsultSector,
  setConsultMessage,
  setConsultModalOpen
}) => {
  const [learningTab, setLearningTab] = useState<"training" | "research">("training");

  return (
    <section id="training" className="py-24 bg-surface-soft border-b border-gray-200 scroll-mt-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div id="research" className="absolute top-0 left-0 scroll-mt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold text-brand tracking-widest uppercase block font-mono">
            Skill &amp; Knowledge Accelerator
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Learning &amp; Research Hub
          </h2>
          <p className="text-gray-600 font-normal">
            We build outcomes. SAFAL AI is dedicated to educational capacity building and pioneering research in artificial intelligence. Toggle between our training courses and research focus areas below.
          </p>
        </div>

        {/* Interactive Toggle Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 border border-gray-200 p-1.5 rounded-full flex gap-1 shadow-sm">
            <button
              onClick={() => setLearningTab("training")}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none ${
                learningTab === "training"
                  ? "bg-brand text-white shadow-md font-bold"
                  : "text-gray-500 hover:text-brand"
              }`}
            >
              Training Programs
            </button>
            <button
              onClick={() => setLearningTab("research")}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none ${
                learningTab === "research"
                  ? "bg-brand text-white shadow-md font-bold"
                  : "text-gray-500 hover:text-brand"
              }`}
            >
              Research Focus Areas
            </button>
          </div>
        </div>

        {/* Tab Panels */}
        {learningTab === "training" ? (
          <div className="space-y-12 transition-all duration-500 animate-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {TRAINING_PROGRAMS.map((prog) => (
                <div
                  key={prog.id}
                  id={`training-card-${prog.id}`}
                  className="bg-[#0F172A] border border-emerald-500/30 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-2xl hover:border-emerald-400/60"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-3 py-1 rounded-md shadow-xs">
                        {prog.duration}
                      </span>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 font-bold">
                        Accredited Course
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white mb-1 tracking-tight">
                      {prog.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-300 mb-6 font-mono">Target: {prog.target}</p>

                    <div className="space-y-4 mb-8">
                      <p className="text-xs text-slate-200 leading-relaxed font-normal">
                        Empowering learners to command standard ML methodologies, curate custom LLM weights, and build production integrations safely.
                      </p>
                      <button
                        onClick={() => setSelectedSyllabusProg(prog)}
                        className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:text-emerald-300 transition-colors bg-transparent border-none cursor-pointer p-0"
                      >
                        <span>Explore Detailed Syllabus Modules</span>
                        <ChevronRight className="h-3.5 w-3.5 text-emerald-400" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex gap-2">
                    <button
                      onClick={() => {
                        setConsultSector("Education");
                        setConsultMessage(`I'm highly interested in registering for the "${prog.title}" AI Learning Program. Please provide schedule details.`);
                        setConsultModalOpen(true);
                      }}
                      className="flex-1 text-center bg-brand hover:bg-brand-light text-white font-semibold text-xs py-3 rounded-lg transition-all cursor-pointer uppercase tracking-wider border-none shadow-lg shadow-emerald-900/30"
                    >
                      Enroll Info
                    </button>
                    <button
                      onClick={() => setSelectedSyllabusProg(prog)}
                      className="px-4 text-center bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs py-3 rounded-lg transition-all cursor-pointer border border-slate-600"
                    >
                      Syllabus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setConsultSector("Education");
                  setConsultMessage("Hi, I want details regarding standard academic program options and available custom slots.");
                  setConsultModalOpen(true);
                }}
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light hover:scale-105 transition-all text-white font-medium text-sm py-4 px-8 rounded-full shadow-lg shadow-brand/10 cursor-pointer border-none"
              >
                <span>Explore Custom Institutional Programs</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12 items-center transition-all duration-500 animate-none">
            <div className="xl:col-span-6 space-y-6">
              <span className="text-xs font-semibold text-brand tracking-widest uppercase block font-mono">
                Pioneering Tomorrow
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Researching Tomorrow's <br />AI Solutions
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                SAFAL AI is deeply committed to exploring innovative AI applications that address Nepal's unique educational, corporate, linguistic, and societal challenges. We believe in building solutions that scale across geography and resource diversity.
              </p>

              <div className="pt-4 space-y-3.5 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-green-50 border border-green-200 flex items-center justify-center text-brand shrink-0 mt-0.5">
                    <Check className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-950 block">Local NLP Fine-Tuning</span>
                    <p className="text-xs text-gray-500 leading-relaxed font-normal">Deploying LLM adapters and classifiers that operate in highly refined Nepali syntax structures.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-green-50 border border-green-200 flex items-center justify-center text-brand shrink-0 mt-0.5">
                    <Check className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-950 block">Resource-Constrained Optimization</span>
                    <p className="text-xs text-gray-500 leading-relaxed font-normal">Designing server-assisted workflows that execute seamlessly over standard mobile data links.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-6 space-y-4">
              <span className="text-xs font-mono text-gray-500 block tracking-wider uppercase mb-2">
                Primary Research &amp; Focus Domains:
              </span>

              <div className="space-y-3.5">
                {RESEARCH_FOCUS_AREAS.map((focus) => (
                  <div
                    key={focus.id}
                    id={`research-row-${focus.id}`}
                    className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-brand/40 hover:shadow-md transition-all flex items-start gap-4"
                  >
                    <div className="h-9 w-9 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center text-brand shrink-0">
                      <GraduationCap className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-gray-950 tracking-tight">
                        {focus.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed mt-1 font-light">
                        {focus.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
