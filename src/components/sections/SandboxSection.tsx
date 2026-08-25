import React from "react";
import Markdown from "react-markdown";
import { FileText, Loader2, Sparkles } from "lucide-react";

interface SandboxSectionProps {
  demoGrade: string;
  setDemoGrade: (g: string) => void;
  demoSubject: string;
  setDemoSubject: (s: string) => void;
  demoTopic: string;
  setDemoTopic: (t: string) => void;
  sandboxLoading: boolean;
  compiledResult: string | null;
  handleTriggerSandbox: (e: React.FormEvent) => void;
}

export const SandboxSection: React.FC<SandboxSectionProps> = ({
  demoGrade,
  setDemoGrade,
  demoSubject,
  setDemoSubject,
  demoTopic,
  setDemoTopic,
  sandboxLoading,
  compiledResult,
  handleTriggerSandbox
}) => {
  return (
    <div id="vibe-coding" className="scroll-mt-20 py-4">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <span className="eyebrow eyebrow-center justify-center">Live Demo</span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Try SAFAL Teacher AI
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Pick a class level, subject, and topic — the assistant drafts a lesson plan aligned with Nepal's CDC curriculum guidelines.
        </p>
      </div>

      <div className="flex flex-col xl:grid xl:grid-cols-12 gap-6 items-stretch">

        {/* Parameter controls */}
        <div className="xl:col-span-4 bg-white border border-gray-200 rounded-xl p-6 lg:p-7 flex flex-col shadow-sm">
          <div className="space-y-6">
            <span className="text-sm font-semibold text-gray-900 block pb-3 border-b border-gray-100">
              Lesson parameters
            </span>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 block">Class level</label>
              <div className="grid grid-cols-2 gap-2">
                {["Grade 5", "Grade 8", "Grade 10", "Grade 12"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setDemoGrade(g)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                      demoGrade === g
                        ? "bg-brand-muted border-brand text-brand-dark font-semibold"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 block">Subject</label>
              <div className="grid grid-cols-2 gap-2">
                {["Science", "Mathematics", "Nepali", "Computer Science"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setDemoSubject(s)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                      demoSubject === s
                        ? "bg-brand-muted border-brand text-brand-dark font-semibold"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 block">Topic or unit</label>
              <input
                type="text"
                value={demoTopic}
                onChange={(e) => setDemoTopic(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand transition-colors"
                placeholder="e.g. Force and Motion, Fractions..."
              />
            </div>
          </div>

          <div className="pt-6 mt-auto">
            <button
              onClick={handleTriggerSandbox}
              disabled={sandboxLoading || !demoTopic.trim()}
              className="w-full bg-brand hover:bg-brand-dark disabled:bg-gray-300 disabled:text-gray-500 text-white font-semibold py-3.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              {sandboxLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Lesson Plan</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-3">
              Free demo · No sign-up required
            </p>
          </div>
        </div>

        {/* Output panel */}
        <div className="xl:col-span-8 flex flex-col">
          <div className="bg-[#211A10] border border-white/10 rounded-xl flex-1 flex flex-col overflow-hidden shadow-lg">

            <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2.5 text-slate-300">
                <FileText className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-medium">Lesson Plan Preview</span>
              </div>
              <span className={`flex items-center gap-1.5 text-xs ${sandboxLoading ? "text-amber-300" : "text-emerald-400"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${sandboxLoading ? "bg-amber-300 animate-pulse" : "bg-emerald-400"}`} />
                {sandboxLoading ? "Working" : "Ready"}
              </span>
            </div>

            <div className="flex-1 p-6 lg:p-8 text-sm overflow-y-auto leading-relaxed relative min-h-[320px] markdown-body">
              {sandboxLoading ? (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 text-center z-10 select-none">
                  <Loader2 className="h-9 w-9 text-emerald-400 animate-spin" />
                  <div className="space-y-1">
                    <span className="text-white text-sm font-semibold block">Drafting your lesson plan</span>
                    <span className="text-slate-300 text-xs block">Matching the topic against CDC curriculum guidelines…</span>
                  </div>
                </div>
              ) : null}

              {compiledResult ? (
                <div className="space-y-4 text-slate-200 max-w-none">
                  <div className="bg-white/[0.04] border border-white/10 p-4 rounded-lg mb-5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-400">
                      <div>Class<br /><span className="text-white font-medium">{demoGrade}</span></div>
                      <div>Subject<br /><span className="text-white font-medium">{demoSubject}</span></div>
                      <div>Topic<br /><span className="text-white font-medium">{demoTopic}</span></div>
                      <div>Curriculum<br /><span className="text-amber-300 font-medium">CDC Nepal</span></div>
                    </div>
                  </div>
                  <Markdown>{compiledResult}</Markdown>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-3 select-none">
                  <FileText className="h-10 w-10 text-slate-600" />
                  <div className="max-w-sm space-y-1.5">
                    <p className="text-slate-200 font-semibold text-sm">Your generated plan will appear here</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Choose a class level and subject on the left, type a topic, then click “Generate Lesson Plan”.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
