import { useState, useEffect, useRef } from "react";

export function useChatbot() {
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
      const apiMessages = updated.map((m) => ({
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
      setChatMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having a bit of trouble communicating with my neural network right now. Please try again in a moment, or feel free to email our support coordinate at **info@safalai.com.np**."
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return {
    chatOpen,
    setChatOpen,
    chatMessages,
    chatInput,
    setChatInput,
    chatLoading,
    chatEndRef,
    handleSendChatMessage
  };
}
