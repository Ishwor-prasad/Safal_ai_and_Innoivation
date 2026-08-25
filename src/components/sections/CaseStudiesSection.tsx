import React, { useState } from "react";
import { Check, Quote } from "lucide-react";
import { CASE_STUDIES } from "../../data";

export const CaseStudiesSection: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  return (
    <section id="case-studies" className="py-20 sm:py-24 bg-surface-soft scroll-mt-16 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="eyebrow eyebrow-center justify-center">Client Stories</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Work that made a measurable difference
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Real deployments with schools, companies, and local government — and what changed for them.
          </p>
        </div>

        {/* Client tabs */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 border-b border-gray-200">
          {CASE_STUDIES.map((cs, idx) => (
            <button
              key={cs.id}
              onClick={() => setActiveCaseIndex(idx)}
              className={`pb-3 pt-1 text-sm transition-colors cursor-pointer bg-transparent border-0 border-b-2 -mb-px ${
                activeCaseIndex === idx
                  ? "text-gray-900 font-semibold border-brand"
                  : "text-gray-500 hover:text-gray-800 font-medium border-transparent"
              }`}
            >
              {cs.clientName.split(" - ")[0].split(",")[0]}
            </button>
          ))}
        </div>

        {(() => {
          const cs = CASE_STUDIES[activeCaseIndex];
          return (
            <div key={cs.id} className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">

              {/* Story */}
              <div className="xl:col-span-7 card-white p-6 sm:p-8 lg:p-10 flex flex-col">
                <span className="self-start text-[11px] font-semibold uppercase tracking-wider text-gray-500 bg-surface-muted border border-gray-200 px-2.5 py-1 rounded-md">
                  {cs.industry}
                </span>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mt-4">
                  {cs.clientName}
                </h3>

                <div className="space-y-5 mt-6 pt-6 border-t border-gray-100 text-sm leading-relaxed">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">The challenge</h4>
                    <p className="text-gray-600">{cs.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-dark mb-1.5">What we did</h4>
                    <p className="text-gray-600">{cs.solution}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Results</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                    {cs.results.map((resMsg, ridx) => (
                      <li key={ridx} className="flex gap-2 items-start text-sm text-gray-700 leading-snug">
                        <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <span>{resMsg}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Photo + quote */}
              <div className="xl:col-span-5 flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white min-h-[380px]">
                <div className="photo-frame flex-1 min-h-[220px] rounded-none">
                  {cs.image ? (
                    <img src={cs.image} alt={`${cs.clientName} project`} loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-dark-primary" />
                  )}
                </div>
                <figure className="p-6 lg:p-7 space-y-3 border-t border-gray-200">
                  <Quote className="h-5 w-5 text-brand" />
                  <blockquote className="text-sm text-gray-700 leading-relaxed">
                    “{cs.quote}”
                  </blockquote>
                  <figcaption className="text-xs pt-1">
                    <span className="font-semibold text-gray-900 block">{cs.author}</span>
                    <span className="text-gray-500">{cs.role}</span>
                  </figcaption>
                </figure>
              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
};
