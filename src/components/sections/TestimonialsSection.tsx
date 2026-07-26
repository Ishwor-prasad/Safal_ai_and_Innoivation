import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "../../data";

export const TestimonialsSection: React.FC = () => {
  const [activeTestimonialCategory, setActiveTestimonialCategory] = useState<"Teacher" | "Professional" | "Organization">("Teacher");
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const activeTestimonials = TESTIMONIALS.filter((t) => t.category === activeTestimonialCategory);
  const totalTestimonials = activeTestimonials.length;
  const idx = Math.min(activeTestimonialIdx, totalTestimonials - 1);
  const testimonial = activeTestimonials[idx] || activeTestimonials[0];

  return (
    <section id="testimonials" className="py-24 bg-[#070b16] dark-section border-y border-dark-slate relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-semibold text-emerald-400 font-mono tracking-widest uppercase block">
            Global Feedback
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Our Participants Say
          </h2>
          <p className="text-slate-300 font-normal">
            Read how teachers, professionals, software engineers, and community executives leverage our tools to restructure efficiency.
          </p>
        </div>

        {/* Testimonial Tabs */}
        <div className="flex justify-center gap-3 mb-12" id="testimonial-tabs">
          {(["Teacher", "Professional", "Organization"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTestimonialCategory(cat);
                setActiveTestimonialIdx(0);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-medium tracking-wider transition-all cursor-pointer border ${
                activeTestimonialCategory === cat
                  ? "bg-brand text-white border-brand shadow-lg shadow-emerald-600/20 font-semibold"
                  : "bg-slate-800/80 text-slate-200 hover:text-white border-slate-700 hover:border-emerald-500/50"
              }`}
            >
              {cat} Testimonials
            </button>
          ))}
        </div>

        {/* Active reviews sliding block */}
        {testimonial && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div
              id={`testimonial-card-${testimonial.id}`}
              className="bg-white/[0.03] border border-white/15 rounded-3xl p-8 sm:p-12 relative shadow-2xl backdrop-blur-md overflow-hidden flex flex-col justify-between min-h-[280px]"
            >
              <div className="absolute top-6 right-8 text-brand/10 pointer-events-none text-9xl font-serif select-none">
                “
              </div>
              <div className="space-y-4 relative z-10">
                <div className="text-brand text-4xl font-serif">“</div>
                <p className="text-slate-100 text-base sm:text-lg leading-relaxed italic font-normal">
                  {testimonial.quote}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10 mt-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`h-11 w-11 rounded-full ${testimonial.avatarBg || "bg-brand"} flex items-center justify-center font-bold text-white text-xs border border-white/20 shrink-0 shadow-md`}>
                    {testimonial.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white tracking-tight">{testimonial.author}</h4>
                    <p className="text-xs text-slate-300 font-light">{testimonial.role}</p>
                    <p className="text-[10px] text-emerald-400 font-mono font-medium">{testimonial.institution}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTestimonialIdx((prev) => (prev - 1 + totalTestimonials) % totalTestimonials)}
                    className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                    title="Previous review"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180 text-white" />
                  </button>
                  <span className="text-[10px] font-mono text-gray-500">
                    {idx + 1} / {totalTestimonials}
                  </span>
                  <button
                    onClick={() => setActiveTestimonialIdx((prev) => (prev + 1) % totalTestimonials)}
                    className="h-9 w-9 rounded-full bg-brand/10 border border-brand/20 hover:bg-brand text-white flex items-center justify-center transition-all cursor-pointer"
                    title="Next review"
                  >
                    <ChevronRight className="h-4 w-4 text-white" />
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
