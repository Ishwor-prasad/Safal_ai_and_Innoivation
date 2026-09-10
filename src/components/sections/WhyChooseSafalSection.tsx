import React from "react";
import { Landmark, Brain, Target, Rocket } from "lucide-react";
import { WHY_CHOOSE_SAFAL } from "../../data";

export const WhyChooseSafalSection: React.FC = () => {
  const iconsList = [Landmark, Brain, Target, Rocket];

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="eyebrow">Why SAFAL AI</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight mt-4">
            Built for Nepal, held to global standards
          </h2>
          <p className="text-gray-600 leading-relaxed mt-3">
            Every product, training, and engagement is grounded in local realities — and engineered with the rigor your organization deserves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WHY_CHOOSE_SAFAL.map((reason, idx) => {
            const IconComp = iconsList[idx] || Rocket;
            return (
              <div key={reason.id} className="card-white p-6 lg:p-7">
                <div className="h-11 w-11 rounded-lg bg-brand-muted border border-brand-border text-brand flex items-center justify-center mb-5 shrink-0">
                  <IconComp className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2 tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};