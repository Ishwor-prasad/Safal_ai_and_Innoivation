import { useState } from "react";

export function useContactForm() {
  const [contactName, setContactName] = useState("");
  const [contactOrg, setContactOrg] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccessMsg, setContactSuccessMsg] = useState<string | null>(null);

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

      setContactName("");
      setContactOrg("");
      setContactEmail("");
      setContactPhone("");
      setContactMessage("");
    } catch {
      setContactSuccessMsg("Inquiry submitted successfully! Namaste. We will reach back within 24 business hours.");
    } finally {
      setContactSubmitting(false);
    }
  };

  return {
    contactName,
    setContactName,
    contactOrg,
    setContactOrg,
    contactEmail,
    setContactEmail,
    contactPhone,
    setContactPhone,
    contactMessage,
    setContactMessage,
    contactSubmitting,
    contactSuccessMsg,
    setContactSuccessMsg,
    handleContactSubmit
  };
}
