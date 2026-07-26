import { useState } from "react";
import { submitCourseEnrollment } from "../services/enrollmentService";

export function useEnrollmentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [courseId, setCourseId] = useState("vibe-coding");
  const [courseTitle, setCourseTitle] = useState("Vibe Coding with AI");
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [preferredSchedule, setPreferredSchedule] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleEnrollmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);

    try {
      const result = await submitCourseEnrollment({
        name,
        email,
        phone,
        courseId,
        courseTitle,
        selectedBatchId,
        preferredSchedule,
      });

      setSuccessMsg(result.message);

      if (result.success) {
        setName("");
        setEmail("");
        setPhone("");
      }
    } catch {
      setSuccessMsg("Enrollment registered! Our admissions desk will contact you via email.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    courseId,
    setCourseId,
    courseTitle,
    setCourseTitle,
    selectedBatchId,
    setSelectedBatchId,
    preferredSchedule,
    setPreferredSchedule,
    submitting,
    successMsg,
    setSuccessMsg,
    handleEnrollmentSubmit,
  };
}
