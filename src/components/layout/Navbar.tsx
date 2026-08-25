import React from "react";
import { Menu, X, Calendar } from "lucide-react";
const safalLogo = "/logo.png";

interface NavbarProps {
  scrolled: boolean;
  activeSection: string;
  path: string;
  language: "en" | "ne";
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setLanguage: (lang: "en" | "ne") => void;
  navigate: (path: string) => void;
  handleNavClick: (sectionId: string) => void;
  setConsultModalOpen: (open: boolean) => void;
}

const NAV_LINKS: Array<{ label: string; sectionId: string }> = [
  { label: "Home", sectionId: "hero" },
  { label: "Products", sectionId: "products" },
  { label: "Training", sectionId: "training" },
  { label: "Research", sectionId: "research" },
  { label: "Team", sectionId: "team" },
  { label: "About", sectionId: "about" },
  { label: "Contact", sectionId: "contact" }
];

export const Navbar: React.FC<NavbarProps> = ({
  scrolled,
  activeSection,
  path,
  language,
  mobileMenuOpen,
  setMobileMenuOpen,
  setLanguage,
  navigate,
  handleNavClick,
  setConsultModalOpen
}) => {
  const linkClass = (active: boolean) =>
    `text-sm transition-colors border-b-2 pb-0.5 pt-1 ${
      active
        ? "text-gray-900 font-semibold border-brand"
        : "text-gray-600 hover:text-gray-900 border-transparent"
    }`;

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg py-3 shadow-[0_1px_0_0_rgba(15,23,42,0.08)]"
          : "bg-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="flex items-center gap-2.5 group shrink-0" id="logo-anchor">
          <div className="h-10 w-10 rounded-lg overflow-hidden flex items-center justify-center bg-white border border-gray-200 shrink-0">
            <img src={safalLogo} alt="Safal AI Logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-gray-900 block leading-none">
              SAFAL AI
            </span>
            <span className="text-[10px] text-gray-500 tracking-wide block mt-0.5">
              and Innovation Centre
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-6" id="desktop-nav">
          {NAV_LINKS.slice(0, 2).map((l) => (
            <a key={l.sectionId} href={`#${l.sectionId}`} onClick={(e) => { e.preventDefault(); handleNavClick(l.sectionId); }} className={linkClass(activeSection === l.sectionId && path === "/")}>
              {l.label}
            </a>
          ))}
          <a href="/courses/vibe-coding" onClick={(e) => { e.preventDefault(); navigate("/courses/vibe-coding"); }} className={linkClass(path === "/courses/vibe-coding")}>
            Vibe Coding
          </a>
          {NAV_LINKS.slice(2).map((l) => (
            <a key={l.sectionId} href={`#${l.sectionId}`} onClick={(e) => { e.preventDefault(); handleNavClick(l.sectionId); }} className={linkClass(activeSection === l.sectionId && path === "/")}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            onClick={() => setLanguage(language === "en" ? "ne" : "en")}
            className="px-2.5 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 hover:border-brand hover:text-brand rounded-md transition-all shrink-0 cursor-pointer bg-white"
          >
            {language === "en" ? "नेपाली" : "English"}
          </button>
          <button
            id="nav-consult-btn"
            onClick={() => setConsultModalOpen(true)}
            className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shrink-0 border-none"
          >
            <span>Book Consultation</span>
            <Calendar className="h-4 w-4" />
          </button>
        </div>

        <button
          id="mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-gray-700 hover:text-brand focus:outline-none p-1 flex items-center gap-3"
          aria-label="Toggle Menu"
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLanguage(language === "en" ? "ne" : "en"); }}
            className="px-2 py-1 text-xs font-medium text-gray-600 border border-gray-200 hover:border-brand hover:text-brand rounded-md transition-all cursor-pointer"
          >
            {language === "en" ? "नेपाली" : "EN"}
          </button>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-dropdown"
          className="lg:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full p-6 sm:p-8 space-y-1 shadow-xl flex flex-col z-50"
        >
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="block text-gray-700 hover:text-brand text-base py-2.5">Home</a>
          <a href="#solutions" onClick={(e) => { e.preventDefault(); handleNavClick("solutions"); }} className="block text-gray-700 hover:text-brand text-base py-2.5">Solutions</a>
          <a href="#products" onClick={(e) => { e.preventDefault(); handleNavClick("products"); }} className="block text-gray-700 hover:text-brand text-base py-2.5">Products</a>
          <a href="#case-studies" onClick={(e) => { e.preventDefault(); handleNavClick("case-studies"); }} className="block text-gray-700 hover:text-brand text-base py-2.5">Case Studies</a>
          <a href="#training" onClick={(e) => { e.preventDefault(); handleNavClick("training"); }} className="block text-gray-700 hover:text-brand text-base py-2.5">Training</a>
          <a href="/courses/vibe-coding" onClick={(e) => { e.preventDefault(); navigate("/courses/vibe-coding"); }} className="block text-brand font-semibold text-base py-2.5">Vibe Coding with AI</a>
          <a href="#research" onClick={(e) => { e.preventDefault(); handleNavClick("research"); }} className="block text-gray-700 hover:text-brand text-base py-2.5">Research</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick("about"); }} className="block text-gray-700 hover:text-brand text-base py-2.5">About Us</a>
          <a href="#team" onClick={(e) => { e.preventDefault(); handleNavClick("team"); }} className="block text-gray-700 hover:text-brand text-base py-2.5">Team</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick("contact"); }} className="block text-gray-700 hover:text-brand text-base py-2.5">Contact</a>
          <button
            id="mobile-consult-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              setConsultModalOpen(true);
            }}
            className="mt-4 w-full bg-brand text-white py-3 rounded-lg text-base font-semibold transition-colors hover:bg-brand-dark border-none cursor-pointer"
          >
            Book Consultation
          </button>
        </div>
      )}
    </header>
  );
};
