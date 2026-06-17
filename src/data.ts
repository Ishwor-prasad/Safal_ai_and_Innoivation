export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: "Beta" | "Coming Soon";
  ctaAvailable: boolean;
  features: string[];
}

export interface ChoiceReason {
  id: string;
  title: string;
  description: string;
}

export interface IndustryServed {
  id: string;
  title: string;
  subsectors: string[];
  description: string;
}

export interface ResearchFocus {
  id: string;
  title: string;
  description: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  target: string;
  duration: string;
  syllabus: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  institution: string;
  category: "Teacher" | "Professional" | "Organization";
  avatarBg?: string;
}

export interface PartnerOrg {
  id: string;
  name: string;
  category: "School" | "College" | "Municipality" | "Enterprise" | "Partner";
  logoText: string;
}

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

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    category: "Teacher",
    quote: "SAFAL Teacher AI has completely transformed my daily preparation. Generating lessons plans and quizzes that align perfectly with the NEB standards used to take me hours every Sunday. Now, I have a world-class lesson outline in a few seconds, letting me focus on the actual teaching and student interactions.",
    author: "Prasanna Shrestha",
    role: "Secondary Level Mathematics Department Head",
    institution: "Elite Secondary Academy, Pokhara",
    avatarBg: "bg-blue-600"
  },
  {
    id: "test-2",
    category: "Teacher",
    quote: "मेरो कक्षा ८ को सामाजिक अध्ययनको पाठ योजना बनाउन मैले सफल टिचर एआई प्रयोग गरें। यसले नेपालको पाठ्यक्रम अनुकूल, अत्यन्त प्रष्ट र नवीन शिक्षण विधिहरू सहितको योजना तयार पारेर मलाई दियो। यो नेपाली र अंग्रेजी दुवै भाषामा उत्तिकै प्रभावकारी छ।",
    author: "Ramesh Dahal",
    role: "Social Studies Educator",
    institution: "Janajyoti Secondary Public School, Lalitpur",
    avatarBg: "bg-green-600"
  },
  {
    id: "test-3",
    category: "Professional",
    quote: "The 'AI for Professionals' masterclass was exceptionally structured. Instead of passing over generic theories, SAFAL AI focused on actual API deployments and local workflow integrations. Our development team successfully automated 3 hours of daily manual reports right after the program.",
    author: "Sujita Adhikari",
    role: "Director of Technical Engineering",
    institution: "Apex Digital Solutions, Kathmandu",
    avatarBg: "bg-violet-600"
  },
  {
    id: "test-4",
    category: "Professional",
    quote: "As a project manager, staying on top of multi-stakeholder reports was overwhelming. SAFAL AI's prompt training has streamlined my research synthesis, meeting notes drafting, and client updates. It has increased my daily bandwidth tenfold.",
    author: "Anish Lamichhane",
    role: "Senior Project Manager",
    institution: "Hamro Tech Group, Lalitpur",
    avatarBg: "bg-cyan-600"
  },
  {
    id: "test-5",
    category: "Organization",
    quote: "We partnered with SAFAL AI to execute an upskilling drive across all our departments. Their structured capability building and clear security frameworks took our staff from apprehensive to fully active automated agents within weeks. Their professionalism is outstanding.",
    author: "Dr. K. B. Gurung",
    role: "Academic Superintendent & Advisor",
    institution: "National Development & Educational Council (NDEC)",
    avatarBg: "bg-orange-600"
  },
  {
    id: "test-6",
    category: "Organization",
    quote: "Our local government office cooperated with SAFAL AI to execute digital literacy workshops and municipal AI blueprints. They are not merely an educational course provider; they are an active, strategic innovation partner capable of deploying customized technology engines.",
    author: "Yogendra B. Thapa",
    role: "Municipal IT Coordination Lead",
    institution: "Lekhnath Municipal Office, Kaski",
    avatarBg: "bg-red-600"
  }
];

export const TRUSTED_PARTNERS: PartnerOrg[] = [
  { id: "p-sch1", name: "Elite Secondary Academy, Pokhara", category: "School", logoText: "Elite Academy" },
  { id: "p-sch2", name: "Janajyoti Public School, Lalitpur", category: "School", logoText: "Janajyoti Public" },
  { id: "p-col1", name: "Apex College of IT, Kathmandu", category: "College", logoText: "Apex College" },
  { id: "p-col2", name: "Lalitpur Institute of Science", category: "College", logoText: "Lalitpur Sci" },
  { id: "p-mun1", name: "Lekhnath Municipal Council", category: "Municipality", logoText: "Lekhnath Muni" },
  { id: "p-mun2", name: "Bidur Municipal Board, Nuwakot", category: "Municipality", logoText: "Bidur Governance" },
  { id: "p-ent1", name: "Apex Digital Solutions Co.", category: "Enterprise", logoText: "Apex Digital" },
  { id: "p-ent2", name: "Hamro Tech Group", category: "Enterprise", logoText: "Hamro Tech" },
  { id: "p-ngo1", name: "Nepal Literacy Trust", category: "Partner", logoText: "Nepal Lit Trust" }
];

