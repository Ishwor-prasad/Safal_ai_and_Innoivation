import React, { useRef, useEffect } from "react";
import { Leaf, ArrowRight, BookOpen } from "lucide-react";
const safalLogo = "/logo.png";

interface HeroSectionProps {
  t: any;
  handleNavClick: (sectionId: string) => void;
  setConsultModalOpen: (open: boolean) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  handleNavClick,
  setConsultModalOpen
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Neural Connection Grid Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = Math.min(420, window.innerHeight * 0.6));

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
      }
    };
    window.addEventListener("resize", handleResize);

    const nodeCount = 42;
    const nodes: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    const drawNodes = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(22, 163, 74, 0.06)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodeCount; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.25;
            ctx.strokeStyle = `rgba(22, 163, 74, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            if (dist < 50 && i % 4 === 0) {
              ctx.strokeStyle = `rgba(74, 222, 128, ${alpha * 0.9})`;
              ctx.stroke();
            }
          }
        }
      }

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.fillStyle = i % 5 === 0 ? "#4ADE80" : "#16A34A";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        if (i % 8 === 0) {
          ctx.fillStyle = "rgba(22, 163, 74, 0.18)";
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(drawNodes);
    };

    drawNodes();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative bg-white pt-24 pb-12 sm:pt-36 sm:pb-20 overflow-hidden flex flex-col justify-center min-h-[85vh] border-b border-gray-100"
    >
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-green-400/5 rounded-full filter blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[280px] h-[280px] bg-emerald-300/4 rounded-full filter blur-[80px] pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full text-center xl:text-left">
        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12 xl:gap-8 items-center">

          <div className="xl:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 rounded-full px-4 py-1.5 text-xs text-brand font-semibold uppercase tracking-wider mx-auto xl:mx-0 shadow-xs">
              <Leaf className="h-3.5 w-3.5 text-brand animate-spin" style={{ animationDuration: '3s' }} />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight animate-fade-in">
              {t.hero.title} <br />
              <span className="text-gradient-green">{t.hero.titleAccent}</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mx-auto xl:mx-0 font-light">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start pt-2">
              <a
                href="#products"
                onClick={(e) => { e.preventDefault(); handleNavClick("products"); }}
                className="bg-brand text-white hover:bg-brand-light font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all text-center flex items-center justify-center gap-2 group shadow-xl shadow-emerald-600/20 hover:scale-[1.03] active:scale-[0.98] cursor-pointer border-none"
              >
                <span>{t.hero.cta1}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setConsultModalOpen(true)}
                className="bg-white hover:bg-gray-50 border border-gray-250 text-gray-800 font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all text-center tracking-wide cursor-pointer text-sm hover:scale-[1.03] active:scale-[0.98] shadow-xs"
              >
                {t.hero.cta2}
              </button>
            </div>
          </div>

          <div className="xl:col-span-5 relative flex justify-center xl:justify-end">
            <div className="w-full max-w-[420px] aspect-square rounded-2xl sm:rounded-3xl overflow-hidden relative group shadow-2xl border-4 border-gray-150 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop"
                alt="Mountains of Nepal"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-110 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-brand/20" />

              <div className="absolute top-6 sm:top-8 left-6 sm:left-8 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl float-bob border border-brand-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <BookOpen className="h-6 w-6 text-brand" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-bold text-gray-900">SAFAL Teacher AI</p>
                    <p className="text-[10px] text-gray-500">Instant Lesson Plans</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl float-bob border border-brand-border" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Leaf className="h-6 w-6 text-brand animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">AI for Nepal</p>
                    <p className="text-[10px] text-gray-500">नेपालको लागि AI</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 sm:h-24 sm:w-24 bg-white rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl animate-pulse border-4 border-white">
                  <img src={safalLogo} alt="Safal AI Logo" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
