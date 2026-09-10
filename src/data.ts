import type {
  Service,
  Product,
  ChoiceReason,
  IndustryServed,
  ResearchFocus,
  TrainingProgram,
  CaseStudy,
  TeamMember,
  VibeModule,
  VibeSchedule,
  VibeStat,
  VibeCourseSkill,
  VibeSuccessStory
} from "./types";

export type {
  Service,
  Product,
  ChoiceReason,
  IndustryServed,
  ResearchFocus,
  TrainingProgram,
  CaseStudy,
  TeamMember,
  VibeModule,
  VibeSchedule,
  VibeStat,
  VibeCourseSkill,
  VibeSuccessStory
};

export const SERVICES: Service[] = [
  {
    id: "training",
    title: "AI Training & Capacity Building",
    description: "Practical AI training programs for teachers, students, professionals and organizations.",
    longDescription: "Deploy intensive, outcome-oriented workshops and certifications that close the AI skills gap. Specifically crafted curriculum models for educators, management, developers, and public sector workforce to leverage tools like Large Language Models constructively and ethically."
  },
  {
    id: "automation",
    title: "AI Automation Solutions",
    description: "Automate repetitive workflows and improve productivity using AI.",
    longDescription: "Integrate specialized workflow automations, customer service AI agents, document parsers, and custom integrations that streamline repetitive operations, liberating institutional resources for strategic work."
  },
  {
    id: "development",
    title: "AI Product Development",
    description: "Custom AI applications tailored to business and educational needs.",
    longDescription: "Build bespoke, production-ready AI services from the ground up. From dataset collection and fine-tuning models to crafting premium interactive web user experiences tailored specifically to local language and regulatory targets."
  },
  {
    id: "consulting",
    title: "AI Consulting",
    description: "Strategic AI consulting for organizations and institutions.",
    longDescription: "Steer digital transformation roadmaps with expert insights on technical architecture, feasibility analysis, vendor vetting, risk assessment, and national/municipal data compliance criteria."
  },
  {
    id: "research",
    title: "Research & Innovation",
    description: "Exploring innovative applications of AI to solve Nepal's unique challenges.",
    longDescription: "Pioneering localized AI solutions centered around local languages (Nepali and regional dialects), education quality indices, localized text classification, and agricultural or healthcare auxiliary diagnostics."
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "teacher-ai",
    name: "SAFAL Teacher AI",
    tagline: "Nepal's Curriculum-Aligned Lesson Assistant",
    description: "Nepal's national curriculum-aligned AI teaching assistant designed to help educators generate rich lesson plans, multi-level assessments, standard questions, and customized syllabus plans in seconds.",
    status: "Beta",
    ctaAvailable: true,
    features: [
      "Aligned with National Curriculum Development Centre (CDC) Nepal",
      "Supplies lesson delivery guides, activities, and local evaluation grids",
      "Operates fluently in both high-end English and professional custom Nepali",
      "Interactive Sandbox testing environment embedded directly below"
    ]
  },
  {
    id: "business-ai",
    name: "SAFAL Business AI",
    tagline: "Intelligent Automation Engine for enterprises",
    description: "A centralized, intuitive AI execution and integration platform for domestic SMEs, startups, and larger enterprises seeking custom agentic workflows.",
    status: "Coming Soon",
    ctaAvailable: false,
    features: [
      "Custom local language support channels",
      "Automatic data-pipeline integrations for ERP and finance layers",
      "Insightful enterprise analytics maps with conversational chat triggers"
    ]
  },
  {
    id: "municipal-ai",
    name: "SAFAL Municipal AI",
    tagline: "AI Solutions for Local Governments",
    description: "Pioneering digital governance architectures. Helps local municipalities and public bodies catalog documents, streamline public grievances, and supply digital assistance portals.",
    status: "Coming Soon",
    ctaAvailable: false,
    features: [
      "Automated citizen support systems active in Nepali and local dialects",
      "Optimized document analysis and rapid sorting tools for public staff",
      "Syllabus tracking guides for municipal public-school governance boards"
    ]
  }
];

