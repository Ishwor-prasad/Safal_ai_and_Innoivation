import React from "react";
import { Users, Presentation, Building, GraduationCap } from "lucide-react";

const STATS = [
  { icon: Users, value: 500, label: "Professionals trained", desc: "Teachers, civil servants & business leaders" },
  { icon: Presentation, value: 50, label: "Workshops conducted", desc: "Hands-on sessions across Nepal" },
  { icon: Building, value: 20, label: "Partner institutions", desc: "Schools, colleges & government bodies" },
  { icon: GraduationCap, value: 1000, label: "Learners impacted", desc: "Students benefiting from AI tools" }
];

export const StatsSection: React.FC = () => {
  return (
    <section id="statistics" className="py-16 sm:py-20 bg-surface-soft border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="eyebrow eyebrow-center justify-center">Impact</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Numbers that tell the story
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STATS.map(({ icon: Icon, value, label, desc }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 text-center space-y-3 hover:border-brand/30 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-brand-muted border border-brand-border text-brand flex items-center justify-center mx-auto">
                <Icon className="h-5 w-5" />
              </div>
              <div className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {value}<span className="text-brand">+</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
