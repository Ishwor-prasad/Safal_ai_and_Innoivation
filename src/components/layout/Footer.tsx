import React from "react";
const safalLogo = "/logo.png";

interface FooterProps {
  setConsultModalOpen: (open: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ setConsultModalOpen }) => {
  return (
    <footer className="bg-dark-primary text-slate-300 py-16" id="full-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Column 1 Logo */}
          <div className="md:col-span-4 space-y-4">
            <a href="#hero" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg overflow-hidden flex items-center justify-center bg-white shrink-0">
                <img src={safalLogo} alt="Safal AI Logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-tight text-white block leading-none">
                  SAFAL AI
                </span>
                <span className="text-[10px] text-slate-400 tracking-wide block mt-0.5">
                  and Innovation Centre
                </span>
              </div>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering Nepal through artificial intelligence — practical education, business automation, and public-sector solutions built for local context.
            </p>
          </div>

          {/* Column 2 Services */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-white tracking-widest uppercase">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#solutions" className="hover:text-white transition-colors block">AI Instruction &amp; Training</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors block">Workflow Automations</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors block">Product Engineering</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors block">Feasibility Consulting</a></li>
              <li><a href="#research" className="hover:text-white transition-colors block">Targeted Research</a></li>
            </ul>
          </div>

          {/* Column 3 Products */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-white tracking-widest uppercase">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#products" className="hover:text-white transition-colors block">SAFAL Teacher AI</a></li>
              <li><span className="block">SAFAL Business AI</span></li>
              <li><span className="block">SAFAL Municipal AI</span></li>
              <li><a href="#vibe-coding" className="hover:text-white transition-colors block">Lesson Plan Sandbox</a></li>
            </ul>
          </div>

          {/* Column 4 Training */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-white tracking-widest uppercase">
              Training
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#training" className="hover:text-white transition-colors block">AI for Educators</a></li>
              <li><a href="#training" className="hover:text-white transition-colors block">AI for Students</a></li>
              <li><a href="#training" className="hover:text-white transition-colors block">AI for Professionals</a></li>
              <li><a href="#training" className="hover:text-white transition-colors block">AI for Public Teams</a></li>
            </ul>
          </div>

          {/* Column 5 Quick links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-white tracking-widest uppercase">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-white transition-colors block">About Us</a></li>
              <li><a href="#team" className="hover:text-white transition-colors block">Our Team</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors block">Contact</a></li>
              <li><button onClick={() => setConsultModalOpen(true)} className="hover:text-white transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Book Consultation</button></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <span>© 2026 SAFAL AI and Innovation Centre. All rights reserved.</span>
          <span>Putalisadak, Kathmandu, Nepal</span>
        </div>

      </div>
    </footer>
  );
};
