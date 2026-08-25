import React, { useState } from "react";
import { ChevronRight, Check, Clock, Users } from "lucide-react";
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
    <section id="training" className="py-20 sm:py-24 bg-white border-b border-gray-200 scroll-mt-16">
      <div id="research" className="relative top-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
          <span className="eyebrow eyebrow-center justify-center">Training &amp; Research</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Practical programs, serious research
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Short, hands-on courses that get teams using AI confidently — backed by applied research on what works in Nepal.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface-muted border border-gray-200 p-1 rounded-lg flex flex-wrap justify-center gap-1">
            <button
              onClick={() => setLearningTab("training")}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer border-none ${
                learningTab === "training"
                  ? "bg-white shadow-sm text-gray-900 font-semibold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Training Programs
            </button>
            <button
              onClick={() => setLearningTab("research")}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer border-none ${
                learningTab === "research"
                  ? "bg-white shadow-sm text-gray-900 font-semibold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Research Areas
            </button>
          </div>
        </div>

        {learningTab === "training" ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {TRAINING_PROGRAMS.map((prog) => (
                <div key={prog.id} id={`training-card-${prog.id}`} className="card-white p-7 lg:p-8 flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-surface-muted border border-gray-200 px-2.5 py-1 rounded-md">
                      <Clock className="h-3.5 w-3.5 text-gray-400" />
                      {prog.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 min-w-0">
                      <Users className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                      <span className="truncate">{prog.target}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-gray-900 tracking-tight">
                    {prog.title}
                  </h3>

                  <ul className="space-y-2 mt-4 mb-6">
                    {prog.syllabus.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex gap-2 items-start text-xs text-gray-600 leading-snug">
                        <Check className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedSyllabusProg(prog)}
                      className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors cursor-pointer bg-transparent border-none p-0 inline-flex items-center gap-1"
                    >
                      Full syllabus
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setConsultSector("Education");
                        setConsultMessage(`I'm interested in enrolling in the "${prog.title}" training program. Please share schedule and pricing details.`);
                        setConsultModalOpen(true);
                      }}
                      className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer border-none"
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Running a larger rollout? We design custom programs for whole institutions.
              </p>
              <button
                onClick={() => {
                  setConsultSector("Education");
                  setConsultMessage("Hi, I'd like to discuss a custom training program for our institution.");
                  setConsultModalOpen(true);
                }}
                className="inline-flex items-center gap-2 border border-gray-300 hover:border-brand hover:text-brand text-gray-700 font-semibold text-sm py-3 px-6 rounded-lg transition-colors cursor-pointer bg-transparent"
              >
                Plan an institutional program
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            <div className="xl:col-span-5 space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                Research grounded in local reality
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our findings feed directly back into products and coursework — so what we teach reflects what actually works in Nepali classrooms, offices, and municipalities.
              </p>
              <div className="pt-2 space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-brand shrink-0 mt-1" />
                  <p className="text-sm text-gray-600">Nepali-language NLP evaluated on locally written text</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-brand shrink-0 mt-1" />
                  <p className="text-sm text-gray-600">Tools designed to run well on modest connections and hardware</p>
                </div>
              </div>
            </div>

            <div className="xl:col-span-7 space-y-3 w-full">
              {RESEARCH_FOCUS_AREAS.map((focus) => (
                <div key={focus.id} id={`research-row-${focus.id}`} className="card-white p-5 lg:p-6 flex items-start gap-4">
                  <div className="hidden sm:flex h-9 w-9 rounded-lg bg-brand-muted border border-brand-border text-brand items-center justify-center shrink-0 font-display text-sm font-bold">
                    {focus.title.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-gray-900 tracking-tight">
                      {focus.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed mt-1">
                      {focus.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
