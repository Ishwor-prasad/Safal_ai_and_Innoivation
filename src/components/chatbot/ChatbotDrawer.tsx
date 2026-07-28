import React from "react";
import Markdown from "react-markdown";
import { Heart, X, Loader2, Send } from "lucide-react";

interface ChatbotDrawerProps {
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  chatMessages: Array<{ role: "user" | "assistant"; content: string }>;
  chatInput: string;
  setChatInput: (val: string) => void;
  chatLoading: boolean;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  handleSendChatMessage: (e?: React.FormEvent, customText?: string) => void;
  setConsultModalOpen: (open: boolean) => void;
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({
  chatOpen,
  setChatOpen,
  chatMessages,
  chatInput,
  setChatInput,
  chatLoading,
  chatEndRef,
  handleSendChatMessage,
  setConsultModalOpen
}) => {
  if (!chatOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-none select-none">
      <div
        id="chatbot-drawer"
        className="w-80 sm:w-96 max-w-[calc(100vw-2rem)] h-[min(480px,calc(100vh-8rem))] bg-dark-secondary dark-section rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden pointer-events-auto transition-all duration-300 transform scale-100 opacity-100 mb-2"
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

        {/* Suggested Chip list */}
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
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs font-light leading-relaxed ${
                    isAI
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
          onSubmit={(e) => handleSendChatMessage(e)}
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
            className="h-8 w-8 rounded-xl bg-brand hover:bg-brand-light disabled:bg-gray-700 text-white flex items-center justify-center transition-all cursor-pointer border-none shrink-0"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
