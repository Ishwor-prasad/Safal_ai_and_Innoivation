import React from "react";
const safalLogo = "/logo.png";

interface FooterProps {
  setConsultModalOpen: (open: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ setConsultModalOpen }) => {
  return (
    <footer className="bg-dark-primary dark-section text-slate-300 py-16 border-t border-white/10 relative z-20" id="full-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Column 1 Logo */}
          <div className="md:col-span-4 space-y-4">
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="h-9 w-9 rounded-lg overflow-hidden flex items-center justify-center bg-white border border-white/10 shadow-sm shrink-0">
                <img src={safalLogo} alt="Safal AI Logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-tight text-white block">
                  SAFAL <span className="text-emerald-400">AI</span>
                </span>
                <span className="text-[9px] text-emerald-400 font-mono tracking-wider block uppercase font-semibold">
                  and Innovation Centre
                </span>
              </div>
            </a>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Empowering Nepal Through Artificial Intelligence. Deploying curriculum-aligned educational systems, robust customized business workflows, and inclusive public governance templates nationwide.
            </p>
            <div className="text-[11px] text-slate-400 font-mono">
              <span>EST: 2026</span>
            </div>
          </div>

          {/* Column 2 Services */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-bold text-white tracking-widest uppercase">
              Solutions Scope
            </h4>
            <ul className="space-y-2 text-xs font-light text-slate-300">
              <li><a href="#solutions" className="hover:text-emerald-400 text-slate-300 transition-colors block">AI Instruction &amp; Training</a></li>
              <li><a href="#solutions" className="hover:text-emerald-400 text-slate-300 transition-colors block">Workflow Automations</a></li>
              <li><a href="#solutions" className="hover:text-emerald-400 text-slate-300 transition-colors block">Product Engineering</a></li>
              <li><a href="#solutions" className="hover:text-emerald-400 text-slate-300 transition-colors block">Feasibility Consulting</a></li>
              <li><a href="#solutions" className="hover:text-emerald-400 text-slate-300 transition-colors block">Targeted Research</a></li>
            </ul>
          </div>

          {/* Column 3 Products */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-bold text-white tracking-widest uppercase">
              Our Products
            </h4>
            <ul className="space-y-2 text-xs font-light text-slate-300">
              <li><a href="#products" className="hover:text-emerald-400 text-slate-300 transition-colors block">SAFAL Teacher AI <span className="text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1 rounded ml-1 font-mono uppercase font-semibold">Beta</span></a></li>
              <li><span className="text-slate-400 block">SAFAL Business AI</span></li>
              <li><span className="text-slate-400 block">SAFAL Municipal AI</span></li>
              <li><a href="#sandbox" className="hover:text-emerald-400 text-slate-300 transition-colors block">CDC-Aligned Sandbox</a></li>
            </ul>
          </div>

          {/* Column 4 Training */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-bold text-white tracking-widest uppercase">
              Training Stream
            </h4>
            <ul className="space-y-2 text-xs font-light text-slate-300">
              <li><a href="#training" className="hover:text-emerald-400 text-slate-300 transition-colors block">AI For Educators</a></li>
              <li><a href="#training" className="hover:text-emerald-400 text-slate-300 transition-colors block">AI For Students</a></li>
              <li><a href="#training" className="hover:text-emerald-400 text-slate-300 transition-colors block">AI For Professionals</a></li>
              <li><a href="#training" className="hover:text-emerald-400 text-slate-300 transition-colors block">AI For Public Teams</a></li>
            </ul>
          </div>

          {/* Column 5 Quick links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-bold text-white tracking-widest uppercase">
              Company Hub
            </h4>
            <ul className="space-y-2 text-xs font-light text-slate-300">
              <li><a href="#about" className="hover:text-emerald-400 text-slate-300 transition-colors block">About Our Mission</a></li>
              <li><a href="#research" className="hover:text-emerald-400 text-slate-300 transition-colors block">Innovation Lab</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 text-slate-300 transition-colors block">Contact Lab Desk</a></li>
              <li><button onClick={() => setConsultModalOpen(true)} className="hover:text-emerald-400 text-slate-300 transition-colors block text-left bg-transparent border-none p-0 cursor-pointer">Register Booking</button></li>
            </ul>
          </div>

        </div>

        {/* Under footer lines */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <div>
            <span>© 2026 SAFAL AI and Innovation Centre. All Rights Reserved.</span>
          </div>
          <div className="flex gap-4">
            <span className="text-slate-300 italic font-sans text-xs flex items-center justify-center gap-1">Empowering Nepal Through Artificial Intelligence.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
