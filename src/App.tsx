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
  ArrowUp,
  Award,
  Globe,
  FileText,
  Minus,
  Plus,
  ArrowLeft,
  Code,
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
import safalLogo from "./images/org/logo.png";

export default function App() {
  // Language state - default English
  const [language, setLanguage] = useState<"en" | "ne">("en");

  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  // Client-side Router state
  const [path, setPath] = useState(window.location.pathname);

  // Navigate helper
  const navigate = (newPath: string) => {
    window.history.pushState({}, "", newPath);
    setPath(newPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Smooth nav click handler supporting across-page scrolling
  const handleNavClick = (sectionId: string) => {
    if (path !== "/") {
      window.history.pushState({}, "", "/");
      setPath("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // Listen to popstate for back button navigation
  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // General Interactive States
  const [activeTestimonialCategory, setActiveTestimonialCategory] = useState<
    "Teacher" | "Professional" | "Organization"
  >("Teacher");
  const [activePartnerFilter, setActivePartnerFilter] = useState<
    "All" | "School" | "College" | "Municipality" | "Enterprise"
  >("All");

  // Tabbed sections states
  const [solutionsTab, setSolutionsTab] = useState<"solutions" | "industries">("solutions");
  const [learningTab, setLearningTab] = useState<"training" | "research">("training");
  const [activeSection, setActiveSection] = useState("hero");
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedSyllabusProg, setSelectedSyllabusProg] = useState<any>(null);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [activeWeekAccordion, setActiveWeekAccordion] = useState<string | null>("vm-01");

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
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#solutions") {
        setSolutionsTab("solutions");
      } else if (hash === "#industries") {
        setSolutionsTab("industries");
      } else if (hash === "#training") {
        setLearningTab("training");
      } else if (hash === "#research") {
        setLearningTab("research");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const sections = ["hero", "solutions", "products", "training", "vibe-coding", "about", "team", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        content: "I'm having a bit of trouble communicating with my neural network right now. Please try again in a moment, or feel free to email our support coordinate at **info@safalai.com.np**."
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
      // Show top button when scrolled down more than 500px
      setShowTopButton(window.scrollY > 500);
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

  const sandboxLoading = demoLoading;
  const compiledResult = demoResult;
  const handleTriggerSandbox = handleGenerateTeacherAI;

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
      badge: language === "en" ? "Nepal's Premier AI Catalyst | Safal AI" : "नेपालको प्रमुख AI उत्प्रेरक | Sfal AI",
      title: language === "en" ? "Building Nepal's" : "नेपालको निर्माण",
      titleAccent: language === "en" ? "AI Future" : "AI भविष्य",
      description: language === "en"
        ? "Safal AI (Sfal AI) is Nepal's leading AI company. We provide industry-standard corporate training, curriculum-aligned AI for teachers, custom workflow automation, and digital transformations for enterprises and schools across Nepal."
        : "सफल AI (Sfal AI) नेपालको अग्रणी AI कम्पनी हो। हामी विद्यालयहरू र व्यवसायहरूलाई AI तालिम (Corporate Training), शिक्षकहरूको लागि AI शिक्षण उपकरण (AI for Teachers), र प्रक्रिया स्वचालन (Automation Solutions) मार्फत डिजिटल रूपान्तरण गर्न मद्दत गर्छौं।",
      cta1: language === "en" ? "Explore Solutions" : "समाधान अन्वेषण गर्नुहोस्",
      cta2: language === "en" ? "Book Consultation" : "परामर्श बुक गर्नुहोस्"
    },
    nav: {
      home: language === "en" ? "Home" : "गृहपृष्ठ",
      products: language === "en" ? "Products" : "उत्पादनहरू",
      vibe: language === "en" ? "Vibe Coding" : "Vibe कोडिङ",
      about: language === "en" ? "About" : "बारेमा",
      contact: language === "en" ? "Contact" : "सम्पर्क"
    },
    solutions: {
      title: language === "en" ? "Our Solutions" : "हाम्रो समाधानहरू",
      description: language === "en" ? "Comprehensive AI-powered tools for Nepal's educational and business sectors" : "नेपालको शिक्षा र व्यावसायिक क्षेत्रका लागि व्यापक AI-संचालित उपकरणहरू"
    },
    products: {
      title: language === "en" ? "Flagship Products" : "मुख्य उत्पादनहरू",
      description: language === "en" ? "Advanced AI solutions tailored for Nepalese institutions" : "नेपाली संस्थाहरूका लागि विशेष गरी तैयार गरिएको उन्नत AI समाधान"
    },
    whyChoose: {
      title: language === "en" ? "Why Choose Safal AI" : "किन Safal AI छनौट गर्नुहोस्",
      description: language === "en" ? "We understand Nepal's unique challenges and opportunities" : "हामी नेपालको अद्वितीय चुनौती र अवसरहरू बुझ्छौं"
    },
    industries: {
      title: language === "en" ? "Industries We Serve" : "हामी सेवा गर्ने उद्योगहरू",
      description: language === "en" ? "Education, Government, Healthcare, Private Sector, and Non-profits" : "शिक्षा, सरकार, स्वास्थ्य, निजी क्षेत्र र गैर-लाभकारी संस्था"
    },
    caseStudies: {
      title: language === "en" ? "Success Stories from Nepal" : "नेपालका सफलताका कहानीहरू",
      description: language === "en" ? "Real implementations making real impact" : "वास्तविक कार्यान्वयन वास्तविक प्रभाव सृष्टि गर्दै"
    },
    research: {
      title: language === "en" ? "Research & Innovation" : "अनुसन्धान र नवीनता",
      description: language === "en" ? "Advancing AI for Nepalese context and culture" : "नेपाली प्रसंग र संस्कृतिको लागि AI को विकास"
    },
    training: {
      title: language === "en" ? "Training Programs" : "प्रशिक्षण कार्यक्रमहरू",
      description: language === "en" ? "Build AI skills for Nepal's workforce" : "नेपालको कार्यबलको लागि AI कौशल विकास गर्नुहोस्"
    },
    about: {
      title: language === "en" ? "About Safal AI" : "Safal AI बारेमा",
      description: language === "en" ? "Empowering Nepal through Artificial Intelligence" : "कृत्रिम बुद्धिमत्ताको माध्यमबाट नेपाललाई सशक्त बनाउँदै"
    },
    footer: {
      about: language === "en" ? "About" : "बारेमा",
      contact: language === "en" ? "Contact" : "सम्पर्क",
      privacy: language === "en" ? "Privacy" : "गोपनीयता",
      terms: language === "en" ? "Terms" : "शर्तहरू"
    }
  };



  const showcaseImages = [
    {
      src: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop&q=80",
      label: "Teacher Enablement",
      caption: "AI training that feels practical inside real classrooms."
    },
    {
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&auto=format&fit=crop&q=80",
      label: "Digital Workflows",
      caption: "Automation systems for teams that need speed and clarity."
    },
    {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=80",
      label: "Institution Strategy",
      caption: "Consulting, adoption planning, and measurable rollout support."
    }
  ];

  const industryImages = [
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?w=600&auto=format&fit=crop&q=80"
  ];

  const renderNotFoundPage = () => {
    return (
      <div className="flex-1 bg-white flex flex-col items-center justify-center py-36 px-4 text-center">
        <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <HelpCircle className="h-8 w-8" />
        </div>
        <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Page Not Found</h2>
        <p className="text-gray-600 text-sm max-w-md mb-8">The link or route you requested might have been moved or does not exist. Let's return back to the main workspace.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-brand hover:bg-brand-light text-white font-semibold px-8 py-3 rounded-full transition-all border-none cursor-pointer"
        >
          Go Back Home
        </button>
      </div>
    );
  };

  const renderVibeCodingPage = () => {
    return (
      <div className="bg-white flex-1 animate-fade-in">
        {/* Course Hero Banner */}
        <div className="relative bg-gradient-to-br from-white via-[#f5f5f7] to-white pt-36 pb-20 overflow-hidden border-b border-gray-250">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-green-400/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-brand/5 rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest bg-emerald-50 border border-emerald-200 text-brand px-3 py-1.5 rounded-full shadow-xs">
                    <span className="h-1.5 w-1.5 bg-brand rounded-full inline-block animate-pulse" />
                    New Course 2026
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest bg-emerald-50/80 border border-emerald-200 text-slate-700 px-3 py-1.5 rounded-full shadow-xs">
                    🎓 Industry Certificate Included
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  Vibe Coding <br />
                  <span className="text-gradient-green">with AI</span>
                </h1>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                  Learn to build real-world software applications faster using cutting-edge AI coding assistants like Claude Code and Gemini CLI. Master prompt engineering, multi-agent frameworks, and ship production-ready projects in days rather than months.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <a
                    href="#batches"
                    className="bg-brand hover:bg-brand-light text-white font-semibold px-8 py-3.5 rounded-full transition-all text-center flex items-center justify-center gap-2 group shadow-md hover:scale-105 border-none"
                  >
                    <span>Choose Batch &amp; Enroll</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={() => {
                      setConsultSector("Education");
                      setConsultMessage("I am interested in learning more about the Vibe Coding course.");
                      setConsultModalOpen(true);
                    }}
                    className="bg-transparent hover:bg-gray-50 border border-gray-250 text-gray-800 font-medium px-8 py-3.5 rounded-full transition-all text-center tracking-wide cursor-pointer text-sm hover:scale-105"
                  >
                    Speak with a Consultant
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative flex justify-center w-full">
                <div className="w-full max-w-[420px] aspect-video sm:aspect-square bg-gray-50 border border-gray-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand font-bold block border-b border-gray-200 pb-2">Program Overview</span>
                    <div className="space-y-3 font-sans">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Duration:</span>
                        <span className="font-semibold text-gray-900">1.5 Months (68 Hours)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Pace:</span>
                        <span className="font-semibold text-gray-900">Intensive Hands-on Lab</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Methodology:</span>
                        <span className="font-semibold text-gray-900">AI-First Pair Programming</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Projects Shipped:</span>
                        <span className="font-semibold text-gray-900">3 Local Implementations</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50/50 border border-green-100 rounded-xl p-4 flex items-center gap-3">
                    <Award className="h-6 w-6 text-brand-accent shrink-0" />
                    <p className="text-[11px] text-gray-700 leading-normal">
                      Earn a digital credential recognized by key technology municipalities and organizations in Kathmandu.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="py-12 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {VIBE_STATS.map((stat, idx) => (
                <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-6 text-center shadow-sm">
                  <p className="text-3xl font-extrabold text-brand-accent mb-1">{stat.value}</p>
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Syllabus Section */}
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="section-badge">6-Week Curriculum</span>
              <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
                Syllabus Built for the Agentic Era
              </h2>
              <p className="text-gray-600 font-light">
                Traditional software bootcamps focus on syntax. We focus on velocity. You'll pair program directly with models to generate code, refactor UI elements, compile packages, and publish live servers.
              </p>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <h4 className="font-display font-semibold text-gray-950 text-sm">Key Technologies Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {["Claude Code", "Gemini API", "Vite JS", "Git / GitHub", "Docker Basics", "Tailwind CSS"].map((tech) => (
                    <span key={tech} className="bg-white text-gray-700 text-xs font-mono border border-gray-200 px-3 py-1 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-gray-950 border-b border-gray-150 pb-4 mb-2">
                Curriculum Weekly Modules
              </h3>
              
              <div className="divide-y divide-gray-100">
                {VIBE_MODULES.map((mod) => {
                  const isOpen = activeWeekAccordion === mod.id;
                  return (
                    <div key={mod.id} className="py-4 last:pb-0">
                      <button
                        onClick={() => setActiveWeekAccordion(isOpen ? null : mod.id)}
                        className="w-full flex items-center justify-between text-left font-display font-bold text-base sm:text-lg text-gray-900 py-2 hover:text-brand-accent transition-colors border-none bg-transparent cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono bg-green-50 text-brand-accent border border-green-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {mod.week}
                          </span>
                          <span>{mod.title}</span>
                        </div>
                        {isOpen ? <Minus className="h-4 w-4 text-gray-400" /> : <Plus className="h-4 w-4 text-gray-400" />}
                      </button>
                      {isOpen && (
                        <div className="mt-3 pl-4 space-y-2 border-l-2 border-brand-accent/30 animate-fade-in">
                          <ul className="space-y-2">
                            {mod.topics.map((topic, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 font-sans font-light">
                                <CheckCircle2 className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Skills Section */}
        <div className="py-24 bg-gray-50 border-y border-gray-250">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="section-badge">Skill Competencies</span>
              <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
                What Competencies You'll Build
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VIBE_SKILLS.map((skill, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white border border-gray-150 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-green-50 text-brand-accent rounded-xl text-xl shrink-0">
                    {skill.icon || "⚡"}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-gray-950 text-base mb-1">{skill.title || skill.label}</h4>
                    <p className="text-sm text-gray-600 font-sans font-light leading-relaxed">{skill.description || "Master production-ready AI workflows and real-world tools integration."}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Batches Schedules Section */}
        <div id="batches" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="section-badge">Upcoming Batches</span>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
              Select Batch Schedule
            </h2>
            <p className="text-gray-600 font-sans font-light">
              We offer Morning, Evening, and Weekend schedules to suit working professionals and university students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIBE_SCHEDULES.map((sch) => (
              <div key={sch.id} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:border-brand-accent/40 hover:shadow-md transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-brand-accent bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">{sch.tag}</span>
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-gray-950">{sch.date}</p>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">{sch.day}</p>
                </div>
                <div className="space-y-1.5">
                  {sch.times.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-605 font-sans">
                      <span className="h-1.5 w-1.5 bg-brand-accent rounded-full shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setConsultSector("Education");
                    setConsultMessage(`I would like to enroll in the Vibe Coding with AI batch starting ${sch.date} (${sch.times.join(", ")}).`);
                    setConsultModalOpen(true);
                  }}
                  className="w-full mt-2 border border-gray-200 hover:border-brand-accent hover:bg-brand-accent text-gray-600 hover:text-white text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer bg-transparent"
                >
                  Select This Batch →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment booking callout */}
        <div className="bg-gray-50 py-20 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h3 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
              Ready to Accelerate Your Career?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto font-sans font-light">
              Bootcamp cohorts are limited to 15 students per batch to ensure deep focused code review and dedicated workspace support. Register your seat early.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  setConsultSector("Education");
                  setConsultMessage("Enrolling in Vibe Coding course.");
                  setConsultModalOpen(true);
                }}
                className="bg-brand hover:bg-brand-light text-white font-semibold px-8 py-3.5 rounded-full transition-all border-none cursor-pointer hover:scale-105 shadow-md shadow-brand/10"
              >
                Book Intake Call
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-white hover:bg-gray-100 border border-gray-250 text-gray-800 font-medium px-8 py-3.5 rounded-full transition-all text-center tracking-wide cursor-pointer text-sm"
              >
                Back to Main Site
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Course Page Footer */}
        <footer className="bg-white py-12 border-t border-gray-200 text-center text-xs font-mono text-gray-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p>© 2026 SAFAL AI and Innovation Centre. Level 3, Star Complex, Putalisadak, Kathmandu.</p>
            <p className="mt-2 text-gray-400">Curriculum and modules are registered and CDC-aligned under Nepal laws.</p>
          </div>
        </footer>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-brand selection:text-white overflow-x-hidden" id="safal-main">
      {/* Subtle top-right green glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[300px] bg-brand/5 rounded-full blur-[120px] -mr-48 -mt-24 pointer-events-none z-0" />

      {/* STICKY HEADER */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
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
                SAFAL <span className="text-brand-accent">AI</span>
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

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-dropdown"
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-black/5 absolute top-full left-0 w-full p-8 space-y-4 shadow-2xl text-center flex flex-col z-50"
          >
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate("/"); }}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Home
            </a>
            <a
              href="#solutions"
              onClick={(e) => { e.preventDefault(); handleNavClick("solutions"); }}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Solutions
            </a>
            <a
              href="#products"
              onClick={(e) => { e.preventDefault(); handleNavClick("products"); }}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Products
            </a>
            <a
              href="#case-studies"
              onClick={(e) => { e.preventDefault(); handleNavClick("case-studies"); }}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Case Studies
            </a>
            <a
              href="#training"
              onClick={(e) => { e.preventDefault(); handleNavClick("training"); }}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Training
            </a>
            <a
              href="/courses/vibe-coding"
              onClick={(e) => { e.preventDefault(); navigate("/courses/vibe-coding"); }}
              className="block text-brand font-semibold text-base py-2 border-b border-gray-100 flex items-center justify-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand inline-block" />
              Vibe Coding with AI
            </a>
            <a
              href="#research"
              onClick={(e) => { e.preventDefault(); handleNavClick("research"); }}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Research
            </a>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); handleNavClick("about"); }}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              About Us
            </a>
            <a
              href="#team"
              onClick={(e) => { e.preventDefault(); handleNavClick("team"); }}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Team
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("contact"); }}
              className="block text-gray-600 hover:text-brand text-base py-2 border-b border-gray-100"
            >
              Contact
            </a>
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

      {path === "/" ? (
        <>


      {/* HERO SECTION — light theme with responsive background */}
      <section
        id="hero"
        className="relative bg-white pt-36 pb-20 overflow-hidden flex flex-col justify-center min-h-[85vh] border-b border-gray-100"
      >
        {/* Particle canvas */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Ambient glows */}
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
                  className="bg-brand text-white hover:bg-brand-light font-semibold px-8 py-3.5 rounded-full transition-all text-center flex items-center justify-center gap-2 group shadow-xl shadow-emerald-600/20 hover:scale-[1.03] active:scale-[0.98] cursor-pointer border-none"
                >
                  <span>{t.hero.cta1}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="bg-white hover:bg-gray-50 border border-gray-250 text-gray-800 font-semibold px-8 py-3.5 rounded-full transition-all text-center tracking-wide cursor-pointer text-sm hover:scale-[1.03] active:scale-[0.98] shadow-xs"
                >
                  {t.hero.cta2}
                </button>
              </div>
            </div>

            {/* Visual Column - Nepali Theme */}
            <div className="xl:col-span-5 relative flex justify-center xl:justify-end">
              <div className="w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden relative group shadow-2xl border-4 border-gray-150 transition-all duration-500">
                {/* Nepali Cultural Background Image */}
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop"
                  alt="Mountains of Nepal"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-110 transition-all duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-brand-accent/20" />

                {/* Animated Floating Elements */}
                <div className="absolute top-8 left-8 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl float-bob border border-brand-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <BookOpen className="h-6 w-6 text-brand-accent" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-xs font-bold text-gray-900">SAFAL Teacher AI</p>
                      <p className="text-[10px] text-gray-500">Instant Lesson Plans</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl float-bob border border-brand-border" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Leaf className="h-6 w-6 text-brand-accent animate-pulse" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">AI for Nepal</p>
                      <p className="text-[10px] text-gray-500">नेपालको लागि AI</p>
                    </div>
                  </div>
                </div>

                {/* Central AI Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-24 w-24 bg-white rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl animate-pulse border-4 border-white">
                    <img src={safalLogo} alt="Safal AI Logo" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* STATISTICS SECTION */}
      <section id="statistics" className="bg-surface-soft py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">

            <div className="p-4" id="stat-trained">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                <span className="text-brand">{stats.trained}+</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 tracking-wide uppercase">
                Professionals Trained
              </p>
            </div>

            <div className="p-4" id="stat-workshops">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                <span className="text-brand">{stats.workshops}+</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 tracking-wide uppercase">
                Workshops Conducted
              </p>
            </div>

            <div className="p-4" id="stat-partners">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                <span className="text-brand">{stats.partners}+</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 tracking-wide uppercase">
                Partner Institutions
              </p>
            </div>

            <div className="p-4" id="stat-impacted">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                <span className="text-brand">{stats.learners}+</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 tracking-wide uppercase">
                Learners Impacted
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* COMBINED SOLUTIONS & INDUSTRIES SECTION */}
      <section id="solutions" className="py-24 bg-surface-muted scroll-mt-10 border-b border-gray-200 relative">
        {/* Extra anchor to allow industries navigation */}
        <div id="industries" className="absolute top-0 left-0 scroll-mt-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12">

            {/* Left Column (Sticky Sidebar on Desktop) */}
            <div className="xl:col-span-4 xl:sticky xl:top-28 h-fit space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
                  Unified Ecosystem
                </span>
                <h2 className="font-display text-3xl xl:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Solutions &amp; Sectors
                </h2>
                <p className="text-gray-600 font-normal text-sm leading-relaxed">
                  We build practical, localized intelligence systems. SAFAL AI is Nepal's core innovation partner building strategic solutions, custom frameworks, and curriculum architectures to empower modern institutions.
                </p>
              </div>

              {/* Vertical Stacked Interactive Tabs */}
              <div className="flex flex-col gap-3.5 bg-gray-100/50 p-2.5 rounded-2xl border border-gray-200/60 shadow-inner">
                <button
                  onClick={() => setSolutionsTab("solutions")}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 cursor-pointer border-none flex flex-col gap-0.5 ${solutionsTab === "solutions"
                      ? "bg-brand text-white shadow-md"
                      : "bg-white hover:bg-gray-50 text-gray-700 hover:text-brand border border-gray-200"
                    }`}
                >
                  <span className="font-bold text-xs uppercase tracking-wider block">Our Core Solutions</span>
                  <span className={`text-[10px] block font-light leading-normal ${solutionsTab === "solutions" ? "text-white/80" : "text-gray-500"}`}>
                    Custom development, AI tools integration &amp; automation solutions
                  </span>
                </button>
                <button
                  onClick={() => setSolutionsTab("industries")}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 cursor-pointer border-none flex flex-col gap-0.5 ${solutionsTab === "industries"
                      ? "bg-brand text-white shadow-md"
                      : "bg-white hover:bg-gray-50 text-gray-700 hover:text-brand border border-gray-200"
                    }`}
                >
                  <span className="font-bold text-xs uppercase tracking-wider block">Industries We Serve</span>
                  <span className={`text-[10px] block font-light leading-normal ${solutionsTab === "industries" ? "text-white/80" : "text-gray-500"}`}>
                    Education, Business, local Government bodies &amp; NGOs in Nepal
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column (Interactive Content Panels) */}
            <div className="xl:col-span-8">
              {solutionsTab === "solutions" ? (
                <div className="flex flex-col md:grid md:grid-cols-2 gap-6 transition-all duration-500 animate-none">
                  {SERVICES.map((s, idx) => {
                    const iconsList = [BookOpen, Leaf, GraduationCap, Sliders, Terminal];
                    const IconComp = iconsList[idx] || Leaf;
                    return (
                      <div
                        key={s.id}
                        id={`service-card-${s.id}`}
                        className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-xl hover:border-brand/30 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-transparent group-hover:bg-brand transition-colors duration-300" />

                          <div className="h-11 w-11 rounded-xl bg-brand/10 border border-brand/20 text-brand flex items-center justify-center mb-5 group-hover:bg-brand group-hover:text-white transition-all duration-300 shrink-0">
                            <IconComp className="h-5 w-5" />
                          </div>

                          <h3 className="font-display text-lg font-bold text-gray-900 mb-2.5 tracking-tight group-hover:text-brand transition-colors">
                            {s.title}
                          </h3>

                          <p className="text-gray-655 text-xs leading-relaxed mb-4 font-normal">
                            {s.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 mt-auto">
                          <p className="text-[11px] text-gray-500 font-normal leading-relaxed">
                            {s.longDescription}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col md:grid md:grid-cols-2 gap-6 transition-all duration-500 animate-none">
                  {INDUSTRIES.map((ind, idx) => {
                    const icons = [BookOpen, Briefcase, Building, Users];
                    const IconComp = icons[idx] || Users;
                    return (
                      <div
                        key={ind.id}
                        id={`industry-card-${ind.id}`}
                        className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-xl hover:border-brand/30 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="image-panel h-36 mb-5 -mt-2">
                            <img src={industryImages[idx]} alt={`${ind.title} AI deployment`} loading="lazy" />
                            <div className="image-panel-caption">
                              <span className="text-[10px] font-mono text-emerald-300 bg-slate-950/90 border border-emerald-500/50 px-2 py-0.5 rounded uppercase tracking-widest font-bold shadow-sm">{ind.title}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-4.5">
                            <div className="h-10 w-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center border border-brand/20 shrink-0">
                              <IconComp className="h-4.5 w-4.5" />
                            </div>
                            <div>
                              <h3 className="font-display text-lg font-bold text-gray-900 tracking-tight group-hover:text-brand transition-colors">
                                {ind.title}
                              </h3>
                              {/* Subsectors pills */}
                              <div className="flex flex-wrap gap-1 mt-1">
                                {ind.subsectors.map((s, i) => (
                                  <span key={i} className="text-[9px] bg-brand/5 text-brand border border-brand/10 font-mono tracking-wider px-2 py-0.5 rounded-full uppercase">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-655 text-xs leading-relaxed mb-5 font-normal">
                            {ind.description}
                          </p>
                        </div>

                        <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-500">
                          <span>Target Deployment Matrix</span>
                          <span className="text-brand flex items-center gap-0.5 group">
                            <span>Inquire Scope</span>
                            <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Book Consultation Banner */}
            <div className="col-span-12 mt-8 consult-card-light rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand/5 rounded-full filter blur-[50px] pointer-events-none" />
              <div className="space-y-3 max-w-2xl text-center md:text-left">
                <span className="text-xs font-mono text-brand font-bold tracking-wider uppercase block">
                  Enterprise &amp; Academic Integration
                </span>
                <h3 className="font-display text-2xl font-bold text-gray-900 tracking-tight">
                  Require a bespoke localized Artificial Intelligence blueprint?
                </h3>
                <p className="text-gray-700 text-sm font-normal">
                  Consult with our research architects to map specialized data pathways, security frameworks, and custom digital transformation pipelines.
                </p>
              </div>
              <button
                onClick={() => setConsultModalOpen(true)}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 hover:scale-105 active:scale-95 text-white font-semibold text-sm py-4 px-8 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-emerald-800/25 shrink-0 cursor-pointer border-none"
              >
                <span>Book Strategic Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* FLAGSHIP PRODUCTS SECTION WITH EMBEDDED REAL-TIME SANDBOX AI DEMO */}
      <section id="products" className="py-24 bg-surface-soft border-b border-gray-200 scroll-mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
              Direct Practical Tools
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Our AI Products &amp; Programs
            </h2>
            <p className="text-gray-600 font-normal">
              We design and construct production-ready AI layers that integrate local context, CDC syllabi guidelines, and regional workflows. Explore our product matrix.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

            {/* Card 1: SAFAL Teacher AI */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase font-bold bg-emerald-50 text-brand border border-emerald-200 shadow-xs">
                    BETA
                  </span>
                  <GraduationCap className="h-5 w-5 text-brand animate-pulse" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-950 mb-1 tracking-tight">
                  SAFAL Teacher AI
                </h3>
                <p className="text-[11px] font-mono text-brand font-semibold mb-4">Nepal's Curriculum Lesson Assistant</p>
                <p className="text-gray-600 text-xs leading-relaxed mb-6 font-normal">
                  National curriculum-aligned AI assistant to help educators generate lesson plans, multi-level rubrics, and custom plans in seconds.
                </p>
              </div>
              <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                <a
                  href="#vibe-coding"
                  onClick={(e) => { e.preventDefault(); handleNavClick("vibe-coding"); }}
                  className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-brand hover:text-emerald-700 transition-colors"
                >
                  <span>Launch Sandbox</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Card 2: SAFAL Business AI */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    COMING SOON
                  </span>
                  <Briefcase className="h-5 w-5 text-slate-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-950 mb-1 tracking-tight">
                  SAFAL Business AI
                </h3>
                <p className="text-[11px] font-mono text-slate-500 font-medium mb-4">Intelligent Enterprise Workflows</p>
                <p className="text-gray-600 text-xs leading-relaxed mb-6 font-normal">
                  A centralized execution platform for local SMEs, startups, and enterprises seeking custom automation flows.
                </p>
              </div>
              <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="bg-transparent border-none p-0 inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-slate-600 hover:text-brand transition-colors cursor-pointer"
                >
                  <span>Inquire Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: SAFAL Municipal AI */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    COMING SOON
                  </span>
                  <Building className="h-5 w-5 text-slate-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-950 mb-1 tracking-tight">
                  SAFAL Municipal AI
                </h3>
                <p className="text-[11px] font-mono text-slate-500 font-medium mb-4">Digital Governance Assistant</p>
                <p className="text-gray-600 text-xs leading-relaxed mb-6 font-normal">
                  Bilingual support portals, records processing, and public grievance tools tailored to Nepalese local municipalities.
                </p>
              </div>
              <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="bg-transparent border-none p-0 inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-slate-600 hover:text-brand transition-colors cursor-pointer"
                >
                  <span>Inquire Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card 4: Vibe Coding with AI */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-emerald-50/20 border-emerald-300/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase font-bold bg-emerald-50 text-brand border border-emerald-200 shadow-xs">
                    ENROLLING
                  </span>
                  <Award className="h-5 w-5 text-brand" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-950 mb-1 tracking-tight">
                  Vibe Coding Course
                </h3>
                <p className="text-[11px] font-mono text-brand font-semibold mb-4">Learn Code from the Future</p>
                <p className="text-gray-600 text-xs leading-relaxed mb-6 font-normal">
                  Nepal's premier certificate bootcamp. Build production software leveraging next-gen LLMs and Agentic AI tools.
                </p>
              </div>
              <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                <a
                  href="/courses/vibe-coding"
                  onClick={(e) => { e.preventDefault(); navigate("/courses/vibe-coding"); }}
                  className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-brand hover:text-emerald-700 transition-colors"
                >
                  <span>Explore &amp; Enroll</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Live Sandbox Section */}
          <div id="vibe-coding" className="scroll-mt-20 pt-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <div className="inline-flex items-center gap-1.5 text-[9px] font-mono font-semibold uppercase tracking-widest bg-emerald-50 border border-emerald-200 text-brand px-3 py-1.5 rounded-full mb-1 shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent inline-block animate-pulse" />
                <span>Live Interactive Sandbox</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                Vibe Coding Simulator: SAFAL Teacher AI
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm font-normal">
                Select parameters to watch the AI build a complete localized lesson plan structure aligned with Nepal's CDC guidelines.
              </p>
            </div>

            <div className="flex flex-col xl:grid xl:grid-cols-12 gap-8 items-stretch">

              {/* Parameter controls panel */}
              <div className="xl:col-span-4 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
                <div className="space-y-6">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-700 block border-b border-gray-100 pb-3">
                    Sandbox Parameters
                  </span>

                  {/* Grade selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 block font-mono">Academic Class Level:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Grade 5", "Grade 8", "Grade 10", "Grade 12"].map((g) => (
                        <button
                          key={g}
                          onClick={() => setDemoGrade(g)}
                          className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${demoGrade === g
                              ? "bg-green-50 border-brand-accent text-brand-accent font-semibold"
                              : "bg-white border-gray-250 text-gray-650 hover:bg-gray-50"
                            }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subject Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 block font-mono">Curricular Subject:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Science", "Mathematics", "Nepali", "Computer Science"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setDemoSubject(s)}
                          className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${demoSubject === s
                              ? "bg-green-50 border-brand-accent text-brand-accent font-semibold"
                              : "bg-white border-gray-250 text-gray-650 hover:bg-gray-50"
                            }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Unit Topic selector */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-semibold text-gray-500 block font-mono">Focus Unit / Concept:</label>
                    <input
                      type="text"
                      value={demoTopic}
                      onChange={(e) => setDemoTopic(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-accent"
                      placeholder="e.g. Force and Motion, Fractions..."
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <button
                    onClick={handleTriggerSandbox}
                    disabled={sandboxLoading || !demoTopic.trim()}
                    className="w-full bg-brand hover:bg-brand-light disabled:bg-gray-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border-none ring-pulse"
                  >
                    {sandboxLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Compiling Parameters...</span>
                      </>
                    ) : (
                      <>
                        <Terminal className="h-4 w-4" />
                        <span>Run Vibe Compiler</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-gray-500 text-center mt-2.5 font-mono">
                    Direct local LLM server context loop.
                  </p>
                </div>
              </div>

              {/* Sandbox lesson compiler output panel */}
              <div className="xl:col-span-8 flex flex-col">
                <div className="bg-[#0b121f] border border-white/10 rounded-3xl flex-1 flex flex-col overflow-hidden shadow-2xl relative">

                  {/* IDE Header */}
                  <div className="bg-[#080d17] px-4 py-3.5 border-b border-white/10 flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 ml-2">sandbox-editor.tsx</span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300">
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" />
                        SYSTEM_ONLINE
                      </span>
                      <span>UTF-8</span>
                    </div>
                  </div>

                  {/* Editor view screen */}
                  <div className="flex-1 p-6 font-mono text-xs overflow-y-auto leading-relaxed relative min-h-[300px]">
                    {sandboxLoading ? (
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-center z-10 select-none">
                        <Loader2 className="h-10 w-10 text-emerald-400 animate-spin" />
                        <div className="space-y-1">
                          <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider block">Generating Context Modules</span>
                          <span className="text-[10px] text-slate-300 block">Mapping topics with curriculum guide specifications...</span>
                        </div>
                      </div>
                    ) : null}

                    {compiledResult ? (
                      <div className="space-y-4 text-slate-200 markdown-body">
                        <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl mb-4">
                          <span className="text-[10px] font-semibold text-emerald-400 tracking-wider uppercase block mb-1">Generated Output Metadata</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] font-mono text-slate-300">
                            <div>Grade: <span className="text-white font-semibold">{demoGrade}</span></div>
                            <div>Subject: <span className="text-white font-semibold">{demoSubject}</span></div>
                            <div>Topic: <span className="text-white font-semibold">{demoTopic}</span></div>
                            <div>Response Time: <span className="text-emerald-400 font-semibold">1.42s</span></div>
                          </div>
                        </div>
                        <Markdown>{compiledResult}</Markdown>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-3 select-none">
                        <Terminal className="h-12 w-12 text-emerald-500/30" />
                        <div className="max-w-md space-y-1">
                          <p className="text-slate-200 font-semibold text-xs">Vibe Compiler Standby</p>
                          <p className="text-[10px] text-slate-400 leading-normal font-light">
                            Define your Lesson grade, subject, and focus concept on the left side then click "Run Vibe Compiler" to generate your custom curricular outline.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CASE STUDIES SECTION */}
      <section id="case-studies" className="py-24 bg-white scroll-mt-20 border-b border-gray-200 relative overflow-hidden">
        {/* Ambient background accent */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-semibold text-brand-accent tracking-widest uppercase block font-mono">
              Proven Transformations
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              AI Impact Case Studies
            </h2>
            <p className="text-gray-600 font-normal font-sans">
              A comprehensive review of how our specialized curriculum assistants, enterprise workflows, and e-governance systems create measurable social and operational return.
            </p>
          </div>

          {/* Client select tabs slider */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CASE_STUDIES.map((cs, idx) => (
              <button
                key={cs.id}
                onClick={() => setActiveCaseIndex(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${activeCaseIndex === idx
                    ? "bg-brand text-white border-brand shadow-md"
                    : "bg-gray-50 text-gray-600 hover:text-brand border-gray-200 hover:bg-gray-100"
                  }`}
              >
                {cs.clientName}
              </button>
            ))}
          </div>

          {/* Carousel Slide Wrapper */}
          {(() => {
            const cs = CASE_STUDIES[activeCaseIndex];
            return (
              <div
                key={cs.id}
                className="flex flex-col xl:grid xl:grid-cols-12 gap-8 items-stretch transition-all duration-500 animate-none"
              >
                {/* Left Side Content grid */}
                <div className="xl:col-span-6 bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-sm">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold text-brand uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded shadow-xs">
                        {cs.industry}
                      </span>
                      <span className="text-[10px] font-mono text-slate-600 font-medium">
                        Deployment Success Case
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                      {cs.clientName}
                    </h3>

                    <div className="space-y-4 pt-4 border-t border-gray-100 text-sm leading-relaxed">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider font-semibold">The Challenge</span>
                        <p className="text-gray-600 font-light font-normal">
                          {cs.challenge}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-brand uppercase tracking-wider font-semibold">The AI Solution</span>
                        <p className="text-gray-650 font-light font-normal">
                          {cs.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-5 border-t border-gray-100">
                    <h4 className="text-[10px] font-mono text-brand uppercase tracking-wider font-semibold">Measurable Results</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cs.results.map((resMsg, ridx) => (
                        <li key={ridx} className="flex gap-2 items-start text-xs font-normal text-gray-650 leading-snug">
                          <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                          <span>{resMsg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Side Visual Showcase + Quote */}
                <div className="xl:col-span-6 flex flex-col justify-between relative overflow-hidden rounded-3xl border border-gray-200 min-h-[420px] bg-gray-50 shadow-sm">

                  {/* Photo area with absolute fit */}
                  <div className="flex-1 relative overflow-hidden min-h-[220px]">
                    {cs.image ? (
                      <img
                        src={cs.image}
                        alt={cs.clientName}
                        className="w-full h-full absolute inset-0 object-cover hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-brand/10 to-brand-accent/5 flex items-center justify-center">
                        <Terminal className="h-16 w-16 text-brand-accent/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
                  </div>

                  {/* Gradient quote card */}
                  <div className={`p-6 sm:p-8 bg-gradient-to-br ${cs.gradient} border-t border-gray-200 relative overflow-hidden shrink-0`}>
                    <div className="absolute top-4 right-4 text-white/5 pointer-events-none text-7xl font-serif select-none">
                      "
                    </div>
                    <figure className="space-y-3.5 relative z-10">
                      <blockquote className="text-white text-xs italic font-medium leading-relaxed">
                        "{cs.quote}"
                      </blockquote>
                      <figcaption className="text-[10px] font-mono text-white flex flex-col gap-0.5">
                        <span className="font-semibold block">{cs.author}</span>
                        <span className="text-white/60 block">{cs.role}</span>
                      </figcaption>
                    </figure>
                  </div>
                </div>

              </div>
            );
          })()}

        </div>
      </section>

      {/* RESEARCH & INNOVATION SECTION */}
      {/* COMBINED LEARNING & RESEARCH HUB */}
      <section id="training" className="py-24 bg-surface-soft border-b border-gray-200 scroll-mt-20 relative overflow-hidden">
        {/* Decorative background visual node elements */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

        {/* Extra anchor to allow research navigation */}
        <div id="research" className="absolute top-0 left-0 scroll-mt-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-semibold text-brand-accent tracking-widest uppercase block font-mono">
              Skill &amp; Knowledge Accelerator
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Learning &amp; Research Hub
            </h2>
            <p className="text-gray-600 font-normal">
              We build outcomes. SAFAL AI is dedicated to educational capacity building and pioneering research in artificial intelligence. Toggle between our training courses and research focus areas below.
            </p>
          </div>

          {/* Interactive Toggle Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 border border-gray-200 p-1.5 rounded-full flex gap-1 shadow-sm">
              <button
                onClick={() => setLearningTab("training")}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none ${learningTab === "training"
                    ? "bg-brand text-white shadow-md font-bold"
                    : "text-gray-500 hover:text-brand"
                  }`}
              >
                Training Programs
              </button>
              <button
                onClick={() => setLearningTab("research")}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none ${learningTab === "research"
                    ? "bg-brand text-white shadow-md font-bold"
                    : "text-gray-500 hover:text-brand"
                  }`}
              >
                Research Focus Areas
              </button>
            </div>
          </div>

          {/* Tab Panels */}
          {learningTab === "training" ? (
            <div className="space-y-12 transition-all duration-500 animate-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {TRAINING_PROGRAMS.map((prog) => (
                  <div
                    key={prog.id}
                    id={`training-card-${prog.id}`}
                    className="bg-[#0F172A] border border-emerald-500/30 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-2xl hover:border-emerald-400/60"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-3 py-1 rounded-md shadow-xs">
                          {prog.duration}
                        </span>
                        <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 font-bold">
                          Accredited Course
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-white mb-1 tracking-tight">
                        {prog.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-300 mb-6 font-mono">Target: {prog.target}</p>

                      <div className="space-y-4 mb-8">
                        <p className="text-xs text-slate-200 leading-relaxed font-normal">
                          Empowering learners to command standard ML methodologies, curate custom LLM weights, and build production integrations safely.
                        </p>
                        <button
                          onClick={() => setSelectedSyllabusProg(prog)}
                          className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:text-emerald-300 transition-colors bg-transparent border-none cursor-pointer p-0"
                        >
                          <span>Explore Detailed Syllabus Modules</span>
                          <ChevronRight className="h-3.5 w-3.5 text-emerald-400" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex gap-2">
                      <button
                        onClick={() => {
                          setConsultSector("Education");
                          setConsultMessage(`I'm highly interested in registering for the "${prog.title}" AI Learning Program. Please provide schedule details.`);
                          setConsultModalOpen(true);
                        }}
                        className="flex-1 text-center bg-brand hover:bg-brand-light text-white font-semibold text-xs py-3 rounded-lg transition-all cursor-pointer uppercase tracking-wider border-none shadow-lg shadow-emerald-900/30"
                      >
                        Enroll Info
                      </button>
                      <button
                        onClick={() => setSelectedSyllabusProg(prog)}
                        className="px-4 text-center bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs py-3 rounded-lg transition-all cursor-pointer border border-slate-600"
                      >
                        Syllabus
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom general action */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setConsultSector("Education");
                    setConsultMessage("Hi, I want details regarding standard academic program options and available custom slots.");
                    setConsultModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light hover:scale-105 transition-all text-white font-medium text-sm py-4 px-8 rounded-full shadow-lg shadow-brand/10 cursor-pointer border-none"
                >
                  <span>Explore Custom Institutional Programs</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12 items-center transition-all duration-500 animate-none">
              {/* Left Content column */}
              <div className="xl:col-span-6 space-y-6">
                <span className="text-xs font-semibold text-brand-accent tracking-widest uppercase block font-mono">
                  Pioneering Tomorrow
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Researching Tomorrow's <br />AI Solutions
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed font-normal">
                  SAFAL AI is deeply committed to exploring innovative AI applications that address Nepal's unique educational, corporate, linguistic, and societal challenges. We believe in building solutions that scale across geography and resource diversity.
                </p>

                <div className="pt-4 space-y-3.5 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded bg-green-50 border border-green-200 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                      <Check className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-950 block">Local NLP Fine-Tuning</span>
                      <p className="text-xs text-gray-500 leading-relaxed font-normal">Deploying LLM adapters and classifiers that operate in highly refined Nepali syntax structures.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded bg-green-50 border border-green-200 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                      <Check className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-950 block">Resource-Constrained Optimization</span>
                      <p className="text-xs text-gray-500 leading-relaxed font-normal">Designing server-assisted workflows that execute seamlessly over standard mobile data links.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Interactive List column */}
              <div className="xl:col-span-6 space-y-4">
                <span className="text-xs font-mono text-gray-500 block tracking-wider uppercase mb-2">
                  Primary Research &amp; Focus Domains:
                </span>

                <div className="space-y-3.5">
                  {RESEARCH_FOCUS_AREAS.map((focus) => (
                    <div
                      key={focus.id}
                      id={`research-row-${focus.id}`}
                      className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-brand-accent/40 hover:shadow-md transition-all flex items-start gap-4"
                    >
                      <div className="h-9 w-9 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center text-brand-accent shrink-0">
                        <GraduationCap className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold text-gray-950 tracking-tight">
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
          )}

        </div>

        {/* Syllabus Detail Modal */}
        {selectedSyllabusProg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <div className="bg-[#161617] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white shadow-2xl relative max-h-[85vh] overflow-y-auto flex flex-col justify-between">
              <button
                onClick={() => setSelectedSyllabusProg(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
              >
                <X className="h-6 w-6" />
              </button>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-medium text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded">
                    {selectedSyllabusProg.duration}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 font-semibold">
                    Accredited Program Outline
                  </span>
                </div>

                <h3 className="font-display text-2xl font-extrabold text-white mb-2 tracking-tight">
                  {selectedSyllabusProg.title}
                </h3>
                <p className="text-xs text-gray-400 mb-6 font-mono">Target: {selectedSyllabusProg.target}</p>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <span className="text-xs font-mono font-semibold uppercase text-brand block">Syllabus Overview &amp; Modules:</span>
                  <ul className="space-y-3.5 text-sm text-gray-300 font-normal">
                    {selectedSyllabusProg.syllabus.map((syl: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>{syl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    const prog = selectedSyllabusProg;
                    setSelectedSyllabusProg(null);
                    setConsultSector("Education");
                    setConsultMessage(`I'm highly interested in registering for the "${prog.title}" AI Learning Program. Please provide schedule details.`);
                    setConsultModalOpen(true);
                  }}
                  className="flex-1 bg-white hover:bg-gray-100 text-black font-semibold text-xs py-3.5 px-6 rounded-xl transition-all cursor-pointer border-none shadow-md uppercase tracking-wider text-center"
                >
                  Request Enrollment Info
                </button>
                <button
                  onClick={() => setSelectedSyllabusProg(null)}
                  className="bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs py-3.5 px-6 rounded-xl transition-all cursor-pointer border border-white/10 uppercase tracking-wider text-center"
                >
                  Close Outline
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-[#070b16] dark-section border-y border-dark-slate relative overflow-hidden">
        {/* Decorative lights */}
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
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-medium tracking-wider transition-all cursor-pointer border ${activeTestimonialCategory === cat
                    ? "bg-brand text-white border-brand shadow-lg shadow-emerald-600/20 font-semibold"
                    : "bg-slate-800/80 text-slate-200 hover:text-white border-slate-700 hover:border-emerald-500/50"
                  }`}
              >
                {cat} Testimonials
              </button>
            ))}
          </div>

          {/* Active reviews sliding block */}
          {(() => {
            const activeTestimonials = TESTIMONIALS.filter((t) => t.category === activeTestimonialCategory);
            const totalTestimonials = activeTestimonials.length;
            const idx = Math.min(activeTestimonialIdx, totalTestimonials - 1);
            const testimonial = activeTestimonials[idx] || activeTestimonials[0];
            if (!testimonial) return null;
            return (
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

                    {/* Navigation Controls inside slider */}
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
            );
          })()}

        </div>
      </section>

      {/* PARTNER ORGANIZATIONS (TRUSTED BY) SECTION */}
      <section className="py-16 dark-section border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-xl mx-auto space-y-1 mb-10">
            <h3 className="font-display text-lg font-bold text-white tracking-tight">
              Trusted By
            </h3>
            <p className="text-xs text-slate-300 font-normal uppercase tracking-wider font-mono">
              Schools, Colleges, Enterprises &amp; Municipal Governments
            </p>
          </div>

          {/* Simple category pill filtering */}
          <div className="flex flex-wrap justify-center gap-2 mb-8" id="partner-tabs">
            {(["All", "School", "College", "Municipality", "Enterprise"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActivePartnerFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all cursor-pointer ${activePartnerFilter === cat
                    ? "bg-brand text-white font-semibold shadow-md shadow-emerald-600/20"
                    : "bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700"
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
                School: "border-white/15 bg-white/5 hover:border-emerald-500/50",
                College: "border-white/15 bg-white/5 hover:border-emerald-400/50",
                Municipality: "border-white/15 bg-white/5 hover:border-emerald-500/50",
                Enterprise: "border-white/15 bg-white/5 hover:border-teal-400/50",
                Partner: "border-white/15 bg-white/5 hover:border-emerald-400/50"
              };
              const colorClass = typesColors[p.category] || "border-white/15 bg-white/5";
              return (
                <div
                  key={p.id}
                  id={`partner-card-${p.id}`}
                  className={`border ${colorClass} rounded-xl p-4 flex flex-col items-center justify-center text-center group cursor-default transition-all duration-300 hover:scale-[1.02]`}
                  title={p.name}
                >
                  <span className="text-xs font-display font-semibold text-slate-200 group-hover:text-white transition-colors uppercase tracking-wider block">
                    {p.logoText}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 tracking-widest mt-1 block uppercase font-semibold">
                    {p.category}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-24 dark-section border-b border-white/10 scroll-mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12 xl:gap-8 items-center">

            {/* Mission Vision statement column */}
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

              {/* Mission Vision Bento Plate */}
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

            {/* Visual block brand coordinates */}
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

      {/* LEADERSHIP TEAM SECTION */}
      <section id="team" className="py-24 bg-surface-muted border-t border-gray-200 scroll-mt-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full filter blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold text-brand tracking-widest uppercase block">
              Our Visionaries
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Meet The Team Behind SAFAL AI
            </h2>
            <p className="text-gray-600 font-normal text-sm sm:text-base">
              Pioneers, educators, and architects building high-impact artificial intelligence infrastructure for Nepalese communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                id={`member-card-${member.id}`}
                className="bg-white border border-gray-200/80 rounded-3xl p-8 flex flex-col items-center justify-between text-center relative overflow-hidden group transition-all duration-300 hover:border-brand/40 shadow-sm hover:shadow-xl hover:-translate-y-1"
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
                    {/* Profile image or avatar monogram */}
                    {member.profileImage ? (
                      <img
                        src={member.profileImage}
                        alt={member.name}
                        className="relative h-24 w-24 rounded-full object-cover shadow-lg border-4 border-white transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className={`relative h-24 w-24 rounded-full bg-gradient-to-br ${member.avatarBg} p-[3px] flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-105`}>
                        <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                          <span className="text-brand text-xl font-display font-extrabold tracking-wider">
                            {member.avatarInitials}
                          </span>
                        </div>
                      </div>
                    )}
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
                  <p className="text-gray-655 font-normal text-xs leading-relaxed max-w-[240px] mx-auto min-h-[4.5rem]">
                    {member.description}
                  </p>
                </div>

                {/* LinkedIn button & action row */}
                <div className="pt-6 mt-6 border-t border-gray-150 w-full flex flex-col items-center gap-2.5 relative z-10">
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-xl bg-gray-50 hover:bg-[#0A66FF] border border-gray-200 hover:border-transparent text-gray-500 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                    title={`Connect with ${member.name} on LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-[11px] font-mono text-gray-500 hover:text-brand transition-colors"
                  >
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION WITH FORM INQUIRY SUBMISSIONS */}
      <section id="contact" className="py-24 bg-surface-soft border-t border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col xl:grid xl:grid-cols-12 gap-12 xl:gap-8 items-start">

            {/* Informative column details */}
            <div className="xl:col-span-5 space-y-8">
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
                    <a href="mailto:info@safalai.com.np" className="text-sm font-semibold text-gray-900 hover:text-brand transition-colors">
                      info@safalai.com.np
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="h-10 w-10 bg-brand/10 border border-brand/20 text-brand flex items-center justify-center rounded-xl shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-600 block uppercase tracking-wider font-semibold">Phone Number</span>
                    <a href="tel:+9779869627250" className="text-sm font-semibold text-gray-900 hover:text-brand transition-colors">
                      +977 986-9627250
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
                    href="https://www.facebook.com/profile.php?id=100083926890788"
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
            <div className="xl:col-span-7 bg-white rounded-2xl p-8 border border-gray-200 shadow-lg relative overflow-hidden">
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
        </>
      ) : path === "/courses/vibe-coding" ? (
        renderVibeCodingPage()
      ) : (
        renderNotFoundPage()
      )}


      {/* BOOK CONSULTATION MODAL / DIALOG */}
      {consultModalOpen && (
        <div
          id="consultation-modal-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <div
            id="consultation-modal-card"
            className="w-full max-w-lg bg-[#0F172A] rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/20 flex flex-col max-h-[90vh]"
          >
            {/* Header banner */}
            <div className="bg-[#0F172A] p-6 text-white relative border-b border-slate-800">
              <button
                id="close-consult-modal"
                onClick={() => setConsultModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-white/5 cursor-pointer border-none"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider w-fit uppercase text-emerald-400 mb-2">
                <Calendar className="h-3.5 w-3.5" />
                <span>Strategic Booking Queue</span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-1">
                Book Consultation
              </h3>
              <p className="text-slate-300 text-xs font-light">
                Secure a structured 30-minute integration review call with SAFAL educational and automation leads.
              </p>
            </div>

            {/* Form scroll block */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
              {consultSuccessMsg ? (
                <div className="p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-300 space-y-3" id="modal-success-box">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  <h4 className="font-display text-base font-bold text-white">Consultation Interest Logged</h4>
                  <p className="text-xs font-light text-slate-200 leading-relaxed">
                    {consultSuccessMsg}
                  </p>
                  <button
                    onClick={() => {
                      setConsultSuccessMsg(null);
                      setConsultModalOpen(false);
                    }}
                    className="w-full bg-brand hover:bg-brand-light text-white py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold pointer-events-auto cursor-pointer border-none"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookConsultation} className="space-y-4" id="consultation-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1" htmlFor="consult-name">
                        Your Full Name
                      </label>
                      <input
                        id="consult-name"
                        type="text"
                        required
                        value={consultName}
                        onChange={(e) => setConsultName(e.target.value)}
                        placeholder="e.g., Sunil Sharma"
                        className="glass-input w-full px-4 py-2.5 text-xs text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1" htmlFor="consult-email">
                        Your Professional Email
                      </label>
                      <input
                        id="consult-email"
                        type="email"
                        required
                        value={consultEmail}
                        onChange={(e) => setConsultEmail(e.target.value)}
                        placeholder="sunil@academy.edu.np"
                        className="glass-input w-full px-4 py-2.5 text-xs text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1" htmlFor="consult-org">
                        Organization / Authority
                      </label>
                      <input
                        id="consult-org"
                        type="text"
                        required
                        value={consultOrg}
                        onChange={(e) => setConsultOrg(e.target.value)}
                        placeholder="e.g. Lalitpur Ward office, Zenith School"
                        className="glass-input w-full px-4 py-2.5 text-xs text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1" htmlFor="consult-phone">
                        Phone Contact Coordinate
                      </label>
                      <input
                        id="consult-phone"
                        type="text"
                        required
                        value={consultPhone}
                        onChange={(e) => setConsultPhone(e.target.value)}
                        placeholder="+977-9800000000"
                        className="glass-input w-full px-4 py-2.5 text-xs text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1" htmlFor="consult-sector-select">
                      Primary sector focus
                    </label>
                    <select
                      id="consult-sector-select"
                      value={consultSector}
                      onChange={(e) => setConsultSector(e.target.value)}
                      className="glass-input w-full px-4 py-2.5 text-xs text-white cursor-pointer [&>option]:bg-[#0F172A] [&>option]:text-white"
                    >
                      <option value="Education">Academic Integration (Schools &amp; Colleges)</option>
                      <option value="Enterprise">Enterprise Workspace (SMEs, Startups)</option>
                      <option value="Government">Public Civil Administration (Municipalities)</option>
                      <option value="NGO/INGO">Non-profit/INGOs Community Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1" htmlFor="consult-msg">
                      What target challenge is your team targeting?
                    </label>
                    <textarea
                      id="consult-msg"
                      rows={4}
                      value={consultMessage}
                      onChange={(e) => setConsultMessage(e.target.value)}
                      placeholder="Briefly share any special workflows or curricula goals you intend to transform."
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none placeholder:text-slate-400"
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


      {/* FLOATING TOP BUTTON */}
      {showTopButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed top-6 right-6 z-40 p-3 bg-brand hover:bg-brand-light text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse cursor-pointer border-none"
          title={language === "en" ? "Back to Top" : "माथि जानुहोस्"}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* FLOATING ACTION DOCK (WhatsApp + Chatbot) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-none select-none">
        
        {/* Chatbot Drawer Panel */}
        {chatOpen && (
          <div
            id="chatbot-drawer"
            className="w-80 sm:w-96 max-w-[calc(100vw-2rem)] h-[480px] bg-dark-secondary dark-section rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden pointer-events-auto transition-all duration-300 transform scale-100 opacity-100 mb-2"
          >
            {/* Header branding */}
            <div className="bg-[#0F172A] px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/35 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-dark-primary" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white leading-tight">
                    SAFAL AI Mitra
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase flex items-center gap-1 font-semibold">
                    <span>Virtual Advisor</span>
                  </span>
                </div>
              </div>
              <button
                id="close-chatbot"
                onClick={() => setChatOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition-all cursor-pointer border-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Suggested Chip list (Shortcut triggers) */}
            <div className="p-3 bg-[#070b16] border-b border-white/5 flex gap-1.5 overflow-x-auto select-none no-scrollbar">
              <button
                onClick={() => handleSendChatMessage(undefined, "Tell me about SAFAL Teacher AI and our sandbox")}
                className="text-[10px] shrink-0 bg-slate-800 border border-slate-700 hover:border-emerald-500 hover:bg-emerald-950/40 text-slate-200 px-2.5 py-1 rounded-lg font-mono transition-all cursor-pointer"
              >
                💡 Teacher AI &amp; Sandbox
              </button>
              <button
                onClick={() => handleSendChatMessage(undefined, "What kinds of training courses do we offer?")}
                className="text-[10px] shrink-0 bg-slate-800 border border-slate-700 hover:border-emerald-500 hover:bg-emerald-950/40 text-slate-200 px-2.5 py-1 rounded-lg font-mono transition-all cursor-pointer"
              >
                📚 AI Certifications
              </button>
              <button
                onClick={() => {
                  setChatOpen(false);
                  setConsultModalOpen(true);
                }}
                className="text-[10px] shrink-0 bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 px-2.5 py-1 rounded-lg font-mono transition-all cursor-pointer flex items-center gap-1 font-semibold"
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
                      <div className="h-7 w-7 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                        स
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs font-light leading-relaxed ${isAI
                          ? "bg-slate-900/90 text-slate-100 rounded-tl-none border border-slate-700"
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
                <div className="flex items-center gap-2 text-slate-300 text-[10px] font-mono pl-9 py-2">
                  <Loader2 className="h-3 w-3 animate-spin text-emerald-400" />
                  <span>Mitra is synthesizing responses...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Text entry board */}
            <form
              onSubmit={handleSendChatMessage}
              className="p-3 bg-[#0F172A] border-t border-white/10 flex items-center gap-1.5"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask SAFAL AI Mitra..."
                className="flex-1 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none placeholder:text-slate-400 font-light"
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
        )}

        {/* Action Buttons Row */}
        <div className="flex flex-row items-center gap-3 pointer-events-auto">
          {/* WhatsApp Button */}
          <a
            id="floating-whatsapp-btn"
            href="https://wa.me/9779869627250?text=Hello%20Safal%20AI%20and%20Innovation%20Centre"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] shadow-xl flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer hover:ring-4 hover:ring-[#25D366]/20 border-none shrink-0"
            title="WhatsApp Us"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.947 9.947 0 0 0 4.887 1.282c5.506 0 9.99-4.474 9.991-9.984a9.972 9.972 0 0 0-9.996-9.951zm0 18.294a8.276 8.276 0 0 1-4.225-1.157l-.304-.18-3.136.82.835-3.056-.197-.313a8.293 8.293 0 0 1-1.272-4.423c.001-4.57 3.722-8.29 8.297-8.29a8.28 8.28 0 0 1 8.293 8.296c-.001 4.572-3.725 8.293-8.296 8.293zm4.542-6.208c-.249-.125-1.472-.726-1.7-.81-.228-.083-.393-.125-.558.125-.165.25-.638.809-.783.974-.144.166-.29.184-.539.06a6.793 6.793 0 0 1-1.997-1.232c-.776-.692-1.301-1.547-1.453-1.81-.153-.263-.016-.406.117-.538.12-.12.249-.29.373-.434.125-.144.166-.25.25-.415.083-.167.042-.313-.02-.439-.063-.125-.558-1.347-.765-1.849-.2-.486-.402-.422-.558-.43h-.475c-.165 0-.434.062-.661.312-.228.25-.868.85-.868 2.072 0 1.222.888 2.4 1.012 2.564.125.166 1.748 2.67 4.235 3.74.591.255 1.053.408 1.412.523.593.189 1.134.162 1.561.098.476-.071 1.472-.601 1.68-1.182.207-.581.207-1.08.145-1.182-.062-.102-.228-.166-.477-.291z" />
            </svg>
          </a>

          {/* Chatbot Toggle Button */}
          <button
            id="open-chatbot"
            onClick={() => setChatOpen(!chatOpen)}
            className="h-12 w-12 rounded-full bg-brand hover:bg-brand-light shadow-xl flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer ring-pulse border-none shrink-0"
            title={chatOpen ? "Close Chatbot" : "Open Chatbot"}
          >
            <div className="relative">
              {chatOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
              {!chatOpen && (
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#10b981] border-2 border-brand" />
              )}
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}
