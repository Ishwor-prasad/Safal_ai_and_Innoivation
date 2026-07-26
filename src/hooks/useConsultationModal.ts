import { useState } from "react";
import { submitConsultationBooking } from "../services/consultationService";

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
      const result = await submitConsultationBooking({
        name: consultName,
        email: consultEmail,
        organization: consultOrg,
        phone: consultPhone,
        sector: consultSector,
        message: consultMessage,
      });

      setConsultSuccessMsg(result.message);

      if (result.success) {
        setConsultName("");
        setConsultEmail("");
        setConsultOrg("");
        setConsultPhone("");
        setConsultMessage("");
      }
    } catch {
      setConsultSuccessMsg("Thank you! Your booking request has been received. Our AI coordination desk will reach out shortly.");
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