export const WHY_CHOOSE_SAFAL: ChoiceReason[] = [
  {
    id: "nepal-focused",
    title: "Nepal-Focused Solutions",
    description: "We design and engineer our products and models with the specific cultural, linguistic, and structural realities of Nepalese educational and corporate institutions in mind."
  },
  {
    id: "expertise",
    title: "AI Expertise",
    description: "Our dedicated technical leads, engineers, and educators hold deep expertise in model deployment, machine learning integration, and pedagogical instruction design."
  },
  {
    id: "practical-approach",
    title: "Practical Approach",
    description: "We focus heavily on tangible, real-world impact. We avoid technical jargon to provide immediate, actionable, and measurable improvements in efficiency."
  },
  {
    id: "innovation-driven",
    title: "Innovation Driven",
    description: "We are continuously exploring, researching, and experimenting with pioneering AI frameworks, models, and paradigms to keep our community globally competitive."
  }
];

export const INDUSTRIES: IndustryServed[] = [
  {
    id: "education",
    title: "Education",
    subsectors: ["Schools", "Colleges", "Universities"],
    description: "Modernizing classrooms and campus structures. Equipping teachers with assistive tools, empowering administrators with workflow automation, and providing students with modern digital skills."
  },
  {
    id: "business",
    title: "Business",
    subsectors: ["SMEs", "Startups", "Enterprises"],
    description: "Unlocking operational leverage. Automating core customer communications, enhancing administrative efficiency, and enabling data-driven strategic execution."
  },
  {
    id: "government",
    title: "Government",
    subsectors: ["Municipalities", "Public Institutions", "Development Agencies"],
    description: "Facilitating inclusive e-governance. Streamlining document processing, assisting municipal officers, and establishing local educational quality standards."
  },
  {
    id: "ngo",
    title: "Non-Profit Organizations",
    subsectors: ["NGOs", "INGOs", "Development Projects"],
    description: "Maximizing program distribution and social return. Generating program insights, conducting rapid community qualitative data synthesis, and enhancing multilingual literacy campaigns."
  }
];

