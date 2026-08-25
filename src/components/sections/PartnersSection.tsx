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
    <section id="partners" className="py-14 sm:py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center space-y-2 mb-8">
          <h3 className="font-display text-base font-semibold text-gray-900 tracking-tight">
            Trusted by schools, colleges, municipalities &amp; enterprises across Nepal
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8" id="partner-tabs">
          {(["All", "School", "College", "Municipality", "Enterprise"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActivePartnerFilter(cat)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer border ${
                activePartnerFilter === cat
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 hover:text-gray-800 border-gray-200"
              }`}
            >
              {cat === "All" ? "All" : `${cat}s`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3" id="partner-logos-grid">
          {filteredPartners.map((p: PartnerOrg) => (
            <div
              key={p.id}
              id={`partner-card-${p.id}`}
              className="border border-gray-200 bg-surface-soft rounded-lg px-4 py-5 flex items-center justify-center text-center transition-colors hover:border-gray-300"
              title={p.name}
            >
              <div>
                <span className="text-sm font-display font-semibold text-gray-700 tracking-wide block">
                  {p.logoText}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-1 block">
                  {p.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
