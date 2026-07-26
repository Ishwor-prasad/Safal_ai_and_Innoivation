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
  image?: string;
}

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
  profileImage?: string;
}

export interface VibeModule {
  id: string;
  week: string;
  title: string;
  topics: string[];
}

export interface VibeSchedule {
  id: string;
  date: string;
  day: string;
  times: string[];
  tag: string;
}

export interface VibeStat {
  id: string;
  value: string;
  label: string;
}

export interface VibeCourseSkill {
  id: string;
  icon: string;
  label: string;
  title?: string;
  description?: string;
}

export interface VibeSuccessStory {
  id: string;
  name: string;
  course: string;
  college: string;
  company: string;
  position: string;
  initial: string;
  gradient: string;
}
