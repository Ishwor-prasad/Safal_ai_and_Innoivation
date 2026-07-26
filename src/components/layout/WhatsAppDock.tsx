import React from "react";
import { ArrowUp, MessageSquare } from "lucide-react";

interface WhatsAppDockProps {
  showTopButton: boolean;
  setChatOpen: (open: boolean) => void;
}

export const WhatsAppDock: React.FC<WhatsAppDockProps> = ({ showTopButton, setChatOpen }) => {
  return (
    <>
      {/* Floating Action Dock */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none select-none">
        <a
          id="float-whatsapp-link"
          href="https://wa.me/9779869627250?text=Hello%20Safal%20AI%20and%20Innovation%20Centre"
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 w-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all pointer-events-auto border-2 border-white cursor-pointer group"
          title="Direct WhatsApp Support"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.947 9.947 0 0 0 4.887 1.282c5.506 0 9.99-4.474 9.991-9.984a9.972 9.972 0 0 0-9.996-9.951zm0 18.294a8.276 8.276 0 0 1-4.225-1.157l-.304-.18-3.136.82.835-3.056-.197-.313a8.293 8.293 0 0 1-1.272-4.423c.001-4.57 3.722-8.29 8.297-8.29a8.28 8.28 0 0 1 8.293 8.296c-.001 4.572-3.725 8.293-8.296 8.293zm4.542-6.208c-.249-.125-1.472-.726-1.7-.81-.228-.083-.393-.125-.558.125-.165.25-.638.809-.783.974-.144.166-.29.184-.539.06a6.793 6.793 0 0 1-1.997-1.232c-.776-.692-1.301-1.547-1.453-1.81-.153-.263-.016-.406.117-.538.12-.12.249-.29.373-.434.125-.144.166-.25.25-.415.083-.167.042-.313-.02-.439-.063-.125-.558-1.347-.765-1.849-.2-.486-.402-.422-.558-.43h-.475c-.165 0-.434.062-.661.312-.228.25-.868.85-.868 2.072 0 1.222.888 2.4 1.012 2.564.125.166 1.748 2.67 4.235 3.74.591.255 1.053.408 1.412.523.593.189 1.134.162 1.561.098.476-.071 1.472-.601 1.68-1.182.207-.581.207-1.08.145-1.182-.062-.102-.228-.166-.477-.291z" />
          </svg>
        </a>

        <button
          id="trigger-chatbot-btn"
          onClick={() => setChatOpen(true)}
          className="h-12 w-12 rounded-full bg-brand text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all pointer-events-auto border-2 border-white cursor-pointer relative"
          title="Open SAFAL AI Mitra"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
        </button>

        {showTopButton && (
          <button
            id="scroll-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="h-10 w-10 rounded-full bg-slate-900/90 text-white flex items-center justify-center shadow-xl hover:bg-slate-800 transition-all pointer-events-auto border border-slate-700 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}
      </div>
    </>
  );
};
