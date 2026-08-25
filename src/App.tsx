import React from "react";
import { translations } from "./translations";
import { useNavigation } from "./hooks/useNavigation";
import { useSandboxCompiler } from "./hooks/useSandboxCompiler";
import { useConsultationModal } from "./hooks/useConsultationModal";
import { useContactForm } from "./hooks/useContactForm";
import { useChatbot } from "./hooks/useChatbot";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { WhatsAppDock } from "./components/layout/WhatsAppDock";
import { ConsultationModal } from "./components/modals/ConsultationModal";
import { ChatbotDrawer } from "./components/chatbot/ChatbotDrawer";
import { HomePage } from "./pages/HomePage";
import { VibeCodingPage } from "./pages/VibeCodingPage";
import { HelpCircle } from "lucide-react";

export function App() {
  const nav = useNavigation();
  const sandbox = useSandboxCompiler();
  const consult = useConsultationModal();
  const contact = useContactForm();
  const chat = useChatbot();

  const t = translations[nav.language] || translations.en;

  const renderNotFoundPage = () => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
      <div className="h-16 w-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
        <HelpCircle className="h-8 w-8" />
      </div>
      <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Page Not Found</h2>
      <p className="text-gray-600 text-sm max-w-md mb-8">The link or route you requested might have been moved or does not exist. Let's return back to the main workspace.</p>
      <button
        onClick={() => nav.navigate("/")}
        className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3 rounded-lg transition-all border-none cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-brand selection:text-white overflow-x-hidden" id="safal-main">
      <Navbar
        scrolled={nav.scrolled}
        activeSection={nav.activeSection}
        path={nav.path}
        language={nav.language}
        mobileMenuOpen={nav.mobileMenuOpen}
        setMobileMenuOpen={nav.setMobileMenuOpen}
        setLanguage={nav.setLanguage}
        navigate={nav.navigate}
        handleNavClick={nav.handleNavClick}
        setConsultModalOpen={consult.setConsultModalOpen}
      />

      <main className="flex-1 flex flex-col">
        {nav.path === "/" ? (
          <HomePage
            t={t}
            handleNavClick={nav.handleNavClick}
            navigate={nav.navigate}
            setConsultModalOpen={consult.setConsultModalOpen}
            setConsultSector={consult.setConsultSector}
            setConsultMessage={consult.setConsultMessage}
            sandboxProps={{
              demoGrade: sandbox.demoGrade,
              setDemoGrade: sandbox.setDemoGrade,
              demoSubject: sandbox.demoSubject,
              setDemoSubject: sandbox.setDemoSubject,
              demoTopic: sandbox.demoTopic,
              setDemoTopic: sandbox.setDemoTopic,
              sandboxLoading: sandbox.demoLoading,
              compiledResult: sandbox.demoResult,
              handleTriggerSandbox: sandbox.handleGenerateTeacherAI
            }}
            contactProps={{
              contactName: contact.contactName,
              setContactName: contact.setContactName,
              contactOrg: contact.contactOrg,
              setContactOrg: contact.setContactOrg,
              contactEmail: contact.contactEmail,
              setContactEmail: contact.setContactEmail,
              contactPhone: contact.contactPhone,
              setContactPhone: contact.setContactPhone,
              contactMessage: contact.contactMessage,
              setContactMessage: contact.setContactMessage,
              contactSubmitting: contact.contactSubmitting,
              contactSuccessMsg: contact.contactSuccessMsg,
              setContactSuccessMsg: contact.setContactSuccessMsg,
              handleContactSubmit: contact.handleContactSubmit
            }}
          />
        ) : nav.path === "/courses/vibe-coding" ? (
          <VibeCodingPage
            navigate={nav.navigate}
            setConsultSector={consult.setConsultSector}
            setConsultMessage={consult.setConsultMessage}
            setConsultModalOpen={consult.setConsultModalOpen}
          />
        ) : (
          renderNotFoundPage()
        )}
      </main>

      <Footer setConsultModalOpen={consult.setConsultModalOpen} />

      <WhatsAppDock
        showTopButton={nav.showTopButton}
        setChatOpen={chat.setChatOpen}
      />

      <ConsultationModal
        consultModalOpen={consult.consultModalOpen}
        setConsultModalOpen={consult.setConsultModalOpen}
        consultName={consult.consultName}
        setConsultName={consult.setConsultName}
        consultEmail={consult.consultEmail}
        setConsultEmail={consult.setConsultEmail}
        consultOrg={consult.consultOrg}
        setConsultOrg={consult.setConsultOrg}
        consultPhone={consult.consultPhone}
        setConsultPhone={consult.setConsultPhone}
        consultSector={consult.consultSector}
        setConsultSector={consult.setConsultSector}
        consultMessage={consult.consultMessage}
        setConsultMessage={consult.setConsultMessage}
        consultSubmitting={consult.consultSubmitting}
        consultSuccessMsg={consult.consultSuccessMsg}
        setConsultSuccessMsg={consult.setConsultSuccessMsg}
        handleBookConsultation={consult.handleBookConsultation}
      />

      <ChatbotDrawer
        chatOpen={chat.chatOpen}
        setChatOpen={chat.setChatOpen}
        chatMessages={chat.chatMessages}
        chatInput={chat.chatInput}
        setChatInput={chat.setChatInput}
        chatLoading={chat.chatLoading}
        chatEndRef={chat.chatEndRef}
        handleSendChatMessage={chat.handleSendChatMessage}
        setConsultModalOpen={consult.setConsultModalOpen}
      />
    </div>
  );
}

export default App;
