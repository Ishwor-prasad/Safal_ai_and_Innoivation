import React from "react";
import { GraduationCap, Briefcase, Building, Code2, ArrowRight, FileDown } from "lucide-react";

interface ProductsSectionProps {
  navigate: (path: string) => void;
  setConsultModalOpen: (open: boolean) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  navigate,
  setConsultModalOpen
}) => {
  const products = [
    {
      icon: GraduationCap,
      status: "Beta",
      statusStyle: "bg-brand-muted text-brand-dark border-brand-border",
      name: "SAFAL Teacher AI",
      tagline: "Curriculum-aligned lesson assistant",
      description: "Generates CDC-aligned lesson plans, rubrics, and assessments for Nepali classrooms — in English and Nepali.",
      cta: "Register interest",
      onClick: () => setConsultModalOpen(true),
      href: undefined
    },
    {
      icon: Briefcase,
      status: "Coming soon",
      statusStyle: "bg-gray-100 text-gray-600 border-gray-200",
      name: "SAFAL Business AI",
      tagline: "Automation for growing companies",
      description: "Customer communication, reporting, and back-office workflows automated around your existing systems.",
      cta: "Register interest",
      onClick: () => setConsultModalOpen(true),
      href: undefined
    },
    {
      icon: Building,
      status: "Coming soon",
      statusStyle: "bg-gray-100 text-gray-600 border-gray-200",
      name: "SAFAL Municipal AI",
      tagline: "Digital governance assistant",
      description: "Bilingual citizen support portals, records processing, and grievance tracking built for local municipalities.",
      cta: "Register interest",
      onClick: () => setConsultModalOpen(true),
      href: undefined
    },
    {
      icon: Code2,
      status: "Enrolling",
      statusStyle: "bg-brand text-white border-brand",
      name: "Vibe Coding with AI",
      tagline: "6-week practical bootcamp",
      description: "Learn to build and ship real software with AI coding tools — no prior experience required.",
      cta: "View the course",
      onClick: () => navigate("/courses/vibe-coding"),
      href: "/courses/vibe-coding"
    },
    {
      icon: FileDown,
      status: "PDF",
      statusStyle: "bg-brand-muted text-brand-dark border-brand-border",
      name: "AI for Managers",
      tagline: "7-day program documentation",
      description: "A printable A4 guide to our AI for Managers program — full syllabus, daily deliverables, and roadmap.",
      cta: "View & download PDF",
      href: "/ai-for-managers.html",
      external: true
    }
  ];

  return (
    <section id="products" className="py-20 sm:py-24 bg-white border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <span className="eyebrow eyebrow-center justify-center">Products &amp; Programs</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Tools we build, courses we teach
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Production-ready AI products shaped by Nepal's curriculum and business context — plus hands-on training to use them well.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">

          {products.map((p) => (
            <div key={p.name} className="card-elevated p-6 lg:p-7 flex flex-col group">
              <div className="flex items-start justify-between mb-5">
                <div className="h-11 w-11 rounded-lg bg-surface-muted border border-gray-200 text-gray-700 flex items-center justify-center">
                  <p.icon className="h-5 w-5" />
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${p.statusStyle}`}>
                  {p.status}
                </span>
              </div>

              <h3 className="font-display text-lg font-semibold text-gray-900 tracking-tight">
                {p.name}
              </h3>
              <p className="text-xs font-medium text-brand-dark mt-1">{p.tagline}</p>
              <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-6">
                {p.description}
              </p>

              <div className="mt-auto pt-4 border-t border-gray-100">
                {p.external ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
                  >
                    {p.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                ) : p.href ? (
                  <a
                    href={p.href}
                    onClick={(e) => { e.preventDefault(); p.onClick(); }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
                  >
                    {p.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  <button
                    onClick={p.onClick}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-brand transition-colors cursor-pointer bg-transparent border-none p-0"
                  >
                    {p.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}

        </div>

        <p className="text-center text-xs text-gray-400">
          Products marked “coming soon” are in active development with partner organizations.
        </p>
      </div>
    </section>
  );
};
