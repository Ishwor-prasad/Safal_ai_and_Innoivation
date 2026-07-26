import React, { useState } from "react";
import { Check, Terminal } from "lucide-react";
import { CASE_STUDIES } from "../../data";

export const CaseStudiesSection: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  return (
    <section id="case-studies" className="py-24 bg-white scroll-mt-20 border-b border-gray-200 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold text-brand tracking-widest uppercase block font-mono">
            Proven Transformations
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            AI Impact Case Studies
          </h2>
          <p className="text-gray-600 font-normal font-sans">
            A comprehensive review of how our specialized curriculum assistants, enterprise workflows, and e-governance systems create measurable social and operational return.
          </p>
        </div>

        {/* Client select tabs slider */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CASE_STUDIES.map((cs, idx) => (
            <button
              key={cs.id}
              onClick={() => setActiveCaseIndex(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                activeCaseIndex === idx
                  ? "bg-brand text-white border-brand shadow-md"
                  : "bg-gray-50 text-gray-600 hover:text-brand border-gray-200 hover:bg-gray-100"
              }`}
            >
              {cs.clientName}
            </button>
          ))}
        </div>

        {/* Carousel Slide Wrapper */}
        {(() => {
          const cs = CASE_STUDIES[activeCaseIndex];
          return (
            <div
              key={cs.id}
              className="flex flex-col xl:grid xl:grid-cols-12 gap-8 items-stretch transition-all duration-500 animate-none"
            >
              {/* Left Side Content grid */}
              <div className="xl:col-span-6 bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold text-brand uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded shadow-xs">
                      {cs.industry}
                    </span>
                    <span className="text-[10px] font-mono text-slate-600 font-medium">
                      Deployment Success Case
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {cs.clientName}
                  </h3>

                  <div className="space-y-4 pt-4 border-t border-gray-100 text-sm leading-relaxed">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider font-semibold">The Challenge</span>
                      <p className="text-gray-600 font-light font-normal">
                        {cs.challenge}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-brand uppercase tracking-wider font-semibold">The AI Solution</span>
                      <p className="text-gray-650 font-light font-normal">
                        {cs.solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-5 border-t border-gray-100">
                  <h4 className="text-[10px] font-mono text-brand uppercase tracking-wider font-semibold">Measurable Results</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cs.results.map((resMsg, ridx) => (
                      <li key={ridx} className="flex gap-2 items-start text-xs font-normal text-gray-650 leading-snug">
                        <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <span>{resMsg}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side Visual Showcase + Quote */}
              <div className="xl:col-span-6 flex flex-col justify-between relative overflow-hidden rounded-3xl border border-gray-200 min-h-[420px] bg-gray-50 shadow-sm">

                <div className="flex-1 relative overflow-hidden min-h-[220px]">
                  {cs.image ? (
                    <img
                      src={cs.image}
                      alt={cs.clientName}
                      className="w-full h-full absolute inset-0 object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center">
                      <Terminal className="h-16 w-16 text-brand/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
                </div>

                <div className={`p-6 sm:p-8 bg-gradient-to-br ${cs.gradient} border-t border-gray-200 relative overflow-hidden shrink-0`}>
                  <div className="absolute top-4 right-4 text-white/5 pointer-events-none text-7xl font-serif select-none">
                    "
                  </div>
                  <figure className="space-y-3.5 relative z-10">
                    <blockquote className="text-white text-xs italic font-medium leading-relaxed">
                      "{cs.quote}"
                    </blockquote>
                    <figcaption className="text-[10px] font-mono text-white flex flex-col gap-0.5">
                      <span className="font-semibold block">{cs.author}</span>
                      <span className="text-white/60 block">{cs.role}</span>
                    </figcaption>
                  </figure>
                </div>
              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
};
