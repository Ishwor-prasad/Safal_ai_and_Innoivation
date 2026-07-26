import React from "react";
import { TreePine, HeartHandshake, CheckCircle2 } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 dark-section border-b border-white/10 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12 xl:gap-8 items-center">

          <div className="xl:col-span-7 space-y-6">
            <span className="text-xs font-semibold text-emerald-400 font-mono tracking-widest uppercase block">
              The SAFAL Story
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              About SAFAL AI and Innovation Centre
            </h2>

            <div className="space-y-4 text-slate-200 text-sm font-normal leading-relaxed">
              <p>
                SAFAL AI and Innovation Centre is a Nepal-based artificial intelligence company dedicated to empowering individuals and organizations through AI education, innovation and technology solutions. We believe in building solutions that scale across geography and resource diversity.
              </p>
              <p>
                Our work actively bridges academic curriculum alignments, sector-specific digital automations, and targeted policy assistance. Rather than acting as a static school or standard training institute, our framework is geared to serve as a deep technology and consulting partner to local Nepalese entities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8" id="about-mission-vision">

              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/15 hover:border-emerald-500/50 transition-all duration-300 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <TreePine className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="font-display text-base font-bold text-white tracking-tight">Our Mission</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  "Empowering Nepal Through Artificial Intelligence" — making advanced tools accessible, localized, practical, and highly impactful.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/15 hover:border-emerald-500/50 transition-all duration-300 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <HeartHandshake className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="font-display text-base font-bold text-white tracking-tight">Our Vision</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  To become Nepal's most trusted, ethical, and advanced artificial intelligence innovation and technology solutions partner.
                </p>
              </div>

            </div>
          </div>

          <div className="xl:col-span-5 relative flex justify-center">
            <div className="w-full max-w-[380px] p-8 rounded-3xl bg-white/[0.04] border border-white/20 text-white shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-emerald-500/15 rounded-full filter blur-[40px] pointer-events-none" />

              <h3 className="font-display text-lg font-bold text-white tracking-tight mb-4 border-b border-white/10 pb-3">
                Ethical Alignment Map
              </h3>

              <ul className="space-y-4 text-xs font-normal font-sans">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium block">Localization Priority</strong>
                    <span className="text-slate-300 font-normal">Products are custom-tuned to Nepalese grammatical, curriculum, and administrative norms.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium block">Inclusivity Mindset</strong>
                    <span className="text-slate-300 font-normal">Architectures planned to require minimal computational load, operating over standard networks.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-medium block">Sovereign Data Integrity</strong>
                    <span className="text-slate-300 font-normal">Strict safety rules guarding sensitive institutional and curriculum assets securely.</span>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>SAFAL INNOVATION LAB</span>
                <span>EST. 2026</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
