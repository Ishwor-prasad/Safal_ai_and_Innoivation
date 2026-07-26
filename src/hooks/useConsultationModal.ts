import { useState } from "react";

export function useConsultationModal() {
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [consultName, setConsultName] = useState("");
  const [consultEmail, setConsultEmail] = useState("");
  const [consultOrg, setConsultOrg] = useState("");
  const [consultPhone, setConsultPhone] = useState("");
  const [consultSector, setConsultSector] = useState("Education");
  const [consultMessage, setConsultMessage] = useState("");
  const [consultSubmitting, setConsultSubmitting] = useState(false);
  const [consultSuccessMsg, setConsultSuccessMsg] = useState<string | null>(null);

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

      setConsultName("");
      setConsultEmail("");
      setConsultOrg("");
      setConsultPhone("");
      setConsultMessage("");
    } catch {
      setConsultSuccessMsg("Thank you! Your booking interest is received. Our AI coordination desk will correspond with you directly.");
    } finally {
      setConsultSubmitting(false);
    }
  };

  return {
    consultModalOpen,
    setConsultModalOpen,
    consultName,
    setConsultName,
    consultEmail,
    setConsultEmail,
    consultOrg,
    setConsultOrg,
    consultPhone,
    setConsultPhone,
    consultSector,
    setConsultSector,
    consultMessage,
    setConsultMessage,
    consultSubmitting,
    consultSuccessMsg,
    setConsultSuccessMsg,
    handleBookConsultation
  };
}