export const RESEARCH_FOCUS_AREAS: ResearchFocus[] = [
  {
    id: "res-edu",
    title: "AI in Education",
    description: "Pioneering tools to augment educational outcomes in diverse socio-economic school settings, supporting individualized pacing with mixed resource availability."
  },
  {
    id: "res-gov",
    title: "AI for Governance",
    description: "Developing safe, efficient NLP modules tailored to Nepalese local administrative vocabulary to ease access to public services and forms processing."
  },
  {
    id: "res-auto",
    title: "AI Automation",
    description: "Analyzing optimal patterns in automating workflow-specific corporate systems while preserving human oversight and ethical safety barriers."
  },
  {
    id: "res-trans",
    title: "Digital Transformation",
    description: "Providing comparative frameworks to help organizations migrate from physical ledger archives to cloud-backed document structures securely aided by OCR."
  },
  {
    id: "res-lit",
    title: "AI Literacy",
    description: "Researching the baseline criteria of AI digital literacy across secondary school systems in Nepal to advice on standard educational frameworks."
  }
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: "prog-teachers",
    title: "AI for Teachers & Educators",
    target: "School & College Educators, Academic Directors",
    duration: "2-Week Certification",
    syllabus: [
      "Fundamentals of Generative AI in modern classrooms",
      "Designing CDC-aligned rubrics and standard test sheets",
      "Safely deploying SAFAL Teacher AI for rapid customization",
      "Mitigating risks of academic plagiarism constructively"
    ]
  },
  {
    id: "prog-students",
    title: "AI for Students & Learners",
    target: "High-schoolers, Bachelors, and Lifelong Learners",
    duration: "4-Week Practical Bootcamp",
    syllabus: [
      "AI Prompt Engineering fundamentals and advanced frameworks",
      "Building mini Web App prototypes featuring intelligent assistants",
      "Leveraging AI constructively for research, study, and project execution",
      "Understanding ethics, bias, and safe model boundaries"
    ]
  },
  {
    id: "prog-managers",
    title: "AI for Managers & Executives",
    target: "Managers, team leads & operations staff",
    duration: "8-Session Program (2 hrs each)",
    syllabus: [
      "AI landscape & mindset: map your real week into Do / Delegate / Automate / Eliminate",
      "Communicating with AI: build a reusable manager prompt library",
      "Docs, meetings & knowledge: an 'ask my documents' workflow",
      "Data & decision making: one-page AI Decision Briefs with evidence and options",
      "Workflow & automation: one real recurring process rebuilt and tested live",
      "Managing an AI-powered team: security, data-leak risk, bias & a one-page AI policy",
      "Strategy: a week-by-week 30-Day AI Implementation Roadmap",
      "Tools lab: task boards, team chat (MCP) & native AI integrations wired into your stack"
    ]
  },
  {
    id: "prog-researchers",
    title: "AI for Researchers & Scholars",
    target: "Academics, thesis writers & research teams",
    duration: "2-Week Intensive Lab",
    syllabus: [
      "Literature search: Google Scholar, Semantic Scholar & Elicit",
      "Deep reading & synthesis: NotebookLM with GPT, Gemini & Claude",
      "Verification: Consensus and research-grounded answer engines",
      "Knowledge base: Zotero, Obsidian & mind-mapping for connected notes",
      "Quantitative analysis: clean data, run statistics, let AI explain the results",
      "Qualitative analysis: AI-assisted thematic coding of interviews & surveys",
      "Academic writing: citation discipline and AI-aware draft quality"
    ]
  },
  {
    id: "prog-profs",
    title: "AI for Professionals & Creatives",
    target: "Corporate Executives, Software Devs, Product Managers",
    duration: "1-Week Intensive Academy",
    syllabus: [
      "Automating daily admin tasks and calendar synthesis",
      "AI-driven content generation, research sorting, and copywriting",
      "Analyzing business data sets and synthesizing trends Conversational",
      "Low-code/No-code tools for workflow build-ups"
    ]
  },
  {
    id: "prog-orgs",
    title: "AI for Organizations & Public Bodies",
    target: "Enterprise Executives, Municipal Directors, INGO leadership",
    duration: "Custom Institutional Training",
    syllabus: [
      "Developing institutional AI readiness audits",
      "Mapping high-priority automation workloads safely",
      "Enforcing organizational guidelines and document security boundaries",
      "Strategic change execution and upskilling strategies"
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-ime",
    industry: "Corporate Training & Human Resources",
    clientName: "IME Group - Nepal's Leading Money Transfer",
    challenge: "IME Group sought to upskill their entire workforce in AI fundamentals, data literacy, and practical AI tools integration without disrupting daily operations. They needed culturally-relevant, accessible training for staff across multiple branches nationwide.",
    solution: "Designed and delivered a comprehensive AI certification program customized for IME Group staff, featuring hands-on workshops, real-world use cases, and certification distribution. Training adapted to organizational workflows and included practical exercises for financial sector applications.",
    results: [
      "Successfully certified 150+ employees across multiple branches.",
      "100% training completion rate with positive feedback.",
      "Staff adopted AI tools for improving customer service workflows.",
      "Created an internal knowledge base for ongoing AI literacy."
    ],
    quote: "SAFAL AI's training was exactly what we needed - practical, relevant, and delivered professionally. Our team is now confident using AI tools in their daily work.",
    author: "IME Group Management",
    role: "Human Resources & Operations",
    gradient: "from-[#1E5A3A]/50 via-[#0E0E0D] to-[#16412B]/40",
    image: "/trainings/ime_group/group.jpg",
    gallery: [
      "/trainings/ime_group/group.jpg",
      "/trainings/ime_group/session.jpg",
      "/trainings/ime_group/certification.jpg"
    ]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-uday",
    name: "Uday Ram Jaishi",
    position: "Chief Executive Officer (CEO)",
    description: "Leading SAFAL AI's vision, partnerships and innovation initiatives to accelerate AI adoption across Nepal.",
    avatarInitials: "URJ",
    avatarBg: "from-[#0A66FF] to-[#00F0FF]",
    email: "uday@safalai.com.np",
    phone: "+977 9851 101010",
    profileImage: "/uday_ram_jaishi.jpeg"
  },
  {
    id: "team-ishwor",
    name: "Ishwor Dhungana",
    position: "Lead AI Trainer",
    description: "Specialized in AI education, teacher empowerment, professional development and practical AI implementation for schools and organizations.",
    linkedinUrl: "https://www.linkedin.com/in/ishwor-dhungana-b1432a306/",
    avatarInitials: "ID",
    avatarBg: "from-[#8A2BE2] to-[#FF007F]",
    email: "ishwor@safalai.com.np",
    phone: "+977 9851 202020",
    profileImage: "/ishwor_dhungana.jpeg"
  },
  {
    id: "team-ram",
    name: "Ram Tamang",
    position: "Product Lead",
    description: "Building innovative web solutions, driving technical architecture, and ensuring seamless user experiences across the AI digital ecosystem.",
    website: "https://ram-tamang.com.np",
    linkedinUrl: "https://www.linkedin.com/in/ram-tamang-a73241198/",
    avatarInitials: "RT",
    avatarBg: "from-[#1E5A3A] to-[#2F7D50]",
    email: "ram@safalai.com.np",
    phone: "+977 9851 404040",
    profileImage: "/ram_tamang.jpg"
  },
  {
    id: "team-kamram",
    name: "Kamran Muazzam",
    position: "AI Solutions Engineer",
    description: "Specializing in AI for healthcare & medicine, clinical decision support, medical data analysis, and digital health innovation.",
    avatarInitials: "KM",
    avatarBg: "from-[#00C853] to-[#009688]",
    email: "kamran@safalai.com.np",
    phone: "+977 9851 303030",
    profileImage: "/kamran_muazzam.png"
  }
];