export interface CaseStudy {
  id: string;
  industry: string;
  clientName: string;
  challenge: string;
  solution: string;
  results: string[];
  quote: string;
  author: string;
  role: string;
  gradient: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-edu",
    industry: "Education (Academic Management)",
    clientName: "Elite Secondary Academy, Pokhara",
    challenge: "Teachers spent upward of 12-15 hours each week manually drafting highly specific lesson plans and custom assessment rubrics aligned with Curriculum Development Centre (CDC) Nepal guidelines, leaving limited time for actual classroom engagement.",
    solution: "Deployed SAFAL Teacher AI sandbox and certification course, enabling immediate generation of CDC-compliant curriculum outlines, question banks, and multi-level grading rubrics in both English and professional Nepali.",
    results: [
      "Over 80% reduction in weekly lesson preparation duration.",
      "100% curriculum compliance across all primary subjects.",
      "Reclaimed hours reallocated directly to targeted student-teacher feedback cycles."
    ],
    quote: "SAFAL Teacher AI returned Sundays back to our teachers. Instead of getting bogged down in formatting CDC lesson grids, our teachers are actively working on student interactions.",
    author: "Prasanna Shrestha",
    role: "Secondary Level Mathematics Department Head",
    gradient: "from-blue-600/20 to-cyan-500/5"
  },
  {
    id: "case-biz",
    industry: "Business (SME Enterprises)",
    clientName: "Apex Digital Solutions, Kathmandu",
    challenge: "Managing massive volumes of customer enquiries and repetitive administrative reports created significant bottlenecks as the company scaled, resulting in customer service delays and lost leads.",
    solution: "Designed and integrated a specialized SAFAL Business AI automation engine connected directly to existing invoicing systems and service manuals, assisting support personnel with context-aware responses.",
    results: [
      "65% faster query turnaround time for complex technical FAQs.",
      "Reclaimed 3 hours per day of manual analytics mapping for digital coordinators.",
      "Improved general user engagement metrics by 50% via automated chat channels."
    ],
    quote: "Integrating SAFAL Business AI has liberated our technical department from repetitive reports. It operates as an invaluable digital catalyst for our operations.",
    author: "Sujita Adhikari",
    role: "Director of Technical Engineering",
    gradient: "from-purple-600/20 to-pink-500/5"
  },
  {
    id: "case-gov",
    industry: "Government (Local Public Sector)",
    clientName: "Lekhnath Municipal Council, Kaski",
    challenge: "Cataloging massive archives of physical public records and organizing public grievance redressal mechanisms across diverse languages created substantial administrative delays.",
    solution: "Provided a pilot implementation of SAFAL Municipal AI featuring localized OCR document parsers, automated ticketing, and intuitive bilingual citizens search portals.",
    results: [
      "12,000+ public document records digitized and indexed.",
      "40% drop in overall administrative wait-times for citizen services.",
      "Empowered local public staff via hands-on AI literacy workshops."
    ],
    quote: "Working with SAFAL AI enabled us to transition from dusty paper archives to a fast, computerized citizen inquiry system. They are Nepal's premier partner for public sector modernization.",
    author: "Yogendra B. Thapa",
    role: "Municipal IT Coordination Lead",
    gradient: "from-green-600/20 to-emerald-500/5"
  }
];

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  linkedinUrl: string;
  avatarInitials: string;
  avatarBg: string;
  email: string;
  phone: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-uday",
    name: "Uday Ram Jaishi",
    position: "Chief Executive Officer (CEO)",
    description: "Leading SAFAL AI's vision, partnerships and innovation initiatives to accelerate AI adoption across Nepal.",
    linkedinUrl: "https://linkedin.com/in/uday-ram-jaishi",
    avatarInitials: "URJ",
    avatarBg: "from-[#0A66FF] to-[#00F0FF]",
    email: "uday@safalai.org",
    phone: "+977 9851 101010"
  },
  {
    id: "team-ishwor",
    name: "Ishwor Dhungana",
    position: "Lead AI Trainer",
    description: "Specialized in AI education, teacher empowerment, professional development and practical AI implementation for schools and organizations.",
    linkedinUrl: "https://linkedin.com/in/ishwor-dhungana",
    avatarInitials: "ID",
    avatarBg: "from-[#8A2BE2] to-[#FF007F]",
    email: "ishwor@safalai.org",
    phone: "+977 9851 202020"
  },
  {
    id: "team-kamram",
    name: "Kamram Muazzam",
    position: "AI Solution Engineer",
    description: "Designing and developing AI-powered solutions, automation systems and innovative digital products tailored to organizational needs.",
    linkedinUrl: "https://linkedin.com/in/kamram-muazzam",
    avatarInitials: "KM",
    avatarBg: "from-[#00C853] to-[#009688]",
    email: "kamram@safalai.org",
    phone: "+977 9851 303030"
  }
];


