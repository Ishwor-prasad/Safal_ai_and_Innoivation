import React, { useState } from "react";
import { PARTNERS } from "../../data";
import { PartnerOrg } from "../../types";

export const PartnersSection: React.FC = () => {
  const [activePartnerFilter, setActivePartnerFilter] = useState<"All" | "School" | "College" | "Municipality" | "Enterprise">("All");

  const filteredPartners = PARTNERS.filter((p: PartnerOrg) => {
    if (activePartnerFilter === "All") return true;
    return p.category === activePartnerFilter;
  });

  return (
    <section className="py-16 dark-section border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-xl mx-auto space-y-1 mb-10">
          <h3 className="font-display text-lg font-bold text-white tracking-tight">
            Trusted By
          </h3>
          <p className="text-xs text-slate-300 font-normal uppercase tracking-wider font-mono">
            Schools, Colleges, Enterprises &amp; Municipal Governments
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8" id="partner-tabs">
          {(["All", "School", "College", "Municipality", "Enterprise"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActivePartnerFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                activePartnerFilter === cat
                  ? "bg-brand text-white font-semibold shadow-md shadow-emerald-600/20"
                  : "bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700"
              }`}
            >
              {cat}s
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4" id="partner-logos-grid">
          {filteredPartners.map((p: PartnerOrg) => {
            const typesColors: Record<string, string> = {
              School: "border-white/15 bg-white/5 hover:border-emerald-500/50",
              College: "border-white/15 bg-white/5 hover:border-emerald-400/50",
              Municipality: "border-white/15 bg-white/5 hover:border-emerald-500/50",
              Enterprise: "border-white/15 bg-white/5 hover:border-teal-400/50",
              Partner: "border-white/15 bg-white/5 hover:border-emerald-400/50"
            };
            const colorClass = typesColors[p.category] || "border-white/15 bg-white/5";
            return (
              <div
                key={p.id}
                id={`partner-card-${p.id}`}
                className={`border ${colorClass} rounded-xl p-4 flex flex-col items-center justify-center text-center group cursor-default transition-all duration-300 hover:scale-[1.02]`}
                title={p.name}
              >
                <span className="text-xs font-display font-semibold text-slate-200 group-hover:text-white transition-colors uppercase tracking-wider block">
                  {p.logoText}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 tracking-widest mt-1 block uppercase font-semibold">
                  {p.category}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
