import React from "react";
import { Users, Presentation, Building, GraduationCap } from "lucide-react";

const STATS = [
  { icon: Users, value: 1000, label: "Learners trained", desc: "Teachers, students & professionals across Nepal" },
  { icon: Presentation, value: 8, label: "Training tracks", desc: "From teachers to researchers, managers & public teams" },
  { icon: Building, value: 150, label: "Staff certified", desc: "IME Group corporate rollout — 150+ employees" },
  { icon: GraduationCap, value: 2, label: "Live products", desc: "SAFAL Teacher AI in beta + two more in development" }
];

const MARQUEE = [
  "AI Training",
  "Automation",
  "Research",
  "Teacher AI",
  "Product Engineering",
  "AI for Managers",
  "AI for Researchers",
  "E-Governance"
];

export const StatsSection: React.FC = () => {
  return (
    <>
      {/* Marquee band */}
      <div className="dark-section marquee border-y border-white/5 py-4" aria-hidden="true">
        <div className="marquee-track text-xs font-mono uppercase tracking-[0.25em] text-white/45">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="flex items-center gap-3.5 shrink-0">
              <span>{item}</span>
              <span className="text-brand-light">✳</span>
            </span>
          ))}
        </div>
      </div>

      <section id="statistics" className="py-16 sm:py-20 dark-section scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="eyebrow eyebrow-center justify-center text-brand-light">Impact</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Numbers that tell the story
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map(({ icon: Icon, value, label, desc }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 text-center space-y-3 hover:border-brand-light/40 hover:bg-white/[0.06] transition-colors">
                <div className="h-10 w-10 rounded-full border border-brand-light/30 bg-brand-light/10 text-brand-light flex items-center justify-center mx-auto">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight">
                  {value.toLocaleString()}<span className="text-brand-light">+</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-slate-300 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};