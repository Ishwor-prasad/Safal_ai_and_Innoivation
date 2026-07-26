import { useState, useEffect } from "react";

export function useNavigation() {
  const [language, setLanguage] = useState<"en" | "ne">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [path, setPath] = useState(window.location.pathname);
  const [activeSection, setActiveSection] = useState("hero");

  const navigate = (newPath: string) => {
    window.history.pushState({}, "", newPath);
    setPath(newPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (sectionId: string) => {
    if (path !== "/") {
      window.history.pushState({}, "", "/");
      setPath("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      if (window.scrollY > 500) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }

      const sections = ["hero", "solutions", "products", "training", "vibe-coding", "about", "team", "contact"];
      const scrollPosition = window.scrollY + 200;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    language,
    setLanguage,
    mobileMenuOpen,
    setMobileMenuOpen,
    scrolled,
    showTopButton,
    path,
    activeSection,
    navigate,
    handleNavClick
  };
}
