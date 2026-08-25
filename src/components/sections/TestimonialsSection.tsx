import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "../../data";

export const TestimonialsSection: React.FC = () => {
  const [activeTestimonialCategory, setActiveTestimonialCategory] = useState<"Teacher" | "Professional" | "Organization">("Teacher");
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const activeTestimonials = TESTIMONIALS.filter((t) => t.category === activeTestimonialCategory);
  const totalTestimonials = activeTestimonials.length;
  const idx = Math.min(activeTestimonialIdx, totalTestimonials - 1);
  const testimonial = activeTestimonials[idx] || activeTestimonials[0];

  return (
    <section id="testimonials" className="py-20 sm:py-24 dark-section scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-400 block">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            What participants say
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Teachers, professionals, and organizations we have trained and worked alongside.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 border-b border-white/10 max-w-xl mx-auto">
          {(["Teacher", "Professional", "Organization"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTestimonialCategory(cat);
                setActiveTestimonialIdx(0);
              }}
              className={`pb-3 pt-1 text-sm transition-colors cursor-pointer bg-transparent border-0 border-b-2 -mb-px ${
                activeTestimonialCategory === cat
                  ? "text-white font-semibold border-brand"
                  : "text-slate-400 hover:text-slate-200 font-medium border-transparent"
              }`}
            >
              {cat}s
            </button>
          ))}
        </div>

        {testimonial && (
          <div className="max-w-3xl mx-auto">
            <div
              id={`testimonial-card-${testimonial.id}`}
              className="bg-white/[0.04] border border-white/10 rounded-xl p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[260px]"
            >
              <p className="text-slate-100 text-base sm:text-lg leading-relaxed">
                “{testimonial.quote}”
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-7 mt-7 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className={`h-11 w-11 rounded-full ${testimonial.avatarBg || "bg-slate-600"} flex items-center justify-center font-semibold text-white text-xs shrink-0`}>
                    {testimonial.author.split(" ").filter(w => !w.includes(".")).map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{testimonial.author}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{testimonial.role}</p>
                    <p className="text-xs text-emerald-400 mt-0.5">{testimonial.institution}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <button
                    onClick={() => setActiveTestimonialIdx((prev) => (prev - 1 + totalTestimonials) % totalTestimonials)}
                    className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-slate-500 tabular-nums">
                    {idx + 1} / {totalTestimonials}
                  </span>
                  <button
                    onClick={() => setActiveTestimonialIdx((prev) => (prev + 1) % totalTestimonials)}
                    className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
