import { useState, useEffect } from "react";

export const LOADING_STEPS = [
  "Analyzing Nepal's CDC Syllabus Guidelines...",
  "Querying NEB Standard Rubrics & Directives...",
  "Drafting detailed 45-Minute Lesson timeline structures...",
  "Formulating localized Nepalese testing worksheets...",
  "Optimizing multilingual delivery constraints..."
];

export function useSandboxCompiler() {
  const [demoGrade, setDemoGrade] = useState("Grade 8");
  const [demoSubject, setDemoSubject] = useState("Science");
  const [demoTopic, setDemoTopic] = useState("Simple Machines");
  const [demoLanguage, setDemoLanguage] = useState("English");
  const [demoFocus, setDemoFocus] = useState("");
  const [demoLoading, setDemoLoading] = useState(false);
  const [currentLoadingStep, setCurrentLoadingStep] = useState(0);
  const [demoResult, setDemoResult] = useState<string | null>(null);
  const [demoCopied, setDemoCopied] = useState(false);
  const [demoIsSimulated, setDemoIsSimulated] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    let stepInterval: any;
    if (demoLoading) {
      stepInterval = setInterval(() => {
        setCurrentLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 2500);
    } else {
      setCurrentLoadingStep(0);
    }
    return () => clearInterval(stepInterval);
  }, [demoLoading]);

  const handleGenerateTeacherAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoLoading(true);
    setDemoResult(null);
    setErrorText(null);

    try {
      const response = await fetch("/api/teacher-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade: demoGrade,
          subject: demoSubject,
          topic: demoTopic,
          language: demoLanguage,
          focusArea: demoFocus,
        }),
      });

      if (!response.ok) {
        throw new Error("Generation request received an unexpected status from the service.");
      }

      const data = await response.json();
      setDemoResult(data.content);
      setDemoIsSimulated(!!data.isSimulated);
    } catch (err: any) {
      console.error(err);
      setErrorText("Our high-performance server encountered an interruption. Please try clicking generate again.");
    } finally {
      setDemoLoading(false);
    }
  };

  const handleCopyDemoClipboard = () => {
    if (!demoResult) return;
    navigator.clipboard.writeText(demoResult);
    setDemoCopied(true);
    setTimeout(() => setDemoCopied(false), 2000);
  };

  return {
    demoGrade,
    setDemoGrade,
    demoSubject,
    setDemoSubject,
    demoTopic,
    setDemoTopic,
    demoLanguage,
    setDemoLanguage,
    demoFocus,
    setDemoFocus,
    demoLoading,
    currentLoadingStep,
    demoResult,
    demoCopied,
    demoIsSimulated,
    errorText,
    loadingSteps: LOADING_STEPS,
    handleGenerateTeacherAI,
    handleCopyDemoClipboard
  };
}
