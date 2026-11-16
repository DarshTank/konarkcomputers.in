"use client";

import { ArrowUp } from "lucide-react";
import styles from "./Footer.module.css";

export function BackToTopButton() {
  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={styles.backToTop}
      onClick={handleClick}
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