// ─────────────────────────────────────────────────────────────
// VIBE CODING WITH AI — Course Data
// ─────────────────────────────────────────────────────────────

export const VIBE_MODULES: VibeModule[] = [
  {
    id: "vm-01",
    week: "Week 1",
    title: "Foundations of Vibe Coding & AI",
    topics: [
      "Traditional coding vs. Prompt-driven vs. Vibe coding",
      "Understanding Large Language Models (LLMs) for developers",
      "Setting up your full AI development environment",
      "Your first Claude Code / Gemini Code session"
    ]
  },
  {
    id: "vm-02",
    week: "Week 2",
    title: "Mastering AI Prompting for Code",
    topics: [
      "Developer's guide to effective prompting",
      "Prompting for code generation, debugging & review",
      "Context management strategies with CLAUDE.md",
      "Prompt anti-patterns and how to avoid them"
    ]
  },
  {
    id: "vm-03",
    week: "Week 3",
    title: "Claude Code Architecture & Commands",
    topics: [
      "Deep dive: Claude Code agent loop & tool use",
      "Plan Mode, checkpoints & safe execution model",
      "Built-in slash commands (/commit, /review, /doctor)",
      "Creating custom slash commands & project commands"
    ]
  },
  {
    id: "vm-04",
    week: "Week 4",
    title: "Hooks, Automation & Front-End Development",
    topics: [
      "Pre-tool & post-tool hooks: gate-keeping AI actions",
      "Building end-to-end automated CI/CD workflows",
      "AI-assisted UI design — React component generation",
      "Milestone project: Build a full Calendar Application"
    ]
  },
  {
    id: "vm-05",
    week: "Week 5",
    title: "Back-End, APIs & Multi-Agent Systems",
    topics: [
      "Node.js + Express REST API generation with AI",
      "Authentication, JWT, RBAC & OAuth 2.0 via prompt",
      "Database design with AI: MongoDB & SQL schemas",
      "Building agents: subagent orchestration & memory patterns"
    ]
  },
  {
    id: "vm-06",
    week: "Week 6",
    title: "MCP, Testing & Capstone Project",
    topics: [
      "Model Context Protocol (MCP): architecture & servers",
      "Connecting Claude to databases, GitHub & web tools",
      "Test-Driven Development & AI-powered code review",
      "Capstone: Full-stack authenticated REST API + Frontend"
    ]
  }
];

