import React from "react";
import { Check, Quote, Calendar, ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "../../data";

export const CaseStudiesSection: React.FC = () => {
  const cs = CASE_STUDIES[0];

  return (
    <section id="case-studies" className="py-20 sm:py-24 bg-surface-soft scroll-mt-16 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="eyebrow eyebrow-center justify-center">Client Story</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Work that made a measurable difference
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A real deployment with IME Group — and what changed for them.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">

          {/* Story */}
          <div className="xl:col-span-6 card-white p-6 sm:p-8 lg:p-10 flex flex-col">
            <span className="self-start text-[11px] font-semibold uppercase tracking-wider text-gray-500 bg-surface-muted border border-gray-200 px-2.5 py-1 rounded-full">
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

            <div className="mt-auto pt-6 border-t border-gray-100 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors cursor-pointer border-none"
              >
                <Calendar className="h-4 w-4" />
                Discuss a similar project
              </a>
              <a
                href="#training"
                onClick={(e) => { e.preventDefault(); document.getElementById('training')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors cursor-pointer bg-transparent border-none px-2"
              >
                See our training programs
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Photo gallery + quote */}
          <div className="xl:col-span-6 flex flex-col">
            {cs.gallery && cs.gallery.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div className="photo-frame rounded-[1.25rem] col-span-2 aspect-[16/9]">
                  <img src={cs.gallery[0]} alt={`${cs.clientName} group training session`} loading="lazy" />
                </div>
                <div className="photo-frame rounded-[1.25rem] aspect-[4/3]">
                  <img src={cs.gallery[1]} alt={`${cs.clientName} hands-on session`} loading="lazy" />
                </div>
                <div className="photo-frame rounded-[1.25rem] aspect-[4/3]">
                  <img src={cs.gallery[2]} alt={`${cs.clientName} certification distribution`} loading="lazy" />
                </div>
              </div>
            ) : (
              <div className="photo-frame flex-1 min-h-[260px] rounded-[1.25rem]">
                {cs.image ? <img src={cs.image} alt={`${cs.clientName} project`} loading="lazy" /> : null}
              </div>
            )}

            <figure className="mt-3 rounded-[1.25rem] border border-gray-200 bg-white p-6 lg:p-7 space-y-3">
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

      </div>
    </section>
  );
};