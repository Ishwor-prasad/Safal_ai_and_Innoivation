import React, { useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import {
  GraduationCap,
  Leaf,
  BookOpen,
  Briefcase,
  Building,
  Users,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Copy,
  Check,
  Send,
  ArrowRight,
  Award,
  Globe,
  FileText,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ExternalLink,
  Sliders,
  Terminal,
  HelpCircle,
  TreePine,
  HeartHandshake,
  MessageSquare,
  Heart,
  Loader2,
  Linkedin,
  Facebook,
  Instagram,
  Youtube
} from "lucide-react";
import {
  SERVICES,
  PRODUCTS,
  WHY_CHOOSE_SAFAL,
  INDUSTRIES,
  RESEARCH_FOCUS_AREAS,
  TRAINING_PROGRAMS,
  TESTIMONIALS,
  TRUSTED_PARTNERS,
  PartnerOrg,
  CASE_STUDIES,
  TEAM_MEMBERS,
  VIBE_MODULES,
  VIBE_SCHEDULES,
  VIBE_STATS,
  VIBE_SKILLS,
  VIBE_SUCCESS_STORIES
} from "./data";

export default function App() {
  // Language state - default English
  const [language, setLanguage] = useState<"en" | "ne">("en");

  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // General Interactive States
  const [activeTestimonialCategory, setActiveTestimonialCategory] = useState<
    "Teacher" | "Professional" | "Organization"
  >("Teacher");
  const [activePartnerFilter, setActivePartnerFilter] = useState<
    "All" | "School" | "College" | "Municipality" | "Enterprise"
  >("All");

  // SAFAL Teacher AI Sandbox Demo States
  const [demoGrade, setDemoGrade] = useState("Grade 8");
  const [demoSubject, setDemoSubject] = useState("Science");
  const [demoTopic, setDemoTopic] = useState("Simple Machines");
  const [demoLanguage, setDemoLanguage] = useState("English");
  const [demoFocus, setDemoFocus] = useState("");
  const [demoLoading, setDemoLoading] = useState(false);
  const [currentLoadingStep, setCurrentLoadingStep] = useState(0);
  const [demoResult, setDemoResult] = useState<string | null>(null);
  const [demoCopied, setDemoCopied] = useState(false);
  const [demoIsSimulated, setDemoIsSimulated] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Live Consultation Booking Modal state
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [consultName, setConsultName] = useState("");
  const [consultEmail, setConsultEmail] = useState("");
  const [consultOrg, setConsultOrg] = useState("");
  const [consultPhone, setConsultPhone] = useState("");
  const [consultSector, setConsultSector] = useState("Education");
  const [consultMessage, setConsultMessage] = useState("");
  const [consultSubmitting, setConsultSubmitting] = useState(false);
  const [consultSuccessMsg, setConsultSuccessMsg] = useState<string | null>(null);

  // General Contact Form States
  const [contactName, setContactName] = useState("");
  const [contactOrg, setContactOrg] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccessMsg, setContactSuccessMsg] = useState<string | null>(null);

  // AI Chatbot States
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Namaste! I am **SAFAL AI Mitra** (सफल एआई मित्र), your virtual guide. Ask me about our curriculum-aligned SAFAL Teacher AI sandbox, AI training programs, or digital solutions for public & private sectors. Let's modernize Nepal together!"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, chatOpen]);

  const handleSendChatMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const msgText = customText || chatInput;
    if (!msgText.trim() || chatLoading) return;

    if (!customText) {
      setChatInput("");
    }

    const updated = [...chatMessages, { role: "user" as const, content: msgText }];
    setChatMessages(updated);
    setChatLoading(true);

    try {
      const apiMessages = updated.map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        parts: [{ text: m.content }]
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!res.ok) throw new Error("HTTP error");
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setChatMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm having a bit of trouble communicating with my neural network right now. Please try again in a moment, or feel free to email our support coordinate at **info@safalai.org**."
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Animated Stats State (Simulated on Mount)
  const [stats, setStats] = useState({
    trained: 0,
    workshops: 0,
    partners: 0,
    learners: 0,
  });

  // Canvas Reference for neural network vector animation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set up stats trigger animation
  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const interval = setInterval(() => {
      stepCount++;
      setStats({
        trained: Math.min(Math.round((500 / steps) * stepCount), 500),
        workshops: Math.min(Math.round((50 / steps) * stepCount), 50),
        partners: Math.min(Math.round((20 / steps) * stepCount), 20),
        learners: Math.min(Math.round((1000 / steps) * stepCount), 1000),
      });

      if (stepCount >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Neural Connection Grid Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
      }
    };
    window.addEventListener("resize", handleResize);

    // Node items
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

      // Create subtle dark gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#070D0A");
      bgGrad.addColorStop(1, "#0D1710");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw grid lines
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

      // Draw active connections
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

            // Accent connections
            if (dist < 50 && i % 4 === 0) {
              ctx.strokeStyle = `rgba(74, 222, 128, ${alpha * 0.9})`;
              ctx.stroke();
            }
          }
        }
      }

      // Move & render nodes
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Bounce boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.fillStyle = i % 5 === 0 ? "#4ADE80" : "#16A34A";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Aura effect for key nodes
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

  // SAFAL Teacher AI loading step updates
  const loadingSteps = [
    "Analyzing Nepal's CDC Syllabus Guidelines...",
    "Querying NEB Standard Rubrics & Directives...",
    "Drafting detailed 45-Minute Lesson timeline structures...",
    "Formulating localized Nepalese testing worksheets...",
    "Optimizing multilingual delivery constraints..."
  ];

  useEffect(() => {
    let stepInterval: any;
    if (demoLoading) {
      stepInterval = setInterval(() => {
        setCurrentLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 2500);
    } else {
      setCurrentLoadingStep(0);
    }
    return () => clearInterval(stepInterval);
  }, [demoLoading]);

  // Run the SAFAL Teacher AI Sandbox Generation
  const handleGenerateTeacherAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoLoading(true);
    setDemoResult(null);
    setErrorText(null);

    try {
      const response = await fetch("/api/teacher-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade: demoGrade,
          subject: demoSubject,
          topic: demoTopic,
          language: demoLanguage,
          focusArea: demoFocus,
        }),
      });

      if (!response.ok) {
        throw new Error("Generation request received an unexpected status from the service.");
      }

      const data = await response.json();
      setDemoResult(data.content);
      setDemoIsSimulated(!!data.isSimulated);
    } catch (err: any) {
      console.error(err);
      setErrorText("Our high-performance server encountered an interruption. Please try clicking generate again.");
    } finally {
      setDemoLoading(false);
    }
  };

  const handleCopyDemoClipboard = () => {
    if (!demoResult) return;
    navigator.clipboard.writeText(demoResult);
    setDemoCopied(true);
    setTimeout(() => setDemoCopied(false), 2000);
  };

  // Submit Consultation Form
  const handleBookConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSubmitting(true);
    setConsultSuccessMsg(null);

    try {
      const resp = await fetch("/api/book-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: consultName,
          email: consultEmail,
          organization: consultOrg,
          phone: consultPhone,
          sector: consultSector,
          message: consultMessage,
        }),
      });

      if (!resp.ok) throw new Error("Server error");
      const data = await resp.json();
      setConsultSuccessMsg(data.message);

      // Reset form
      setConsultName("");
      setConsultEmail("");
      setConsultOrg("");
      setConsultPhone("");
      setConsultMessage("");
    } catch (err) {
      setConsultSuccessMsg("Thank you! Your booking interest is received. Our AI coordination desk will correspond with you directly.");
    } finally {
      setConsultSubmitting(false);
    }
  };

  // Submit general contact form
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactSuccessMsg(null);

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          organization: contactOrg,
          email: contactEmail,
          phone: contactPhone,
          message: contactMessage,
        }),
      });

      if (!resp.ok) throw new Error("Server error");
      const data = await resp.json();
      setContactSuccessMsg(data.message);

      // Reset Form fields
      setContactName("");
      setContactOrg("");
      setContactEmail("");
      setContactPhone("");
      setContactMessage("");
    } catch (e) {
      setContactSuccessMsg("Inquiry submitted successfully! Namaste. We will reach back within 24 business hours.");
    } finally {
      setContactSubmitting(false);
    }
  };

  const filteredPartners = TRUSTED_PARTNERS.filter((p) => {
    if (activePartnerFilter === "All") return true;
    return p.category === activePartnerFilter;
  });

  // Translation content
  const t = {
    hero: {
      badge: language === "en" ? "Nepal's Premier AI Catalyst" : "नेपालको प्रमुख AI उत्प्रेरक",
      title: language === "en" ? "Building Nepal's" : "नेपालको निर्माण",
      titleAccent: language === "en" ? "AI Future" : "AI भविष्य",
      description: language === "en"
        ? "We help schools, businesses, organizations and governments harness the power of Artificial Intelligence through innovative products, automation solutions, training and digital transformation."
        : "हामी स्कूल, व्यवसाय, संस्था र सरकारलाई नवीन उत्पादन, स्वचालन समाधान, तालिम र डिजिटल रूपान्तरण मार्फत कृत्रिम बुद्धिमत्ताको शक्ति प्रयोग गर्न मद्दत गर्छौं।",
      cta1: language === "en" ? "Explore Solutions" : "समाधान अन्वेषण गर्नुहोस्",
      cta2: language === "en" ? "Book Consultation" : "परामर्श बुक गर्नुहोस्"
    },
    nav: {
      home: language === "en" ? "Home" : "गृहपृष्ठ",
      products: language === "en" ? "Products" : "उत्पादनहरू",
      vibe: language === "en" ? "Vibe Coding" : "Vibe कोडिङ",
      about: language === "en" ? "About" : "बारेमा",
      contact: language === "en" ? "Contact" : "सम्पर्क"
    }
  };



  const showcaseImages = [
    {
      src: "https://images.pexels.com/photos/3807595/pexels-photo-3807595.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
      label: "Teacher Enablement",
      caption: "AI training that feels practical inside real classrooms."
    },
    {
      src: "https://images.pexels.com/photos/3807501/pexels-photo-3807501.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
      label: "Digital Workflows",
      caption: "Automation systems for teams that need speed and clarity."
    },
    {
      src: "https://images.pexels.com/photos/3862545/pexels-photo-3862545.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
      label: "Institution Strategy",
      caption: "Consulting, adoption planning, and measurable rollout support."
    }
  ];

  const industryImages = [
    "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
    "https://images.pexels.com/photos/3807609/pexels-photo-3807609.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
    "https://images.pexels.com/photos/3862630/pexels-photo-3862630.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
    "https://images.pexels.com/photos/3807595/pexels-photo-3807595.jpeg?auto=compress&cs=tinysrgb&w=900&q=80"
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-brand selection:text-white" id="safal-main">
      {/* Subtle top-right green glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[300px] bg-brand/5 rounded-full blur-[120px] -mr-48 -mt-24 pointer-events-none z-0" />

      {/* STICKY HEADER */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm"
            : "bg-white/90 backdrop-blur py-5 border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group" id="logo-anchor">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand to-brand-accent flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="text-white h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-gray-900 block">
                SAFAL <span className="text-brand">AI</span>
              </span>
              <span className="text-[10px] text-gray-600 font-mono tracking-widest block uppercase">
                &amp; Innovation Centre
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8" id="desktop-nav">
            <a href="#hero" className="text-gray-600 hover:text-brand font-medium text-sm transition-colors">Home</a>
            <a href="#products" className="text-gray-600 hover:text-brand font-medium text-sm transition-colors">Products</a>
            <a href="#vibe-coding" className="text-brand font-semibold text-sm transition-colors flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand inline-block animate-pulse" />
              Vibe Coding
            </a>
            <a href="#about" className="text-gray-600 hover:text-brand font-medium text-sm transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-brand font-medium text-sm transition-colors">Contact</a>
            <button
              onClick={() => setLanguage(language === "en" ? "ne" : "en")}
              className="ml-2 px-3 py-1 text-xs font-semibold border border-brand text-brand hover:bg-brand hover:text-white rounded-full transition-all"
            >
              {language === "en" ? "नेपाली" : "English"}
            </button>
          </nav>

          <div className="hidden md:block">
            <button
              id="nav-consult-btn"
              onClick={() => setConsultModalOpen(true)}
              className="bg-brand hover:bg-brand/90 text-white font-medium text-sm py-2 px-5 rounded-full transition-all hover:scale-105 hover:ring-2 hover:ring-brand/40 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Book Consultation</span>
              <Calendar className="h-4 w-4" />
            </button>
          </div>

          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-brand focus:outline-none p-1 pointer-events-auto"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-dropdown"
            className="md:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full p-6 space-y-4 shadow-lg text-center flex flex-col"
          >
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Home
            </a>
            <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Solutions
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Products
            </a>
            <a
              href="#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Case Studies
            </a>
            <a
              href="#training"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Training
            </a>
            <a
              href="#vibe-coding"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-brand font-semibold text-base py-2 border-b border-gray-100 flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand inline-block" />
              Vibe Coding with AI
            </a>
            <a
              href="#research"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Research
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              About Us
            </a>
            <a
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Team
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-600 hover:text-brand text-base py-2"
            >
              Contact
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


      {/* HERO SECTION — light theme with dark green gradient */}
      <section
        id="hero"
        className="relative bg-gradient-to-br from-[#052e16] via-[#14532d] to-[#064e3b] pt-36 pb-20 overflow-hidden flex flex-col justify-center min-h-[90vh]"
      >
        {/* Particle canvas */}
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-green-400/10 rounded-full filter blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-1/4 w-[280px] h-[280px] bg-emerald-300/8 rounded-full filter blur-[80px] pointer-events-none z-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 text-xs text-brand font-medium uppercase tracking-wider mx-auto lg:mx-0 animate-pulse">
                <Leaf className="h-3.5 w-3.5 text-brand-accent animate-spin" style={{ animationDuration: '3s' }} />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight animate-fade-in">
                {t.hero.title} <br />
                <span className="text-gradient-green">{t.hero.titleAccent}</span>
              </h1>

              <p className="text-green-100 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mx-auto lg:mx-0 font-light">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <a
                  href="#products"
                  className="bg-white text-brand hover:bg-green-50 font-semibold px-8 py-3.5 rounded-full transition-all text-center flex items-center justify-center gap-2 group shadow-lg ring-pulse hover:scale-105"
                >
                  <span>{t.hero.cta1}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="bg-transparent hover:bg-white/10 border border-white/40 hover:border-white/60 text-white font-medium px-8 py-3.5 rounded-full transition-all text-center tracking-wide cursor-pointer text-sm hover:scale-105"
                >
                  {t.hero.cta2}
                </button>
              </div>

              {/* SEO Badges */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-mono text-green-300/70">
                <span>#AICompanyNepal</span>
                <span>#ArtificialIntelligenceNepal</span>
                <span>#EdTechNepal</span>
                <span>#AITraining</span>
              </div>
            </div>

            {/* Visual Column - Nepali Theme */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden relative group shadow-2xl border-4 border-white/20 hover:border-brand/40 transition-all duration-500">
                {/* Nepali Cultural Background Image */}
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop"
                  alt="Mountains of Nepal"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/60 via-transparent to-emerald-900/60" />

                {/* Animated Floating Elements */}
                <div className="absolute top-8 left-8 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl float-bob border border-brand/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand/10 rounded-lg">
                      <BookOpen className="h-6 w-6 text-brand" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand">SAFAL Teacher AI</p>
                      <p className="text-[10px] text-gray-600">Instant Lesson Plans</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl float-bob border border-brand/20" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand/10 rounded-lg">
                      <Leaf className="h-6 w-6 text-brand animate-pulse" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand">AI for Nepal</p>
                      <p className="text-[10px] text-gray-600">नेपालको लागि AI</p>
                    </div>
                  </div>
                </div>

                {/* Central AI Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-24 w-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl animate-pulse border-4 border-brand/30">
                    <GraduationCap className="text-brand h-12 w-12" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* STATISTICS SECTION */}
      <section id="statistics" className="bg-brand py-12 border-y border-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            
            <div className="p-4" id="stat-trained">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                <span className="text-white">{stats.trained}+</span>
              </div>
              <p className="text-xs sm:text-sm text-green-100 font-medium mt-2 tracking-wide uppercase">
                Professionals Trained
              </p>
            </div>

            <div className="p-4" id="stat-workshops">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                <span className="text-white">{stats.workshops}+</span>
              </div>
              <p className="text-xs sm:text-sm text-green-100 font-medium mt-2 tracking-wide uppercase">
                Workshops Conducted
              </p>
            </div>

            <div className="p-4" id="stat-partners">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                <span className="text-white">{stats.partners}+</span>
              </div>
              <p className="text-xs sm:text-sm text-green-100 font-medium mt-2 tracking-wide uppercase">
                Partner Institutions
              </p>
            </div>

            <div className="p-4" id="stat-impacted">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                <span className="text-white">{stats.learners}+</span>
              </div>
              <p className="text-xs sm:text-sm text-green-100 font-medium mt-2 tracking-wide uppercase">
                Learners Impacted
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* OUR SERVICES / SOLUTIONS SECTION */}
      <section id="solutions" className="py-24 bg-surface-muted scroll-mt-10 border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-brand tracking-widest uppercase">
              Unified Ecosystem
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              AI Solutions For Every Sector
            </h2>
            <p className="text-gray-600 font-light">
              We operate beyond training. SAFAL AI is Nepal's core innovation partner building strategic solutions, custom frameworks, and curriculum architectures to empower modern institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s, idx) => {
              const iconsList = [BookOpen, Leaf, GraduationCap, Sliders, Terminal];
              const IconComp = iconsList[idx] || Leaf;
              return (
                <div
                  key={s.id}
                  id={`service-card-${s.id}`}
                  className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-brand/30 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-transparent group-hover:bg-brand transition-colors duration-300" />
                  
                  <div className="h-12 w-12 rounded-xl bg-brand/10 border border-brand/20 text-brand flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                    <IconComp className="h-6 w-6" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-brand transition-colors">
                    {s.title}
                  </h3>
                  
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 font-light">
                    {s.description}
                  </p>

                  <div className="pt-4 border-t border-white/5 mt-auto">
                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      {s.longDescription}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Book Consultation Banner */}
          <div className="mt-16 consult-card-light rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand/5 rounded-full filter blur-[50px] pointer-events-none" />
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="text-xs font-mono text-brand-accent tracking-wider uppercase block">
                Enterprise &amp; Academic Integration
              </span>
              <h3 className="font-display text-2xl font-bold text-gray-900 tracking-tight">
                Require a bespoke localized Artificial Intelligence blueprint?
              </h3>
              <p className="text-gray-700 text-sm font-light">
                Consult with our research architects to map specialized data pathways, security frameworks, and custom digital transformation pipelines.
              </p>
            </div>
            <button
              onClick={() => setConsultModalOpen(true)}
              className="bg-[#0A66FF] hover:bg-blue-600 hover:scale-105 active:scale-95 text-white font-semibold text-sm py-4 px-8 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20 shrink-0 cursor-pointer border-none"
            >
              <span>Book Strategic Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>


      {/* FLAGSHIP PRODUCTS SECTION WITH EMBEDDED REAL-TIME SANDBOX AI DEMO */}
      <section id="products" className="py-24 bg-dark-primary dark-section scroll-mt-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-secondary to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
              Direct Practical Tools
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our AI Products
            </h2>
            <p className="text-gray-700 font-light">
              We design and construct production-ready AI layers that integrate local context, CDC syllabi guidelines, and regional workflows. Explore our product matrix.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                id={`product-card-${prod.id}`}
                className={`rounded-2xl border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden backdrop-blur-md ${
                  prod.status === "Beta"
                    ? "border-brand/35 bg-dark-secondary shadow-lg shadow-brand/5 ring-1 ring-brand/10"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase font-bold ${
                        prod.status === "Beta"
                          ? "bg-brand/10 text-brand border border-brand/20"
                          : "bg-white/5 text-gray-600"
                      }`}
                    >
                      {prod.status}
                    </span>
                    <GraduationCap className={`h-5 w-5 ${prod.status === "Beta" ? "text-brand" : "text-gray-600"}`} />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-1 tracking-tight">
                    {prod.name}
                  </h3>
                  <p className="text-xs font-mono text-brand mb-4">{prod.tagline}</p>
                  
                  <p className="text-gray-700 text-sm font-light leading-relaxed mb-6">
                    {prod.description}
                  </p>

                  <ul className="space-y-2.5 mb-8 text-xs text-gray-600">
                    {prod.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {prod.ctaAvailable ? (
                    <a
                      href="#sandbox"
                      className="w-full text-center block bg-brand hover:bg-brand/90 text-white font-medium text-sm py-3 px-6 rounded-xl transition-all"
                    >
                      Test Sandbox Demonstration
                    </a>
                  ) : (
                    <button
                      className="w-full bg-white/5 text-gray-600 font-medium text-sm py-3 px-6 rounded-xl cursor-not-allowed"
                      disabled
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            ))}

          </div>


          {/* SANDBOX DEMO INTERACTIVE TERMINAL */}
          <div
            id="sandbox"
            className="border border-brand/20 bg-dark-secondary rounded-3xl p-6 sm:p-10 shadow-2xl relative scroll-mt-24 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand/5 rounded-full filter blur-[80px] pointer-events-none" />

            {/* Sandbox Head */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <Terminal className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl font-bold text-white tracking-tight">
                      SAFAL Teacher AI Real-Time Sandbox
                    </h3>
                    <span className="bg-brand-accent/15 text-brand-accent border border-brand-accent/20 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-mono font-bold">
                      Interactive Live Demo
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Generate CDC-aligned Nepalese lesson plans in seconds powered by the Gemini 3.5 Engine.
                  </p>
                </div>
              </div>
              <div className="text-xs font-mono text-gray-600">
                <span>Version: CDC-Beta_2.1</span>
              </div>
            </div>

            {/* Form & Workspace Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column Settings */}
              <form onSubmit={handleGenerateTeacherAI} className="lg:col-span-4 space-y-5" id="sandbox-form">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1.5" htmlFor="grade-select">
                    Grade Level Target
                  </label>
                  <select
                    id="grade-select"
                    value={demoGrade}
                    onChange={(e) => setDemoGrade(e.target.value)}
                    className="w-full bg-dark-primary border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors cursor-pointer"
                  >
                    <option value="Grade 5">Grade 5 (Primary)</option>
                    <option value="Grade 8">Grade 8 (Basic Level)</option>
                    <option value="Grade 10">Grade 10 (S.E.E. Target)</option>
                    <option value="Grade 11">Grade 11 (NEB Higher Secondary)</option>
                    <option value="Grade 12">Grade 12 (NEB Board Target)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1.5" htmlFor="subject-select">
                    Subject Stream
                  </label>
                  <select
                    id="subject-select"
                    value={demoSubject}
                    onChange={(e) => {
                      setDemoSubject(e.target.value);
                      // Auto topic pairing to improve experience
                      if (e.target.value === "Science") setDemoTopic("Simple Machines");
                      if (e.target.value === "Mathematics") setDemoTopic("Set Theory & Venn Diagrams");
                      if (e.target.value === "Social Studies") setDemoTopic("Ancient Monuments of Nepal");
                      if (e.target.value === "Nepali") setDemoTopic("सङ्गति र व्याकरण");
                      if (e.target.value === "Computer Science") setDemoTopic("Concept of Artificial Intelligence");
                    }}
                    className="w-full bg-dark-primary border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors cursor-pointer"
                  >
                    <option value="Science">Science &amp; Environment</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Social Studies">Social Studies</option>
                    <option value="Nepali">Nepali Literature &amp; Lang</option>
                    <option value="Computer Science">Computer Science &amp; IT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1.5" htmlFor="topic-input">
                    Topic / Chapter
                  </label>
                  <input
                    id="topic-input"
                    type="text"
                    required
                    value={demoTopic}
                    onChange={(e) => setDemoTopic(e.target.value)}
                    placeholder="e.g. Simple Machines, Force, Set Theory"
                    className="w-full bg-dark-primary border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1.5" htmlFor="lang-select">
                    Syllabus Language Output
                  </label>
                  <div className="grid grid-cols-2 gap-2" id="lang-select">
                    <button
                      type="button"
                      onClick={() => setDemoLanguage("English")}
                      className={`py-2 px-3 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer ${
                        demoLanguage === "English"
                          ? "bg-brand/10 border-brand text-white"
                          : "bg-dark-primary border-white/5 text-gray-600 hover:text-white"
                      }`}
                    >
                      English Language
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoLanguage("Nepali")}
                      className={`py-2 px-3 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer ${
                        demoLanguage === "Nepali"
                          ? "bg-brand/10 border-brand text-white"
                          : "bg-dark-primary border-white/5 text-gray-600 hover:text-white"
                      }`}
                    >
                      नेपाली संस्करण
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1.5" htmlFor="focus-input">
                    Special Focus (Optional)
                  </label>
                  <input
                    id="focus-input"
                    type="text"
                    value={demoFocus}
                    onChange={(e) => setDemoFocus(e.target.value)}
                    placeholder="e.g., experiential lab activity, low-cost resources"
                    className="w-full bg-dark-primary border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors text-xs"
                  />
                  <span className="text-[10px] text-gray-600 mt-1 block leading-relaxed">
                    Hints highlight specific pedagogical constraints like local Nepalese villages or high-end laboratory availability.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={demoLoading}
                  className="w-full bg-brand hover:bg-brand/90 disabled:bg-gray-700 text-white font-medium py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2 cursor-pointer border-none"
                >
                  {demoLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating Blueprint...</span>
                    </>
                  ) : (
                    <>
                      <Leaf className="h-4 w-4 text-brand-accent" />
                      <span>Generate Lesson Blueprint</span>
                    </>
                  )}
                </button>
              </form>

              {/* Right Column Output terminal screen */}
              <div className="lg:col-span-8 flex flex-col h-[520px] rounded-2xl bg-dark-primary border border-white/5 overflow-hidden relative">
                
                {/* Simulated Screen Top Title Bar */}
                <div className="bg-dark-secondary/60 border-b border-white/5 px-4 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 bg-red-500 rounded-full opacity-60" />
                    <div className="h-3 w-3 bg-yellow-500 rounded-full opacity-60" />
                    <div className="h-3 w-3 bg-green-500 rounded-full opacity-60" />
                    <span className="text-xs font-mono text-gray-600 ml-3">lessonplane_generator.sh</span>
                  </div>

                  {demoResult && (
                    <div className="flex items-center gap-2">
                      {demoIsSimulated && (
                        <span className="text-[10px] font-mono text-yellow-500 bg-yellow-500/5 border border-yellow-500/10 px-2 py-0.5 rounded">
                          Simulation Mode
                        </span>
                      )}
                      <button
                        onClick={handleCopyDemoClipboard}
                        className="text-gray-600 hover:text-white p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer"
                        title="Copy to Clipboard"
                      >
                        {demoCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-brand-accent" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Plan</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Main Content Pane */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8" id="sandbox-output-viewport">
                  {demoLoading ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      {/* Interactive Loader Circle */}
                      <div className="relative h-16 w-16 flex items-center justify-center">
                        <div className="absolute h-16 w-16 rounded-full border-4 border-dashed border-brand/20" />
                        <div className="absolute h-10 w-10 rounded-full border-2 border-brand-accent/50 border-t-transparent" />
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-gray-700 font-mono tracking-wide">
                          {loadingSteps[currentLoadingStep]}
                        </p>
                        <p className="text-xs text-gray-600">
                          Deploying deep NLP context layers to matches NEB standards...
                        </p>
                      </div>
                    </div>
                  ) : errorText ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                      <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-full text-red-400">
                        <HelpCircle className="h-8 w-8" />
                      </div>
                      <p className="text-sm font-medium text-red-200 max-w-sm">
                        {errorText}
                      </p>
                    </div>
                  ) : demoResult ? (
                    <div className="prose prose-invert max-w-none text-left select-text markdown-body">
                      <Markdown>{demoResult}</Markdown>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-4">
                      <div className="h-16 w-16 rounded-2xl bg-brand/5 border border-white/5 flex items-center justify-center text-brand">
                        <Sliders className="h-8 w-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display text-base font-bold text-white">
                          No Lesson Blueprint Generated Yet
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Configure the sidebar metrics for Grade, Subject, and Chapter on the left, then click **Generate Lesson Blueprint**. SAFAL AI will compile a specialized pedagogical plan instantly.
                        </p>
                      </div>
                      {/* Quick Preload buttons */}
                      <div className="flex flex-wrap justify-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setDemoGrade("Grade 10");
                            setDemoSubject("Science");
                            setDemoTopic("Force and Motion");
                          }}
                          className="bg-white/5 hover:bg-white/10 text-gray-700 border border-white/5 text-[10px] font-mono px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                        >
                          Grade 10 S.E.E. Force Plan
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDemoGrade("Grade 8");
                            setDemoSubject("Nepali");
                            setDemoTopic("नेपालका सांस्कृतिक सम्पदा");
                            setDemoLanguage("Nepali");
                          }}
                          className="bg-white/5 hover:bg-white/10 text-gray-700 border border-white/5 text-[10px] font-mono px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                        >
                          कक्षा ८ नेपाली योजना
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer status line info */}
                <div className="bg-dark-secondary/40 border-t border-white/5 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-accent" />
                    <span>Active Gateway: secure_ssl</span>
                  </div>
                  <span>Output: Markdown Format</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* WHY CHOOSE SAFAL AI */}
      <section className="py-24 dark-section border-y border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
              Core Distinctions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-center">
              Why Organizations Choose SAFAL AI
            </h2>
            <p className="text-gray-600 font-light">
              We construct local intelligence paradigms that are highly practical and designed to solve actual structural, pedagogical, and administrative challenges within the Nepalese system.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {showcaseImages.map((item, idx) => (
              <div
                key={item.label}
                className={`image-panel h-64 md:h-72 fade-in-up ${idx === 1 ? "md:mt-8" : ""}`}
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <img src={item.src} alt={item.label} loading="lazy" />
                <div className="image-panel-caption">
                  <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest font-semibold">{item.label}</span>
                  <p className="text-sm text-white font-medium leading-snug mt-1">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_SAFAL.map((reason) => {
              const bgColors = [
                "bg-[#0A66FF]/10 text-[#0A66FF] border border-[#0A66FF]/25",
                "bg-[#00C853]/10 text-brand-accent border border-[#00C853]/25",
                "bg-purple-500/10 text-purple-400 border border-purple-500/25",
                "bg-amber-500/10 text-amber-400 border border-amber-500/25"
              ];
              const keyBadgeIndex = WHY_CHOOSE_SAFAL.indexOf(reason) % bgColors.length;
              return (
                <div
                  key={reason.id}
                  id={`why-card-${reason.id}`}
                  className="bg-white/5 hover:bg-white/[0.08] rounded-2xl p-6 border border-white/10 transition-all hover:shadow-2xl hover:-translate-y-1 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-semibold tracking-wider font-mono px-3 py-1 rounded-full uppercase ${bgColors[keyBadgeIndex]}`}>
                      {reason.title.split(" ")[0]}
                    </span>
                    <Leaf className="h-4 w-4 text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <h3 className="font-display text-lg font-bold text-white mb-2 tracking-tight">
                    {reason.title}
                  </h3>
                  
                  <p className="text-gray-700 text-sm leading-relaxed font-light">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* INDUSTRIES WE SERVE */}
      <section id="industries" className="py-24 dark-section border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
              Strategic Verticals
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Industries We Serve
            </h2>
            <p className="text-gray-600 font-light">
              Designing optimized intelligence structures that bridge capabilities across schools, local civil offices, rapidly expanding SMEs, and international development bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INDUSTRIES.map((ind, idx) => {
              const icons = [BookOpen, Briefcase, Building, Users];
              const IconComp = icons[idx] || Users;
              return (
                <div
                  key={ind.id}
                  id={`industry-card-${ind.id}`}
                  className="bg-white/5 rounded-2xl border border-white/10 p-8 shadow-lg flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-0.5"
                >
                  <div>
                  <div className="image-panel h-44 mb-6 -mt-2">
                    <img src={industryImages[idx]} alt={`${ind.title} AI deployment`} loading="lazy" />
                    <div className="image-panel-caption">
                      <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest font-semibold">{ind.title}</span>
                    </div>
                  </div>
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="h-11 w-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center border border-brand/20">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-white tracking-tight">
                          {ind.title}
                        </h3>
                        {/* Subsectors pills */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {ind.subsectors.map((s, i) => (
                            <span key={i} className="text-[10px] bg-white/5 text-gray-700 border border-white/5 font-mono tracking-wider px-2 py-0.5 rounded-full uppercase">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed mb-6 font-light">
                      {ind.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-600">
                    <span>Target Deployment Matrix</span>
                    <span className="text-brand flex items-center gap-1 group">
                      <span>Inquire Scope</span>
                      <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* CASE STUDIES SECTION */}
      <section id="case-studies" className="py-24 bg-dark-primary dark-section scroll-mt-20 border-b border-white/10 relative overflow-hidden">
        {/* Ambient background accent */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-accent/5 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
              Proven Transformations
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Impact Case Studies
            </h2>
            <p className="text-gray-600 font-light text-sm sm:text-base">
              A comprehensive review of how our specialized curriculum assistants, enterprise workflows, and e-governance systems create measurable social and operational return.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.id}
                id={`case-card-${cs.id}`}
                className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-brand/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/5"
              >
                {/* Header aspect */}
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono font-semibold text-brand uppercase tracking-widest">
                      {cs.industry}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white tracking-tight">
                      {cs.clientName}
                    </h3>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-mono text-gray-600 uppercase tracking-wider font-semibold">The Challenge</h4>
                      <p className="text-gray-700 font-light text-sm leading-relaxed">
                        {cs.challenge}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-[11px] font-mono text-brand uppercase tracking-wider font-semibold">The AI Solution</h4>
                      <p className="text-slate-200 font-normal text-sm leading-relaxed">
                        {cs.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results Bullet points check lists */}
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <h4 className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">Measurable Results</h4>
                    <ul className="space-y-2">
                      {cs.results.map((resMsg, ridx) => (
                        <li key={ridx} className="flex gap-2.5 items-start text-xs font-light text-gray-700 leading-normal">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{resMsg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Client Quote Card Footer */}
                <div className={`p-6 sm:p-8 bg-gradient-to-br ${cs.gradient} border-t border-white/10 relative overflow-hidden`}>
                  <div className="absolute top-4 right-4 text-white/5 pointer-events-none text-7xl font-serif select-none">
                    "
                  </div>
                  <figure className="space-y-3 relative z-10">
                    <blockquote className="text-gray-700 text-xs italic font-light leading-relaxed">
                      "{cs.quote}"
                    </blockquote>
                    <figcaption className="text-[10px] font-mono text-white flex flex-col">
                      <span className="font-semibold">{cs.author}</span>
                      <span className="text-gray-600">{cs.role}</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* RESEARCH & INNOVATION SECTION */}
      <section id="research" className="py-24 bg-dark-primary dark-section scroll-mt-10 relative overflow-hidden">
        {/* Decorative background visual node elements */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-accent/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
                Pioneering Tomorrow
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Researching Tomorrow's <br />AI Solutions
              </h2>
              <p className="text-gray-700 text-base font-light leading-relaxed">
                SAFAL AI is deeply committed to exploring innovative AI applications that address Nepal's unique educational, corporate, linguistic, and societal challenges. We believe in building solutions that scale across geography and resource diversity.
              </p>

              <div className="pt-4 space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0 mt-0.5">
                    <Check className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Local NLP Fine-Tuning</span>
                    <p className="text-xs text-gray-600">Deploying LLM adapters and classifiers that operate in highly refined Nepali syntax structures.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0 mt-0.5">
                    <Check className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Resource-Constrained Optimization</span>
                    <p className="text-xs text-gray-600">Designing server-assisted workflows that execute seamlessly over standard mobile data links.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive List column */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono text-gray-600 block tracking-wider uppercase mb-2">
                Primary Research &amp; Focus Domains:
              </span>
              
              <div className="space-y-3.5">
                {RESEARCH_FOCUS_AREAS.map((focus) => (
                  <div
                    key={focus.id}
                    id={`research-row-${focus.id}`}
                    className="p-5 rounded-2xl bg-dark-secondary/60 border border-white/5 hover:border-brand/40 transition-all flex items-start gap-4"
                  >
                    <div className="h-9 w-9 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0">
                      <GraduationCap className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white tracking-tight">
                        {focus.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed mt-1 font-light">
                        {focus.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* TRAINING PROGRAMS SECTION */}
      <section id="training" className="py-24 dark-section scroll-mt-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
              Skill Acceleration
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Learning Programs
            </h2>
            <p className="text-gray-600 font-light">
              Deploying highly structured educational pipelines that take learners from general AI foundations to constructing custom client deployments safely and productively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TRAINING_PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                id={`training-card-${prog.id}`}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:bg-white/[0.08]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-medium text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded">
                      {prog.duration}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-gray-600">
                      Accredited Course
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-1 tracking-tight">
                    {prog.title}
                  </h3>
                  <p className="text-xs font-medium text-gray-600 mb-6 font-mono">Target: {prog.target}</p>

                  <div className="space-y-3.5 mb-8">
                    <span className="text-xs font-mono font-semibold uppercase text-gray-700 block">Syllabus Overview:</span>
                    <ul className="space-y-2 text-xs text-gray-700 font-light">
                      {prog.syllabus.map((syl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-brand-accent mt-0.5 shrink-0" />
                          <span>{syl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setConsultSector("Education");
                      setConsultMessage(`I'm highly interested in registering for the "${prog.title}" AI Learning Program. Please provide schedule details.`);
                      setConsultModalOpen(true);
                    }}
                    className="w-full text-center block bg-transparent border border-white/20 hover:bg-white/5 text-slate-100 font-medium text-xs py-3 rounded-lg transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Request Syllabus &amp; Enroll Info
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom general action */}
          <div className="text-center mt-12">
            <button
              onClick={() => {
                setConsultSector("Education");
                setConsultMessage("Hi, I want details regarding standard academic program options and available custom slots.");
                setConsultModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light hover:scale-105 transition-all text-white font-medium text-sm py-4 px-8 rounded-full shadow-lg shadow-brand/20 cursor-pointer border-none"
            >
              <span>Explore Custom Institutional Programs</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>


      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-[#070b16] dark-section border-y border-dark-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
              Global Feedback
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What Our Participants Say
            </h2>
            <p className="text-gray-700 font-light">
              Read how teachers, professionals, software engineers, and community executives leverage our tools to restructure efficiency.
            </p>
          </div>

          {/* Testimonial Tabs */}
          <div className="flex justify-center gap-3 mb-12" id="testimonial-tabs">
            {(["Teacher", "Professional", "Organization"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTestimonialCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono font-medium tracking-wider transition-all cursor-pointer ${
                  activeTestimonialCategory === cat
                    ? "bg-brand text-white shadow-md shadow-brand/20"
                    : "bg-white/5 text-gray-600 hover:text-white"
                }`}
              >
                {cat} Testimonials
              </button>
            ))}
          </div>

          {/* Active testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.filter((t) => t.category === activeTestimonialCategory).map((testimonial) => (
              <div
                key={testimonial.id}
                id={`testimonial-card-${testimonial.id}`}
                className="bg-dark-secondary/60 border border-white/5 rounded-2xl p-8 flex flex-col justify-between relative shadow-xl hover:border-white/10 transition-colors"
              >
                {/* Quote details */}
                <div className="space-y-4 mb-6">
                  <div className="text-brand-accent font-display text-4xl leading-none">“</div>
                  <p className="text-gray-700 text-sm leading-relaxed italic font-light">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Profile row */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className={`h-10 w-10 rounded-full ${testimonial.avatarBg || "bg-brand"} flex items-center justify-center font-bold text-white text-xs`}>
                    {testimonial.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white tracking-tight">{testimonial.author}</h4>
                    <p className="text-[11px] text-gray-600 font-light">{testimonial.role}</p>
                    <p className="text-[10px] text-brand font-mono">{testimonial.institution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* PARTNER ORGANIZATIONS (TRUSTED BY) SECTION */}
      <section className="py-16 dark-section border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-1 mb-10">
            <h3 className="font-display text-lg font-bold text-white tracking-tight">
              Trusted By
            </h3>
            <p className="text-xs text-gray-600 font-light uppercase tracking-wider">
              Schools, Colleges, Enterprises &amp; Municipal Governments
            </p>
          </div>

          {/* Simple category pill filtering */}
          <div className="flex flex-wrap justify-center gap-2 mb-8" id="partner-tabs">
            {(["All", "School", "College", "Municipality", "Enterprise"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActivePartnerFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                  activePartnerFilter === cat
                    ? "bg-white text-[#0B1020] font-semibold"
                    : "bg-white/5 text-gray-600 hover:text-white"
                }`}
              >
                {cat}s
              </button>
            ))}
          </div>

          {/* Grayscale styled cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4" id="partner-logos-grid">
            {filteredPartners.map((p) => {
              const typesColors: Record<string, string> = {
                School: "border-white/10 bg-white/5 hover:border-brand/40",
                College: "border-white/10 bg-white/5 hover:border-purple-500/40",
                Municipality: "border-white/10 bg-white/5 hover:border-brand-accent/40",
                Enterprise: "border-white/10 bg-white/5 hover:border-cyan-500/40",
                Partner: "border-white/10 bg-white/5 hover:border-amber-500/40"
              };
              const colorClass = typesColors[p.category] || "border-white/10 bg-white/5";
              return (
                <div
                  key={p.id}
                  id={`partner-card-${p.id}`}
                  className={`border ${colorClass} rounded-xl p-4 flex flex-col items-center justify-center text-center group cursor-default transition-all duration-300 hover:scale-[1.02]`}
                  title={p.name}
                >
                  <span className="text-xs font-display font-semibold text-gray-700 group-hover:text-white transition-colors uppercase tracking-wider block">
                    {p.logoText}
                  </span>
                  <span className="text-[10px] font-mono text-gray-600 tracking-widest mt-1 block uppercase font-medium">
                    {p.category}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ABOUT US SECTION */}
      <section id="about" className="py-24 dark-section border-b border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Mission Vision statement column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
                The SAFAL Story
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                About SAFAL AI &amp; Innovation Centre
              </h2>
              
              <div className="space-y-4 text-gray-700 text-sm font-light leading-relaxed">
                <p>
                  SAFAL AI &amp; Innovation Centre is a Nepal-based artificial intelligence company dedicated to empowering individuals and organizations through AI education, innovation and technology solutions. We believe in building solutions that scale across geography and resource diversity.
                </p>
                <p>
                  Our work actively bridges academic curriculum alignments, sector-specific digital automations, and targeted policy assistance. Rather than acting as a static school or standard training institute, our framework is geared to serve as a deep technology and consulting partner to local Nepalese entities.
                </p>
              </div>

              {/* Mission Vision Bento Plate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8" id="about-mission-vision">
                
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                    <TreePine className="h-5 w-5 text-brand" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white tracking-tight">Our Mission</h3>
                  <p className="text-xs text-gray-700 leading-relaxed font-light">
                    "Empowering Nepal Through Artificial Intelligence" — making advanced tools accessible, localized, practical, and highly impactful.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                    <HeartHandshake className="h-5 w-5 text-brand-accent" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white tracking-tight">Our Vision</h3>
                  <p className="text-xs text-gray-700 leading-relaxed font-light">
                    To become Nepal's most trusted, ethical, and advanced artificial intelligence innovation and technology solutions partner.
                  </p>
                </div>

              </div>
            </div>

            {/* Visual block brand coordinates */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-[380px] p-8 rounded-3xl bg-white/5 border border-white/15 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-brand/15 rounded-full filter blur-[40px] pointer-events-none" />
                
                <h3 className="font-display text-lg font-bold text-white tracking-tight mb-4 border-b border-white/5 pb-3">
                  Ethical Alignment Map
                </h3>

                <ul className="space-y-4 text-xs font-light font-sans">
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-medium block">Localization Priority</strong>
                      <span className="text-gray-700 font-light">Products are custom-tuned to Nepalese grammatical, curriculum, and administrative norms.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-medium block">Inclusivity Mindset</strong>
                      <span className="text-gray-700 font-light">Architectures planned to require minimal computational load, operating over standard networks.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-medium block">Sovereign Data Integrity</strong>
                      <span className="text-gray-700 font-light">Strict safety rules guarding sensitive institutional and curriculum assets securely.</span>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-600">
                  <span>SAFAL INNOVATION LAB</span>
                  <span>EST. 2026</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* LEADERSHIP TEAM SECTION */}
      <section id="team" className="py-24 bg-white border-t border-gray-100 scroll-mt-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full filter blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="section-badge">
              Our Visionaries
            </span>
            <h2 className="font-display text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
              Meet The Team Behind SAFAL AI
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              A passionate team dedicated to empowering Nepal through Artificial Intelligence, innovation and digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                id={`member-card-${member.id}`}
                className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-between text-center relative overflow-hidden group transition-all duration-300 hover:border-brand shadow-sm card-hover"
              >
                {/* Background light hover highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-6 flex flex-col items-center relative z-10 w-full animate-none">
                  {/* Circular profile photo container */}
                  <div className="relative">
                    {/* Ring decoration */}
                    <div className="absolute inset-x-0 inset-y-0 rounded-full bg-gradient-to-tr from-brand to-brand-accent p-[2px] animate-none group-hover:rotate-45 transition-transform duration-500">
                      <div className="h-full w-full rounded-full bg-white" />
                    </div>
                    {/* Inner avatar monogram */}
                    <div className={`relative h-24 w-24 rounded-full bg-gradient-to-br ${member.avatarBg} p-[3px] flex items-center justify-center shadow-lg`}>
                      <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                        <span className="text-brand text-xl font-display font-extrabold tracking-wider">
                          {member.avatarInitials}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Name and position */}
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-bold text-gray-900 tracking-tight transition-colors group-hover:text-brand">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-brand font-semibold uppercase tracking-wider">
                      {member.position}
                    </p>
                  </div>

                  {/* Description biography */}
                  <p className="text-gray-600 font-light text-xs leading-relaxed max-w-[240px] mx-auto min-h-[4.5rem]">
                    {member.description}
                  </p>
                </div>

                {/* LinkedIn button & action row */}
                <div className="pt-6 mt-6 border-t border-gray-100 w-full flex flex-col items-center gap-2.5 relative z-10">
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-xl bg-gray-50 hover:bg-[#0A66FF] border border-gray-200 hover:border-transparent text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                    title={`Connect with ${member.name} on LinkedIn`}
                  >
                    <Linkedin className="h-4.5 w-4.5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-[11px] font-mono text-gray-600 hover:text-brand transition-colors"
                  >
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          VIBE CODING WITH AI — COURSE LANDING SECTION
      ════════════════════════════════════════════════════ */}
      <section id="vibe-coding" className="relative py-0 scroll-mt-20 border-t border-gray-100 bg-white">

        {/* COURSE HERO BANNER */}
        <div className="relative bg-gradient-to-br from-white via-surface-soft to-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-brand/5 rounded-full blur-[140px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-brand-accent/5 rounded-full blur-[100px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest bg-brand/10 border border-brand/20 text-brand px-3 py-1.5 rounded-full">
                    <span className="h-1.5 w-1.5 bg-brand rounded-full inline-block" />
                    New Course 2026
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest bg-gray-100 border border-gray-250 text-gray-700 px-3 py-1.5 rounded-full">
                    🎓 Industry Certificate
                  </span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  Vibe Coding{" "}
                  <span className="bg-gradient-to-r from-brand to-brand-accent bg-clip-text text-transparent">
                    with AI
                  </span>
                </h2>

                <p className="text-gray-650 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                  Learn to build real applications faster using AI coding tools like Claude Code and Gemini.
                  Master prompt engineering, automation, multi-agent workflows, and ship production-ready
                  projects — even if you are a complete beginner.
                </p>

                <p className="text-sm text-gray-600 font-mono">
                  <span className="text-brand font-semibold">Updated:</span> 07/2026 &nbsp;&middot;&nbsp;
                  <span className="text-brand font-semibold">Duration:</span> 1.5 Months (68 Hours) &nbsp;&middot;&nbsp;
                  <span className="text-brand font-semibold">6</span> Upcoming Batches
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    id="vibe-enroll-btn"
                    onClick={() => {
                      setConsultSector("Education");
                      setConsultMessage("I am interested in enrolling in the Vibe Coding with AI course. Please share available batch schedules and fee details.");
                      setConsultModalOpen(true);
                    }}
                    className="bg-brand hover:bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-brand/10 flex items-center justify-center gap-2 cursor-pointer border-none ring-pulse"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Enroll Now — Select Batch</span>
                  </button>
                  <a
                    href="#vibe-curriculum"
                    className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-brand hover:text-brand text-gray-750 font-medium px-8 py-3.5 rounded-full transition-all text-center text-sm flex items-center justify-center"
                  >
                    View Full Curriculum ↓
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-gray-200 bg-white p-8 space-y-5 shadow-lg shadow-gray-100/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-brand/10 flex items-center justify-center">
                      <Award className="h-4 w-4 text-brand" />
                    </div>
                    <span className="font-display font-bold text-gray-900">Course Highlights</span>
                  </div>
                  {[
                    { icon: "🤖", text: "Claude Code, Gemini CLI and Cursor IDE mastery" },
                    { icon: "🏗️", text: "Build full-stack authenticated REST APIs" },
                    { icon: "⚛️", text: "Production-ready React front-end apps" },
                    { icon: "🔗", text: "Model Context Protocol (MCP) integration" },
                    { icon: "🤝", text: "Multi-agent orchestration workflows" },
                    { icon: "🎓", text: "Industry certificate upon completion" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-lg leading-none mt-0.5 shrink-0">{item.icon}</span>
                      <span className="text-sm text-gray-700 font-light leading-snug">{item.text}</span>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-600 font-mono text-center">
                      Taught in <span className="text-brand font-semibold">Nepali and English</span> · Hands-on projects every week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="bg-surface-soft border-y border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {VIBE_STATS.map((stat) => (
                <div key={stat.id} className="space-y-1">
                  <div className="font-display text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-brand to-brand-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-600 font-semibold uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OVERVIEW + SKILLS */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <span className="section-badge">Course Overview</span>
                <h3 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight mt-3">
                  Learn Smarter, Build Faster with AI Tools
                </h3>
                <p className="text-gray-650 leading-relaxed font-light font-sans">
                  The best developers do not just write code — they know how to think, adapt, and build faster than everyone else.
                  <strong className="text-brand font-semibold"> Vibe Coding with AI</strong> is a hands-on training program designed
                  for the AI era. This is not about replacing your skills. It is about multiplying them.
                </p>
                <p className="text-gray-655 leading-relaxed font-light font-sans">
                  You will go from understanding how large language models work to using Claude Code like a powerful development partner.
                  Along the way you will learn prompting, custom commands, intelligent automation, multi-agent workflows, scalable
                  architecture, and the Model Context Protocol to connect AI with external tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => { setConsultSector("Education"); setConsultMessage("Please share the full Vibe Coding with AI syllabus."); setConsultModalOpen(true); }}
                    className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 text-brand hover:bg-brand/20 text-sm font-semibold px-6 py-3 rounded-full transition-all cursor-pointer"
                  >
                    <FileText className="h-4 w-4" />
                    Download Syllabus
                  </button>
                  <button
                    onClick={() => { setConsultSector("Education"); setConsultMessage("I want to inquire about the Vibe Coding with AI course."); setConsultModalOpen(true); }}
                    className="inline-flex items-center gap-2 border border-gray-200 hover:border-brand hover:text-brand text-gray-700 text-sm font-medium px-6 py-3 rounded-full transition-all cursor-pointer bg-transparent"
                  >
                    <Mail className="h-4 w-4" />
                    Send Inquiry
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <span className="section-badge">Skills You Will Learn</span>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {VIBE_SKILLS.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-soft border border-gray-200 hover:border-brand hover:bg-brand/5 transition-all group">
                      <span className="text-xl shrink-0">{skill.icon}</span>
                      <span className="text-xs text-gray-700 font-semibold leading-snug group-hover:text-brand transition-colors">{skill.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6-WEEK CURRICULUM */}
        <div id="vibe-curriculum" className="bg-surface-soft py-20 scroll-mt-20 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="section-badge mb-3 block text-center">Full Curriculum</span>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">6-Week Learning Journey</h3>
              <p className="text-gray-600 mt-3 font-sans font-light">Every week is packed with practical sessions, real project milestones, and mentor-led code reviews.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIBE_MODULES.map((mod, idx) => (
                <div key={mod.id} id={`vibe-module-${mod.id}`} className="rounded-2xl border border-gray-200 bg-white p-7 flex flex-col gap-4 hover:border-brand/40 hover:shadow-md transition-all duration-300 group shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-full">{mod.week}</span>
                    <span className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 font-display font-bold text-sm group-hover:bg-brand/10 group-hover:text-brand transition-colors">{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <h4 className="font-display text-base font-bold text-gray-900 leading-snug">{mod.title}</h4>
                  <ul className="space-y-2">
                    {mod.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-655 font-sans font-light">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-brand/20 bg-gradient-to-r from-brand/10 via-brand/5 to-transparent p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                <Award className="h-8 w-8 text-brand" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-display font-bold text-gray-900 text-lg mb-1">Earn a High-Value Industry Certificate</h4>
                <p className="text-sm text-gray-600 font-sans font-light">Add this credential to your LinkedIn profile, resume, or CV to stand out to recruiters across Nepal and globally.</p>
              </div>
              <button onClick={() => { setConsultSector("Education"); setConsultMessage("I want to inquire about the Vibe Coding certificate."); setConsultModalOpen(true); }} className="shrink-0 bg-brand hover:bg-brand-accent text-white font-semibold text-sm px-6 py-3 rounded-full transition-all cursor-pointer border-none shadow-md shadow-brand/10">
                Get Certified
              </button>
            </div>
          </div>
        </div>

        {/* UPCOMING SCHEDULES */}
        <div className="bg-white py-20 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-badge mb-3 block">Upcoming Classes</span>
              <h3 className="font-display text-3xl font-extrabold text-gray-900 mt-3">Choose Your Batch Schedule</h3>
              <p className="text-gray-600 mt-2 font-sans font-light">6 upcoming batches — Morning, Evening, and Night options available.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VIBE_SCHEDULES.map((sch) => (
                <div key={sch.id} id={`schedule-${sch.id}`} className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4 hover:border-brand/35 hover:shadow-md transition-all group shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-brand bg-brand/10 border border-brand/20 px-2.5 py-1 rounded-full">{sch.tag}</span>
                    <Calendar className="h-4 w-4 text-gray-600 group-hover:text-brand transition-colors" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-gray-900">{sch.date}</p>
                    <p className="text-xs text-gray-600 font-mono mt-0.5">{sch.day}</p>
                  </div>
                  <div className="space-y-1.5">
                    {sch.times.map((t, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-600 font-sans">
                        <span className="h-1.5 w-1.5 bg-brand rounded-full shrink-0" />
                        {t}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => { setConsultSector("Education"); setConsultMessage(`I would like to enroll in the Vibe Coding with AI batch starting ${sch.date} (${sch.times.join(", ")}).`); setConsultModalOpen(true); }}
                    className="w-full mt-2 border border-gray-200 hover:border-brand hover:bg-brand text-gray-605 hover:text-white text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer bg-transparent"
                  >
                    Select This Batch →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SUCCESS STORIES */}
        <div className="bg-surface-soft py-20 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-badge mb-3 block">Success Stories</span>
              <h3 className="font-display text-3xl font-extrabold text-gray-900 mt-3">Hear From Our Graduates</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VIBE_SUCCESS_STORIES.map((story) => (
                <div key={story.id} className="rounded-2xl border border-gray-200 bg-white p-7 space-y-4 hover:border-brand/30 hover:shadow-md transition-all shadow-sm">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${story.gradient} flex items-center justify-center font-display font-black text-white text-lg shadow-md`}>
                    {story.initial}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900">{story.name}</h4>
                    <p className="text-xs text-brand font-mono mt-0.5">{story.position}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{story.company}</p>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600 border-t border-gray-100 pt-4 font-sans font-light">
                    <p><span className="text-gray-600">Course: </span>{story.course}</p>
                    <p><span className="text-gray-600">Education: </span>{story.college}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* QUICK CTA */}
        <div className="bg-white py-16 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">Ready to Start Your AI Coding Journey?</h3>
            <p className="text-gray-600 font-sans font-light">Our syllabus covers only the major module headlines. For a complete walkthrough and to customize the course, book a free counseling session today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                id="vibe-quick-inquire"
                onClick={() => { setConsultSector("Education"); setConsultMessage("Quick inquiry about Vibe Coding with AI course."); setConsultModalOpen(true); }}
                className="bg-brand hover:bg-brand-accent text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-brand/10 flex items-center justify-center gap-2 ring-pulse cursor-pointer border-none"
              >
                <Send className="h-4 w-4" />
                Send Quick Inquiry
              </button>
              <a href="#vibe-curriculum" className="bg-white border border-gray-200 hover:border-brand hover:text-brand text-gray-755 font-medium px-8 py-4 rounded-full transition-all text-center flex items-center justify-center gap-2">
                <BookOpen className="h-4 w-4" />
                Review Curriculum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION WITH FORM INQUIRY SUBMISSIONS */}
      <section id="contact" className="py-24 bg-surface-soft border-t border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Informative column details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="section-badge">
                  Let's Collaborate
                </span>
                <h2 className="font-display text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mt-3">
                  Get In Touch
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Interested in AI training, AI solutions, partnerships or consulting? Contact our team.
                </p>
              </div>

              {/* Display Team Contacts explicitly */}
              <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-4 shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-brand font-mono">
                  Direct Team Contacts
                </h3>
                <div className="space-y-3 text-xs text-gray-600">
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs">Uday Ram Jaishi</h4>
                      <p className="text-[10px] text-gray-600">Chief Executive Officer (CEO)</p>
                    </div>
                    <a href="mailto:uday@safalai.org" className="text-brand hover:underline font-mono text-[10px]">
                      uday@safalai.org
                    </a>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs">Ishwor Dhungana</h4>
                      <p className="text-[10px] text-gray-600">Lead AI Trainer</p>
                    </div>
                    <a href="mailto:ishwor@safalai.org" className="text-brand hover:underline font-mono text-[10px]">
                      ishwor@safalai.org
                    </a>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs">Kamram Muazzam</h4>
                      <p className="text-[10px] text-gray-600">AI Solution Engineer</p>
                    </div>
                    <a href="mailto:kamram@safalai.org" className="text-brand hover:underline font-mono text-[10px]">
                      kamram@safalai.org
                    </a>
                  </div>
                </div>
              </div>

              {/* Details stack */}
              <div className="space-y-4" id="contact-info-list font-sans">
                
                <div className="flex gap-3.5 items-start">
                  <div className="h-10 w-10 bg-brand/10 border border-brand/20 text-brand flex items-center justify-center rounded-xl shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-600 block uppercase tracking-wider font-semibold">Email Address</span>
                    <a href="mailto:info@safalai.org" className="text-sm font-semibold text-gray-900 hover:text-brand transition-colors">
                      info@safalai.org
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="h-10 w-10 bg-brand/10 border border-brand/20 text-brand flex items-center justify-center rounded-xl shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-600 block uppercase tracking-wider font-semibold">Phone Number</span>
                    <a href="tel:+97714455667" className="text-sm font-semibold text-gray-900 hover:text-brand transition-colors">
                      +977 1 4455667
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="h-10 w-10 bg-brand/10 border border-brand/20 text-brand flex items-center justify-center rounded-xl shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-600 block uppercase tracking-wider font-semibold">Office Location</span>
                    <p className="text-sm font-semibold text-gray-900 leading-normal">
                      Level 3, Star Complex, Putalisadak, Kathmandu, Nepal
                    </p>
                  </div>
                </div>

              </div>

              {/* Embedded Social link grids */}
              <div className="space-y-3 pt-4 border-t border-gray-150">
                <span className="text-xs font-mono text-gray-600 block uppercase font-semibold">Connect &amp; Follow Us</span>
                <div className="flex gap-3" id="social-links-grid">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="h-10 w-10 bg-white hover:bg-[#0A66FF] hover:border-transparent border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-white transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4.5 w-4.5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="h-10 w-10 bg-white hover:bg-[#1877F2] hover:border-transparent border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-white transition-all"
                    title="Facebook"
                  >
                    <Facebook className="h-4.5 w-4.5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="h-10 w-10 bg-white hover:bg-[#E4405F] hover:border-transparent border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-white transition-all"
                    title="Instagram"
                  >
                    <Instagram className="h-4.5 w-4.5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="h-10 w-10 bg-white hover:bg-[#FF0000] hover:border-transparent border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-white transition-all"
                    title="YouTube"
                  >
                    <Youtube className="h-4.5 w-4.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form column */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-gray-200 shadow-lg relative overflow-hidden">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-6 tracking-tight">
                Submit an Inquiry Blueprint
              </h3>

              {contactSuccessMsg ? (
                <div className="bg-emerald-50 border border-emerald-250 p-6 rounded-2xl text-emerald-800 space-y-3" id="contact-success-box">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                  <h4 className="font-display text-base font-bold">Inquiry Record Generated Successfully</h4>
                  <p className="text-sm font-light text-emerald-700 leading-relaxed">
                    {contactSuccessMsg}
                  </p>
                  <button
                    onClick={() => setContactSuccessMsg(null)}
                    className="text-xs font-mono text-emerald-600 underline font-semibold mt-2 block pointer-events-auto cursor-pointer bg-transparent border-none"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5" id="contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="contact-name">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Binod Acharya"
                        className="w-full bg-white border border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand transition-all placeholder:text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="contact-org">
                        Organization
                      </label>
                      <input
                        id="contact-org"
                        type="text"
                        required
                        value={contactOrg}
                        onChange={(e) => setContactOrg(e.target.value)}
                        placeholder="e.g., CDC Board, Elite Academy"
                        className="w-full bg-white border border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="contact-email">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="name@organization.org"
                        className="w-full bg-white border border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand transition-all placeholder:text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="contact-phone">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="text"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="e.g. +977 9851000000"
                        className="w-full bg-white border border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="contact-msg">
                      Message
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={5}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Detail what localized AI models, capacity training bootcamps, or workflow automation integrations your administration is researching."
                      className="w-full bg-white border border-gray-200 focus:bg-white rounded-xl p-4 text-sm text-gray-900 focus:outline-none focus:border-brand transition-all placeholder:text-gray-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full bg-brand hover:bg-brand-accent disabled:bg-gray-400 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-brand/10 flex items-center justify-center gap-2 cursor-pointer border-none"
                  >
                    <span>Send Inquiry</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-dark-primary dark-section text-gray-700 py-16 border-t border-white/10 relative z-20" id="full-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Column 1 Logo */}
            <div className="md:col-span-4 space-y-4">
              <a href="#hero" className="flex items-center gap-2 group">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand to-brand-accent flex items-center justify-center font-bold text-white text-base shadow-sm">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-display text-lg font-bold tracking-tight text-white block">
                    SAFAL <span className="text-brand-accent">AI</span>
                  </span>
                  <span className="text-[9px] text-gray-600 font-mono tracking-wider block uppercase">
                    &amp; Innovation Centre
                  </span>
                </div>
              </a>
              <p className="text-xs text-slate-450 leading-relaxed font-light">
                Empowering Nepal Through Artificial Intelligence. Deploying curriculum-aligned educational systems, robust customized business workflows, and inclusive public governance templates nationwide.
              </p>
              <div className="text-[11px] text-gray-600 font-mono">
                <span>EST: 2026</span>
              </div>
            </div>

            {/* Column 2 Services */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-display text-xs font-bold text-white tracking-widest uppercase">
                Solutions Scope
              </h4>
              <ul className="space-y-2 text-xs font-light text-gray-600">
                <li><a href="#solutions" className="hover:text-brand transition-colors block">AI Instruction &amp; Training</a></li>
                <li><a href="#solutions" className="hover:text-brand transition-colors block">Workflow Automations</a></li>
                <li><a href="#solutions" className="hover:text-brand transition-colors block">Product Engineering</a></li>
                <li><a href="#solutions" className="hover:text-brand transition-colors block">Feasibility Consulting</a></li>
                <li><a href="#solutions" className="hover:text-brand transition-colors block">Targeted Research</a></li>
              </ul>
            </div>

            {/* Column 3 Products */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-display text-xs font-bold text-white tracking-widest uppercase">
                Our Products
              </h4>
              <ul className="space-y-2 text-xs font-light text-gray-600">
                <li><a href="#products" className="hover:text-brand transition-colors block">SAFAL Teacher AI <span className="text-[9px] text-brand bg-brand/10 border border-brand/20 px-1 rounded ml-1 font-mono uppercase">Beta</span></a></li>
                <li><span className="text-gray-600 block">SAFAL Business AI</span></li>
                <li><span className="text-gray-600 block">SAFAL Municipal AI</span></li>
                <li><a href="#sandbox" className="hover:text-brand transition-colors block">CDC-Aligned Sandbox</a></li>
              </ul>
            </div>

            {/* Column 4 Training */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-display text-xs font-bold text-white tracking-widest uppercase">
                Training Stream
              </h4>
              <ul className="space-y-2 text-xs font-light text-gray-600">
                <li><a href="#training" className="hover:text-brand transition-colors block">AI For Educators</a></li>
                <li><a href="#training" className="hover:text-brand transition-colors block">AI For Students</a></li>
                <li><a href="#training" className="hover:text-brand transition-colors block">AI For Professionals</a></li>
                <li><a href="#training" className="hover:text-brand transition-colors block">AI For Public Teams</a></li>
              </ul>
            </div>

            {/* Column 5 Quick links */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-display text-xs font-bold text-white tracking-widest uppercase">
                Company Hub
              </h4>
              <ul className="space-y-2 text-xs font-light text-gray-600">
                <li><a href="#about" className="hover:text-brand transition-colors block">About Our Mission</a></li>
                <li><a href="#research" className="hover:text-brand transition-colors block">Innovation Lab</a></li>
                <li><a href="#contact" className="hover:text-brand transition-colors block">Contact Lab Desk</a></li>
                <li><button onClick={() => setConsultModalOpen(true)} className="hover:text-brand transition-colors block text-left bg-transparent border-none p-0 cursor-pointer">Register Booking</button></li>
              </ul>
            </div>

          </div>

          {/* Under footer lines */}
          <div className="border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-600">
            <div>
              <span>© 2026 SAFAL AI &amp; Innovation Centre. All Rights Reserved.</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-600 italic font-sans text-xs flex items-center justify-center gap-1">Empowering Nepal Through Artificial Intelligence.</span>
            </div>
          </div>

        </div>
      </footer>


      {/* BOOK CONSULTATION MODAL / DIALOG */}
      {consultModalOpen && (
        <div
          id="consultation-modal-backdrop"
          className="fixed inset-0 bg-[#0B1020]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <div
            id="consultation-modal-card"
            className="w-full max-w-lg bg-[#0D1527] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]"
          >
            {/* Header banner */}
            <div className="bg-[#0B1020] dark-section p-6 text-white relative border-b border-white/10">
              <button
                id="close-consult-modal"
                onClick={() => setConsultModalOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-white p-1 rounded-full bg-white/5 cursor-pointer border-none"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center gap-2 bg-brand/10 border border-brand/20 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider w-fit uppercase text-brand mb-2">
                <Calendar className="h-3.5 w-3.5" />
                <span>Strategic Booking Queue</span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-1">
                Book Consultation
              </h3>
              <p className="text-gray-700 text-xs font-light">
                Secure a structured 30-minute integration review call with SAFAL educational and automation leads.
              </p>
            </div>

            {/* Form scroll block */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
              {consultSuccessMsg ? (
                <div className="p-6 bg-[#00C853]/10 border border-[#00C853]/25 rounded-2xl text-[#00C853] space-y-3" id="modal-success-box">
                  <CheckCircle2 className="h-10 w-10 text-brand-accent" />
                  <h4 className="font-display text-base font-bold">Consultation Interest Logged</h4>
                  <p className="text-xs font-light text-slate-100 leading-relaxed">
                    {consultSuccessMsg}
                  </p>
                  <button
                    onClick={() => {
                      setConsultSuccessMsg(null);
                      setConsultModalOpen(false);
                    }}
                    className="w-full bg-[#0A66FF] text-white py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold pointer-events-auto cursor-pointer border-none"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookConsultation} className="space-y-4" id="consultation-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="consult-name">
                        Your Full Name
                      </label>
                      <input
                        id="consult-name"
                        type="text"
                        required
                        value={consultName}
                        onChange={(e) => setConsultName(e.target.value)}
                        placeholder="e.g., Sunil Sharma"
                        className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand placeholder:text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="consult-email">
                        Your Professional Email
                      </label>
                      <input
                        id="consult-email"
                        type="email"
                        required
                        value={consultEmail}
                        onChange={(e) => setConsultEmail(e.target.value)}
                        placeholder="sunil@academy.edu.np"
                        className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="consult-org">
                        Organization / Authority
                      </label>
                      <input
                        id="consult-org"
                        type="text"
                        required
                        value={consultOrg}
                        onChange={(e) => setConsultOrg(e.target.value)}
                        placeholder="e.g. Lalitpur Ward office, Zenith School"
                        className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand placeholder:text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="consult-phone">
                        Phone Contact Coordinate
                      </label>
                      <input
                        id="consult-phone"
                        type="text"
                        required
                        value={consultPhone}
                        onChange={(e) => setConsultPhone(e.target.value)}
                        placeholder="+977-9800000000"
                        className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="consult-sector-select">
                      Primary sector focus
                    </label>
                    <select
                      id="consult-sector-select"
                      value={consultSector}
                      onChange={(e) => setConsultSector(e.target.value)}
                      className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand cursor-pointer"
                    >
                      <option value="Education">Academic Integration (Schools &amp; Colleges)</option>
                      <option value="Enterprise">Enterprise Workspace (SMEs, Startups)</option>
                      <option value="Government">Public Civil Administration (Municipalities)</option>
                      <option value="NGO/INGO">Non-profit/INGOs Community Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-600 mb-1" htmlFor="consult-msg">
                      What target challenge is your team targeting?
                    </label>
                    <textarea
                      id="consult-msg"
                      rows={4}
                      value={consultMessage}
                      onChange={(e) => setConsultMessage(e.target.value)}
                      placeholder="Briefly share any special workflows or curricula goals you intend to transform."
                      className="w-full bg-[#0B1020] border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-brand resize-none placeholder:text-gray-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={consultSubmitting}
                    className="w-full bg-brand hover:bg-brand-light disabled:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border-none ring-pulse"
                  >
                    <span>Request Placement Slot</span>
                    <Calendar className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}


      {/* FLOATING AI CHATBOT SYSTEM */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none select-none">
        {chatOpen ? (
          <div
            id="chatbot-drawer"
            className="w-80 sm:w-96 max-w-[calc(100vw-2rem)] h-[480px] bg-dark-secondary dark-section rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden pointer-events-auto transition-all duration-300 transform scale-100 opacity-100"
          >
            {/* Header branding */}
            <div className="bg-[#0B1020] px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-xl bg-brand/20 border border-brand/35 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-brand-accent" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-brand-accent border-2 border-dark-primary" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white leading-tight">
                    SAFAL AI Mitra
                  </h4>
                  <span className="text-[10px] text-gray-600 font-mono tracking-wider uppercase flex items-center gap-1">
                    <span>Virtual Advisor</span>
                  </span>
                </div>
              </div>
              <button
                id="close-chatbot"
                onClick={() => setChatOpen(false)}
                className="text-gray-600 hover:text-white p-1 rounded-full hover:bg-white/5 transition-all cursor-pointer border-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Suggested Chip list (Shortcut triggers) */}
            <div className="p-3 bg-[#070b16] border-b border-white/5 flex gap-1.5 overflow-x-auto select-none no-scrollbar">
              <button
                onClick={() => handleSendChatMessage(undefined, "Tell me about SAFAL Teacher AI and our sandbox")}
                className="text-[10px] shrink-0 bg-white/5 border border-white/10 hover:border-[#0A66FF] hover:bg-[#0A66FF]/10 text-slate-200 px-2.5 py-1 rounded-lg font-mono transition-all cursor-pointer"
              >
                💡 Teacher AI &amp; Sandbox
              </button>
              <button
                onClick={() => handleSendChatMessage(undefined, "What kinds of training courses do we offer?")}
                className="text-[10px] shrink-0 bg-white/5 border border-white/10 hover:border-[#0A66FF] hover:bg-[#0A66FF]/10 text-slate-200 px-2.5 py-1 rounded-lg font-mono transition-all cursor-pointer"
              >
                📚 AI Certifications
              </button>
              <button
                onClick={() => {
                  setChatOpen(false);
                  setConsultModalOpen(true);
                }}
                className="text-[10px] shrink-0 bg-[#00C853]/10 border border-[#00C853]/20 hover:border-[#00C853] text-[#00C853] px-2.5 py-1 rounded-lg font-mono transition-all cursor-pointer flex items-center gap-1"
              >
                📅 Book Consultation
              </button>
            </div>

            {/* Chat viewport */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#0A1020]/20 scroll-mt-2 flex flex-col">
              {chatMessages.map((msg, idx) => {
                const isAI = msg.role === "assistant";
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 ${isAI ? "justify-start" : "justify-end"}`}
                  >
                    {isAI && (
                      <div className="h-7 w-7 rounded-lg bg-brand/10 text-brand-accent shrink-0 flex items-center justify-center font-bold text-xs border border-brand/20">
                        स
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs font-light leading-relaxed ${
                        isAI
                          ? "bg-white/[0.04] text-slate-200 rounded-tl-none border border-white/5"
                          : "bg-brand text-white rounded-tr-none"
                      }`}
                    >
                      <div className="markdown-body text-xs text-left">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    </div>
                  </div>
                );
              })}
              {chatLoading && (
                <div className="flex items-center gap-2 text-gray-600 text-[10px] font-mono pl-9 py-2">
                  <Loader2 className="h-3 w-3 animate-spin text-brand" />
                  <span>Mitra is synthesizing responses...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Text entry board */}
            <form
              onSubmit={handleSendChatMessage}
              className="p-3 bg-[#0B1020] border-t border-white/10 flex items-center gap-1.5"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask SAFAL AI Mitra..."
                className="flex-1 bg-white/5 border border-white/5 focus:border-[#0A66FF] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none placeholder:text-gray-600 font-light"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || chatLoading}
                className="h-8 w-8 rounded-xl bg-brand hover:bg-brand-light disabled:bg-white/5 disabled:text-gray-600 text-white flex items-center justify-center transition-all cursor-pointer border-none shadow-md"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <button
            id="open-chatbot"
            onClick={() => setChatOpen(true)}
            className="pointer-events-auto h-12 w-fit px-4 rounded-full bg-brand hover:bg-brand-light shadow-2xl shadow-brand/20 flex items-center gap-2 text-white transition-all duration-300 transform scale-100 hover:scale-105 active:scale-95 border-none cursor-pointer ring-pulse"
          >
            <div className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#00C853] border-2 border-[#0A66FF]" />
            </div>
            <span className="text-xs font-mono tracking-wider font-semibold uppercase shrink-0">SAFAL Mitra</span>
          </button>
        )}
      </div>

    </div>
  );
}
