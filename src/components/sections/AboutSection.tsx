import React from "react";
import { Target, Eye, CheckCircle2 } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 dark-section scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12 xl:gap-16 items-center">

          <div className="xl:col-span-7 space-y-7">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-amber-400 block">
              About Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Built in Nepal, for Nepal
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                SAFAL AI and Innovation Centre is a Kathmandu-based AI company helping schools, businesses, and local governments adopt artificial intelligence in practical, affordable ways.
              </p>
              <p>
                We are not a generic training institute or an offshore consultancy. Everything we build starts from Nepali realities — CDC curricula, bilingual workflows, existing paper processes — and we stay involved long after delivery to make sure the technology is actually used.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

              <div className="p-5 rounded-xl bg-white/[0.04] border border-white/10 space-y-3 transition-colors hover:border-amber-400/30 hover:bg-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <Target className="h-4.5 w-4.5 text-amber-400" />
                  <h3 className="text-sm font-semibold text-white">Our Mission</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Make practical AI accessible to every Nepali institution — regardless of size, budget, or location.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.04] border border-white/10 space-y-3 transition-colors hover:border-amber-400/30 hover:bg-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <Eye className="h-4.5 w-4.5 text-amber-400" />
                  <h3 className="text-sm font-semibold text-white">Our Vision</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To be Nepal's most trusted partner for AI education and applied technology solutions.
                </p>
              </div>

            </div>

            <ul className="space-y-2.5 pt-2 text-sm text-slate-300">
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Localized first — products tuned to Nepali language and administrative norms</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Inclusive by design — built to run on standard networks and modest hardware</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Your data stays yours — strict safeguards around institutional information</span>
              </li>
            </ul>
          </div>

          {/* Photo */}
          <div className="xl:col-span-5 w-full">
            <div className="photo-frame aspect-[4/5] max-w-md mx-auto xl:max-w-none rounded-xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
              <img
                src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=1000&q=80&auto=format&fit=crop"
                alt="Kathmandu, Nepal — heritage temples and architecture in the Kathmandu Valley"
                loading="lazy"
              />
              <div className="photo-caption">
                <span className="text-xs text-white/90 font-medium">Kathmandu, Nepal</span>
                <span className="block text-[11px] text-white/60">Where our team lives and works</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
