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
  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-black/5 py-3 shadow-sm"
          : "bg-white/70 backdrop-blur-lg py-5 border-b border-black/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="flex items-center gap-2 group" id="logo-anchor">
          <div className="h-10 w-10 rounded-lg overflow-hidden flex items-center justify-center bg-white border border-gray-200 shadow-md shadow-brand/10 group-hover:scale-105 transition-transform duration-300 shrink-0">
            <img src={safalLogo} alt="Safal AI Logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-gray-900 block">
              SAFAL <span className="text-brand">AI</span>
            </span>
            <span className="text-[10px] text-gray-600 font-mono tracking-widest block uppercase">
              and Innovation Centre
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="desktop-nav">
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick("hero"); }} className={`font-medium text-xs xl:text-sm px-3 py-1.5 rounded-full transition-all ${activeSection === "hero" && path === "/" ? "bg-emerald-50 text-brand font-semibold border border-emerald-200/60" : "text-gray-600 hover:text-brand hover:bg-gray-50"}`}>Home</a>
          <a href="#products" onClick={(e) => { e.preventDefault(); handleNavClick("products"); }} className={`font-medium text-xs xl:text-sm px-3 py-1.5 rounded-full transition-all ${activeSection === "products" && path === "/" ? "bg-emerald-50 text-brand font-semibold border border-emerald-200/60" : "text-gray-600 hover:text-brand hover:bg-gray-50"}`}>Products</a>
          <a href="#training" onClick={(e) => { e.preventDefault(); handleNavClick("training"); }} className={`font-medium text-xs xl:text-sm px-3 py-1.5 rounded-full transition-all ${activeSection === "training" && path === "/" ? "bg-emerald-50 text-brand font-semibold border border-emerald-200/60" : "text-gray-600 hover:text-brand hover:bg-gray-50"}`}>Training</a>
          <a href="/courses/vibe-coding" onClick={(e) => { e.preventDefault(); navigate("/courses/vibe-coding"); }} className={`font-semibold text-xs xl:text-sm px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${path === "/courses/vibe-coding" ? "bg-emerald-50 text-brand font-bold border border-emerald-200/60" : "text-brand hover:bg-emerald-50/60"}`}>
            <span className="h-2 w-2 rounded-full bg-brand inline-block animate-pulse" />
            Vibe Coding
          </a>
          <a href="#research" onClick={(e) => { e.preventDefault(); handleNavClick("research"); }} className={`font-medium text-xs xl:text-sm px-3 py-1.5 rounded-full transition-all ${activeSection === "research" && path === "/" ? "bg-emerald-50 text-brand font-semibold border border-emerald-200/60" : "text-gray-600 hover:text-brand hover:bg-gray-50"}`}>Research</a>
          <a href="#team" onClick={(e) => { e.preventDefault(); handleNavClick("team"); }} className={`font-medium text-xs xl:text-sm px-3 py-1.5 rounded-full transition-all ${activeSection === "team" && path === "/" ? "bg-emerald-50 text-brand font-semibold border border-emerald-200/60" : "text-gray-600 hover:text-brand hover:bg-gray-50"}`}>Team</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick("about"); }} className={`font-medium text-xs xl:text-sm px-3 py-1.5 rounded-full transition-all ${activeSection === "about" && path === "/" ? "bg-emerald-50 text-brand font-semibold border border-emerald-200/60" : "text-gray-600 hover:text-brand hover:bg-gray-50"}`}>About</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick("contact"); }} className={`font-medium text-xs xl:text-sm px-3 py-1.5 rounded-full transition-all ${activeSection === "contact" && path === "/" ? "bg-emerald-50 text-brand font-semibold border border-emerald-200/60" : "text-gray-600 hover:text-brand hover:bg-gray-50"}`}>Contact</a>
          <button
            onClick={() => setLanguage(language === "en" ? "ne" : "en")}
            className="ml-1 px-3 py-1 text-[10px] xl:text-xs font-semibold border border-brand/30 text-brand hover:bg-brand hover:text-white rounded-full transition-all shrink-0 cursor-pointer shadow-xs"
          >
            {language === "en" ? "नेपाली" : "English"}
          </button>
        </nav>

        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          <a
            id="nav-whatsapp-btn"
            href="https://wa.me/9779869627250?text=Hello%20Safal%20AI%20and%20Innovation%20Centre"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs xl:text-sm py-2 px-3.5 rounded-full transition-all hover:scale-105 hover:ring-2 hover:ring-[#25D366]/40 items-center gap-1.5 shadow-md cursor-pointer border-none"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.947 9.947 0 0 0 4.887 1.282c5.506 0 9.99-4.474 9.991-9.984a9.972 9.972 0 0 0-9.996-9.951zm0 18.294a8.276 8.276 0 0 1-4.225-1.157l-.304-.18-3.136.82.835-3.056-.197-.313a8.293 8.293 0 0 1-1.272-4.423c.001-4.57 3.722-8.29 8.297-8.29a8.28 8.28 0 0 1 8.293 8.296c-.001 4.572-3.725 8.293-8.296 8.293zm4.542-6.208c-.249-.125-1.472-.726-1.7-.81-.228-.083-.393-.125-.558.125-.165.25-.638.809-.783.974-.144.166-.29.184-.539.06a6.793 6.793 0 0 1-1.997-1.232c-.776-.692-1.301-1.547-1.453-1.81-.153-.263-.016-.406.117-.538.12-.12.249-.29.373-.434.125-.144.166-.25.25-.415.083-.167.042-.313-.02-.439-.063-.125-.558-1.347-.765-1.849-.2-.486-.402-.422-.558-.43h-.475c-.165 0-.434.062-.661.312-.228.25-.868.85-.868 2.072 0 1.222.888 2.4 1.012 2.564.125.166 1.748 2.67 4.235 3.74.591.255 1.053.408 1.412.523.593.189 1.134.162 1.561.098.476-.071 1.472-.601 1.68-1.182.207-.581.207-1.08.145-1.182-.062-.102-.228-.166-.477-.291z" />
            </svg>
            <span>WhatsApp</span>
          </a>
          <button
            id="nav-consult-btn"
            onClick={() => setConsultModalOpen(true)}
            className="bg-brand hover:bg-brand/90 text-white font-medium text-xs xl:text-sm py-2 px-4 rounded-full transition-all hover:scale-105 hover:ring-2 hover:ring-brand/40 flex items-center gap-1.5 shadow-md cursor-pointer shrink-0 border-none"
          >
            <span>Book Consultation</span>
            <Calendar className="h-4 w-4" />
          </button>
        </div>

        <button
          id="mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-gray-600 hover:text-brand focus:outline-none p-1 pointer-events-auto"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-dropdown"
          className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-black/5 absolute top-full left-0 w-full p-8 space-y-4 shadow-2xl text-center flex flex-col z-50"
        >
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100">Home</a>
          <a href="#solutions" onClick={(e) => { e.preventDefault(); handleNavClick("solutions"); }} className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100">Solutions</a>
          <a href="#products" onClick={(e) => { e.preventDefault(); handleNavClick("products"); }} className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100">Products</a>
          <a href="#case-studies" onClick={(e) => { e.preventDefault(); handleNavClick("case-studies"); }} className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100">Case Studies</a>
          <a href="#training" onClick={(e) => { e.preventDefault(); handleNavClick("training"); }} className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100">Training</a>
          <a href="/courses/vibe-coding" onClick={(e) => { e.preventDefault(); navigate("/courses/vibe-coding"); }} className="block text-brand font-semibold text-base py-2 border-b border-gray-100 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand inline-block" />
            Vibe Coding with AI
          </a>
          <a href="#research" onClick={(e) => { e.preventDefault(); handleNavClick("research"); }} className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100">Research</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick("about"); }} className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100">About Us</a>
          <a href="#team" onClick={(e) => { e.preventDefault(); handleNavClick("team"); }} className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100">Team</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick("contact"); }} className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100">Contact</a>
          <a
            href="https://wa.me/9779869627250?text=Hello%20Safal%20AI%20and%20Innovation%20Centre"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full bg-[#25D366] text-white py-3 rounded-full text-base font-semibold transition-all hover:bg-[#20ba5a] flex items-center justify-center gap-2 border-none mb-3"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.947 9.947 0 0 0 4.887 1.282c5.506 0 9.99-4.474 9.991-9.984a9.972 9.972 0 0 0-9.996-9.951zm0 18.294a8.276 8.276 0 0 1-4.225-1.157l-.304-.18-3.136.82.835-3.056-.197-.313a8.293 8.293 0 0 1-1.272-4.423c.001-4.57 3.722-8.29 8.297-8.29a8.28 8.28 0 0 1 8.293 8.296c-.001 4.572-3.725 8.293-8.296 8.293zm4.542-6.208c-.249-.125-1.472-.726-1.7-.81-.228-.083-.393-.125-.558.125-.165.25-.638.809-.783.974-.144.166-.29.184-.539.06a6.793 6.793 0 0 1-1.997-1.232c-.776-.692-1.301-1.547-1.453-1.81-.153-.263-.016-.406.117-.538.12-.12.249-.29.373-.434.125-.144.166-.25.25-.415.083-.167.042-.313-.02-.439-.063-.125-.558-1.347-.765-1.849-.2-.486-.402-.422-.558-.43h-.475c-.165 0-.434.062-.661.312-.228.25-.868.85-.868 2.072 0 1.222.888 2.4 1.012 2.564.125.166 1.748 2.67 4.235 3.74.591.255 1.053.408 1.412.523.593.189 1.134.162 1.561.098.476-.071 1.472-.601 1.68-1.182.207-.581.207-1.08.145-1.182-.062-.102-.228-.166-.477-.291z" />
            </svg>
            <span>Easy Message</span>
          </a>
          <button
            id="mobile-consult-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              setConsultModalOpen(true);
            }}
            className="w-full bg-brand text-white py-3 rounded-full text-base font-semibold transition-all hover:bg-brand/90"
          >
            Book Consultation
          </button>
        </div>
      )}
    </header>
  );
};
