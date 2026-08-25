import React, { useState } from "react";
import { ArrowRight, Award, Plus, Minus, CheckCircle2, Calendar } from "lucide-react";
import { VIBE_STATS, VIBE_MODULES, VIBE_SKILLS, VIBE_SCHEDULES } from "../data";

interface VibeCodingPageProps {
  navigate: (path: string) => void;
  setConsultSector: (sector: string) => void;
  setConsultMessage: (msg: string) => void;
  setConsultModalOpen: (open: boolean) => void;
}

export const VibeCodingPage: React.FC<VibeCodingPageProps> = ({
  navigate,
  setConsultSector,
  setConsultMessage,
  setConsultModalOpen
}) => {
  const [activeWeekAccordion, setActiveWeekAccordion] = useState<string | null>("vm-01");

  return (
    <div className="bg-white flex-1 animate-fade-in">
      {/* Course Hero Banner */}
      <div className="relative bg-gradient-to-br from-white via-[#f5f5f7] to-white pt-24 pb-12 sm:pt-36 sm:pb-20 overflow-hidden border-b border-gray-250">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-green-400/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-brand/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest bg-emerald-50 border border-emerald-200 text-brand px-3 py-1.5 rounded-full shadow-xs">
                  <span className="h-1.5 w-1.5 bg-brand rounded-full inline-block animate-pulse" />
                  New Course 2026
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest bg-emerald-50/80 border border-emerald-200 text-slate-700 px-3 py-1.5 rounded-full shadow-xs">
                  🎓 Industry Certificate Included
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Vibe Coding <br />
                <span className="text-gradient-green">with AI</span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                Learn to build real-world software applications faster using cutting-edge AI coding assistants like Claude Code and Gemini CLI. Master prompt engineering, multi-agent frameworks, and ship production-ready projects in days rather than months.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <a
                  href="#batches"
                  className="bg-brand hover:bg-brand-light text-white font-semibold px-8 py-3.5 rounded-full transition-all text-center flex items-center justify-center gap-2 group shadow-md hover:scale-105 border-none"
                >
                  <span>Choose Batch &amp; Enroll</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => {
                    setConsultSector("Education");
                    setConsultMessage("I am interested in learning more about the Vibe Coding course.");
                    setConsultModalOpen(true);
                  }}
                  className="bg-transparent hover:bg-gray-50 border border-gray-250 text-gray-800 font-medium px-8 py-3.5 rounded-full transition-all text-center tracking-wide cursor-pointer text-sm hover:scale-105"
                >
                  Speak with a Consultant
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center w-full">
              <div className="w-full max-w-[420px] aspect-video sm:aspect-square bg-gray-50 border border-gray-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand font-bold block border-b border-gray-200 pb-2">Program Overview</span>
                  <div className="space-y-3 font-sans">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Duration:</span>
                      <span className="font-semibold text-gray-900">1.5 Months (68 Hours)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Pace:</span>
                      <span className="font-semibold text-gray-900">Intensive Hands-on Lab</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Methodology:</span>
                      <span className="font-semibold text-gray-900">AI-First Pair Programming</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Projects Shipped:</span>
                      <span className="font-semibold text-gray-900">3 Local Implementations</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50/50 border border-green-100 rounded-xl p-4 flex items-center gap-3">
                  <Award className="h-6 w-6 text-brand shrink-0" />
                  <p className="text-[11px] text-gray-700 leading-normal">
                    Earn a digital credential recognized by key technology municipalities and organizations in Kathmandu.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {VIBE_STATS.map((stat, idx) => (
              <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-6 text-center shadow-sm">
                <p className="text-3xl font-extrabold text-brand mb-1">{stat.value}</p>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Syllabus Section */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="section-badge">6-Week Curriculum</span>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
              Syllabus Built for the Agentic Era
            </h2>
            <p className="text-gray-600 font-light">
              Traditional software bootcamps focus on syntax. We focus on velocity. You'll pair program directly with models to generate code, refactor UI elements, compile packages, and publish live servers.
            </p>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
              <h4 className="font-display font-semibold text-gray-950 text-sm">Key Technologies Covered:</h4>
              <div className="flex flex-wrap gap-2">
                {["Claude Code", "Gemini API", "Vite JS", "Git / GitHub", "Docker Basics", "Tailwind CSS"].map((tech) => (
                  <span key={tech} className="bg-white text-gray-700 text-xs font-mono border border-gray-200 px-3 py-1 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-display text-xl font-bold text-gray-950 border-b border-gray-150 pb-4 mb-2">
              Curriculum Weekly Modules
            </h3>
            
            <div className="divide-y divide-gray-100">
              {VIBE_MODULES.map((mod) => {
                const isOpen = activeWeekAccordion === mod.id;
                return (
                  <div key={mod.id} className="py-4 last:pb-0">
                    <button
                      onClick={() => setActiveWeekAccordion(isOpen ? null : mod.id)}
                      className="w-full flex items-center justify-between text-left font-display font-bold text-base sm:text-lg text-gray-900 py-2 hover:text-brand transition-colors border-none bg-transparent cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono bg-green-50 text-brand border border-green-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {mod.week}
                        </span>
                        <span>{mod.title}</span>
                      </div>
                      {isOpen ? <Minus className="h-4 w-4 text-gray-400" /> : <Plus className="h-4 w-4 text-gray-400" />}
                    </button>
                    {isOpen && (
                      <div className="mt-3 pl-4 space-y-2 border-l-2 border-brand/30 animate-fade-in">
                        <ul className="space-y-2">
                          {mod.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 font-sans font-light">
                              <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Skills Section */}
      <div className="py-24 bg-gray-50 border-y border-gray-250">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="section-badge">Skill Competencies</span>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
              What Competencies You'll Build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VIBE_SKILLS.map((skill, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white border border-gray-150 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-green-50 text-brand rounded-xl text-xl shrink-0">
                  {skill.icon || "⚡"}
                </div>
                <div>
                  <h4 className="font-display font-semibold text-gray-950 text-base mb-1">{skill.title || skill.label}</h4>
                  <p className="text-sm text-gray-600 font-sans font-light leading-relaxed">{skill.description || "Master production-ready AI workflows and real-world tools integration."}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Batches Schedules Section */}
      <div id="batches" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="section-badge">Upcoming Batches</span>
          <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
            Select Batch Schedule
          </h2>
          <p className="text-gray-600 font-sans font-light">
            We offer Morning, Evening, and Weekend schedules to suit working professionals and university students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VIBE_SCHEDULES.map((sch) => (
            <div key={sch.id} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:border-brand/40 hover:shadow-md transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-brand bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">{sch.tag}</span>
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <div>
                <p className="font-display text-xl font-bold text-gray-950">{sch.date}</p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">{sch.day}</p>
              </div>
              <div className="space-y-1.5">
                {sch.times.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-605 font-sans">
                    <span className="h-1.5 w-1.5 bg-brand rounded-full shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setConsultSector("Education");
                  setConsultMessage(`I would like to enroll in the Vibe Coding with AI batch starting ${sch.date} (${sch.times.join(", ")}).`);
                  setConsultModalOpen(true);
                }}
                className="w-full mt-2 border border-gray-200 hover:border-brand hover:bg-brand text-gray-600 hover:text-white text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer bg-transparent"
              >
                Select This Batch →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Enrollment booking callout */}
      <div className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
            Ready to Accelerate Your Career?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto font-sans font-light">
            Bootcamp cohorts are limited to 15 students per batch to ensure deep focused code review and dedicated workspace support. Register your seat early.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setConsultSector("Education");
                setConsultMessage("Enrolling in Vibe Coding course.");
                setConsultModalOpen(true);
              }}
              className="bg-brand hover:bg-brand-light text-white font-semibold px-8 py-3.5 rounded-full transition-all border-none cursor-pointer hover:scale-105 shadow-md shadow-brand/10"
            >
              Book Intake Call
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-white hover:bg-gray-100 border border-gray-250 text-gray-800 font-medium px-8 py-3.5 rounded-full transition-all text-center tracking-wide cursor-pointer text-sm"
            >
              Back to Main Site
            </button>
          </div>
        </div>
      </div>

      {/* Dedicated Course Page Footer */}
      <footer className="bg-white py-12 border-t border-gray-200 text-center text-xs font-mono text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© 2026 SAFAL AI and Innovation Centre. Level 3, Star Complex, Putalisadak, Kathmandu.</p>
          <p className="mt-2 text-gray-400">Curriculum and modules are registered and CDC-aligned under Nepal laws.</p>
        </div>
      </footer>
    </div>
  );
};
