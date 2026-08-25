import React, { useState } from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { SolutionsSection } from "../components/sections/SolutionsSection";
import { ProductsSection } from "../components/sections/ProductsSection";
import { SandboxSection } from "../components/sections/SandboxSection";
import { CaseStudiesSection } from "../components/sections/CaseStudiesSection";
import { StatsSection } from "../components/sections/StatsSection";
import { LearningHubSection } from "../components/sections/LearningHubSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { PartnersSection } from "../components/sections/PartnersSection";
import { AboutSection } from "../components/sections/AboutSection";
import { TeamSection } from "../components/sections/TeamSection";
import { ContactSection } from "../components/sections/ContactSection";
import { SyllabusModal } from "../components/modals/SyllabusModal";
import { TrainingProgram } from "../types";

interface HomePageProps {
  t: any;
  handleNavClick: (sectionId: string) => void;
  navigate: (path: string) => void;
  setConsultModalOpen: (open: boolean) => void;
  setConsultSector: (sector: string) => void;
  setConsultMessage: (msg: string) => void;
  sandboxProps: {
    demoGrade: string;
    setDemoGrade: (g: string) => void;
    demoSubject: string;
    setDemoSubject: (s: string) => void;
    demoTopic: string;
    setDemoTopic: (t: string) => void;
    sandboxLoading: boolean;
    compiledResult: string | null;
    handleTriggerSandbox: (e: React.FormEvent) => void;
  };
  contactProps: {
    contactName: string;
    setContactName: (val: string) => void;
    contactOrg: string;
    setContactOrg: (val: string) => void;
    contactEmail: string;
    setContactEmail: (val: string) => void;
    contactPhone: string;
    setContactPhone: (val: string) => void;
    contactMessage: string;
    setContactMessage: (val: string) => void;
    contactSubmitting: boolean;
    contactSuccessMsg: string | null;
    setContactSuccessMsg: (msg: string | null) => void;
    handleContactSubmit: (e: React.FormEvent) => void;
  };
}

export const HomePage: React.FC<HomePageProps> = ({
  t,
  handleNavClick,
  navigate,
  setConsultModalOpen,
  setConsultSector,
  setConsultMessage,
  sandboxProps,
  contactProps
}) => {
  const [selectedSyllabusProg, setSelectedSyllabusProg] = useState<TrainingProgram | null>(null);

  return (
    <>
      <HeroSection
        t={t}
        handleNavClick={handleNavClick}
        setConsultModalOpen={setConsultModalOpen}
      />

      <PartnersSection />

      <SolutionsSection
        setConsultModalOpen={setConsultModalOpen}
      />

      <ProductsSection
        handleNavClick={handleNavClick}
        navigate={navigate}
        setConsultModalOpen={setConsultModalOpen}
      />

      <SandboxSection {...sandboxProps} />

      <TestimonialsSection />

      <CaseStudiesSection />

      <StatsSection />

      <LearningHubSection
        setSelectedSyllabusProg={setSelectedSyllabusProg}
        setConsultSector={setConsultSector}
        setConsultMessage={setConsultMessage}
        setConsultModalOpen={setConsultModalOpen}
      />

      <AboutSection />

      <TeamSection />

      <ContactSection {...contactProps} />

      <SyllabusModal
        selectedSyllabusProg={selectedSyllabusProg}
        setSelectedSyllabusProg={setSelectedSyllabusProg}
        setConsultSector={setConsultSector}
        setConsultMessage={setConsultMessage}
        setConsultModalOpen={setConsultModalOpen}
      />
    </>
  );
};