export const VIBE_SCHEDULES: VibeSchedule[] = [
  {
    id: "vs-01",
    date: "12 Jul 2026",
    day: "Sunday",
    times: ["03:00 PM – 04:30 PM"],
    tag: "Morning Batch"
  },
  {
    id: "vs-02",
    date: "20 Jul 2026",
    day: "Monday",
    times: ["07:00 AM – 08:30 AM", "02:30 PM – 04:00 PM"],
    tag: "Dual Batch"
  },
  {
    id: "vs-03",
    date: "26 Jul 2026",
    day: "Sunday",
    times: ["06:30 AM – 08:00 AM"],
    tag: "Early Bird"
  },
  {
    id: "vs-04",
    date: "27 Jul 2026",
    day: "Monday",
    times: ["06:00 PM – 07:30 PM"],
    tag: "Evening Batch"
  },
  {
    id: "vs-05",
    date: "02 Aug 2026",
    day: "Sunday",
    times: ["08:00 PM – 09:30 PM"],
    tag: "Night Batch"
  },
  {
    id: "vs-06",
    date: "03 Aug 2026",
    day: "Monday",
    times: ["06:00 PM – 07:30 PM"],
    tag: "Evening Batch"
  }
];

export const VIBE_STATS: VibeStat[] = [
  { id: "vst-01", value: "1.5", label: "Months Duration" },
  { id: "vst-02", value: "68", label: "Total Hours" },
  { id: "vst-03", value: "6", label: "Upcoming Batches" },
  { id: "vst-04", value: "100%", label: "Hands-On Projects" }
];

export const VIBE_SKILLS: VibeCourseSkill[] = [
  { id: "sk-01", icon: "🤖", label: "Claude Code & Gemini CLI" },
  { id: "sk-02", icon: "💬", label: "Advanced Prompt Engineering" },
  { id: "sk-03", icon: "⚛️",  label: "React with AI Assistance" },
  { id: "sk-04", icon: "🛠️", label: "Node.js + Express APIs" },
  { id: "sk-05", icon: "🔗", label: "Model Context Protocol (MCP)" },
  { id: "sk-06", icon: "🤝", label: "Multi-Agent Workflows" },
  { id: "sk-07", icon: "🗄️", label: "AI-Assisted Database Design" },
  { id: "sk-08", icon: "🧪", label: "Test-Driven Dev with AI" },
  { id: "sk-09", icon: "🚀", label: "Production-Ready CI/CD" },
  { id: "sk-10", icon: "🔒", label: "Auth, JWT & Security Audits" }
];

export const VIBE_SUCCESS_STORIES = [
  {
    id: "vss-01",
    name: "Binod Bastola",
    course: "MERN Stack Development with GenAI Training",
    college: "Lumbini ICT Campus / BSc. CSIT",
    company: "Mango Software Solutions Pvt. Ltd.",
    position: "React Developer",
    initial: "BB",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    id: "vss-02",
    name: "Ashmita Jha",
    course: "Machine Learning, Deep Learning & Generative AI",
    college: "Thapathali Engineering College / Electronics & Comm.",
    company: "Palm Mind Technology Pvt. Ltd.",
    position: "AI Developer",
    initial: "AJ",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: "vss-03",
    name: "Pankaj Ghimire",
    course: "Graphics Design & AI Tools",
    college: "Cambridge Institute of Technology / BBS",
    company: "Sealinks Group",
    position: "Lead Graphics Designer",
    initial: "PG",
    gradient: "from-teal-500 to-cyan-600"
  }
];
