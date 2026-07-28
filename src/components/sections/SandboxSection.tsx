import React from "react";
import Markdown from "react-markdown";
import { Terminal, Loader2 } from "lucide-react";

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
    <div id="vibe-coding" className="scroll-mt-20 pt-8">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 text-[9px] font-mono font-semibold uppercase tracking-widest bg-emerald-50 border border-emerald-200 text-brand px-3 py-1.5 rounded-full mb-1 shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-brand inline-block animate-pulse" />
          <span>Live Interactive Sandbox</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
          Vibe Coding Simulator: SAFAL Teacher AI
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm font-normal">
          Select parameters to watch the AI build a complete localized lesson plan structure aligned with Nepal's CDC guidelines.
        </p>
      </div>

      <div className="flex flex-col xl:grid xl:grid-cols-12 gap-8 items-stretch">

        {/* Parameter controls panel */}
        <div className="xl:col-span-4 bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between shadow-sm">
          <div className="space-y-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-700 block border-b border-gray-100 pb-3">
              Sandbox Parameters
            </span>

            {/* Grade selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 block font-mono">Academic Class Level:</label>
              <div className="grid grid-cols-2 gap-2">
                {["Grade 5", "Grade 8", "Grade 10", "Grade 12"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setDemoGrade(g)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                      demoGrade === g
                        ? "bg-green-50 border-brand text-brand font-semibold"
                        : "bg-white border-gray-250 text-gray-650 hover:bg-gray-50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 block font-mono">Curricular Subject:</label>
              <div className="grid grid-cols-2 gap-2">
                {["Science", "Mathematics", "Nepali", "Computer Science"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setDemoSubject(s)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                      demoSubject === s
                        ? "bg-green-50 border-brand text-brand font-semibold"
                        : "bg-white border-gray-250 text-gray-650 hover:bg-gray-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Unit Topic selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-gray-500 block font-mono">Focus Unit / Concept:</label>
              <input
                type="text"
                value={demoTopic}
                onChange={(e) => setDemoTopic(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand"
                placeholder="e.g. Force and Motion, Fractions..."
              />
            </div>
          </div>

          <div className="pt-8 border-t border-white/5">
            <button
              onClick={handleTriggerSandbox}
              disabled={sandboxLoading || !demoTopic.trim()}
              className="w-full bg-brand hover:bg-brand-light disabled:bg-gray-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border-none ring-pulse"
            >
              {sandboxLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Compiling Parameters...</span>
                </>
              ) : (
                <>
                  <Terminal className="h-4 w-4" />
                  <span>Run Vibe Compiler</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-gray-500 text-center mt-2.5 font-mono">
              Direct local LLM server context loop.
            </p>
          </div>
        </div>

        {/* Sandbox lesson compiler output panel */}
        <div className="xl:col-span-8 flex flex-col">
          <div className="bg-[#0b121f] border border-white/10 rounded-3xl flex-1 flex flex-col overflow-hidden shadow-2xl relative">

            {/* IDE Header */}
            <div className="bg-[#080d17] px-4 py-3.5 border-b border-white/10 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] font-mono text-slate-400 ml-2">sandbox-editor.tsx</span>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
                  SYSTEM_ONLINE
                </span>
                <span>UTF-8</span>
              </div>
            </div>

            {/* Editor view screen */}
            <div className="flex-1 p-6 font-mono text-xs overflow-y-auto leading-relaxed relative min-h-[300px]">
              {sandboxLoading ? (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-center z-10 select-none">
                  <Loader2 className="h-10 w-10 text-emerald-400 animate-spin" />
                  <div className="space-y-1">
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider block">Generating Context Modules</span>
                    <span className="text-[10px] text-slate-300 block">Mapping topics with curriculum guide specifications...</span>
                  </div>
                </div>
              ) : null}

              {compiledResult ? (
                <div className="space-y-4 text-slate-200 markdown-body">
                  <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl mb-4">
                    <span className="text-[10px] font-semibold text-emerald-400 tracking-wider uppercase block mb-1">Generated Output Metadata</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] font-mono text-slate-300">
                      <div>Grade: <span className="text-white font-semibold">{demoGrade}</span></div>
                      <div>Subject: <span className="text-white font-semibold">{demoSubject}</span></div>
                      <div>Topic: <span className="text-white font-semibold">{demoTopic}</span></div>
                      <div>Response Time: <span className="text-emerald-400 font-semibold">1.42s</span></div>
                    </div>
                  </div>
                  <Markdown>{compiledResult}</Markdown>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-3 select-none">
                  <Terminal className="h-12 w-12 text-emerald-500/30" />
                  <div className="max-w-md space-y-1">
                    <p className="text-slate-200 font-semibold text-xs">Vibe Compiler Standby</p>
                    <p className="text-[10px] text-slate-400 leading-normal font-light">
                      Define your Lesson grade, subject, and focus concept on the left side then click "Run Vibe Compiler" to generate your custom curricular outline.
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
