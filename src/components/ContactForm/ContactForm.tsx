"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Send, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import styles from "@/app/contact/page.module.css";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setToast(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setToast({
          type: "success",
          message:
            data.message ||
            "Thank you! Your message has been sent successfully. We will get back to you shortly.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setToast({
          type: "error",
          message:
            data.error || "Failed to send your message. Please try again or call us.",
        });
      }
    } catch (err) {
      setStatus("error");
      setToast({
        type: "error",
        message:
          "Network error. Please check your internet connection or call us directly.",
      });
    }
  };

  const toastElement = toast ? (
    <div
      role="alert"
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 999999,
        maxWidth: "min(90vw, 420px)",
        padding: "1rem 1.25rem",
        borderRadius: "var(--radius-lg, 16px)",
        background: toast.type === "success" ? "#f0fdf4" : "#fef2f2",
        border: `1.5px solid ${toast.type === "success" ? "#2ecc71" : "#e74c3c"}`,
        color: toast.type === "success" ? "#15803d" : "#b91c1c",
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.22)",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        animation: "slideInDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      {toast.type === "success" ? (
        <CheckCircle2 size={22} style={{ flexShrink: 0, marginTop: "2px", color: "#2ecc71" }} />
      ) : (
        <AlertCircle size={22} style={{ flexShrink: 0, marginTop: "2px", color: "#e74c3c" }} />
      )}
      <div style={{ flex: 1, fontSize: "0.92rem", lineHeight: 1.5, fontWeight: 500 }}>
        {toast.message}
      </div>
      <button
        onClick={() => setToast(null)}
        aria-label="Close notification"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "2px",
          color: "inherit",
          opacity: 0.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
        }}
      >
        <X size={18} />
      </button>
    </div>
  ) : null;

  return (
    <>
      {mounted && toastElement && createPortal(toastElement, document.body)}

      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>
          <Send size={24} />
          Say Hello to Us
        </h2>
        <p className={styles.formSubtitle}>
          Fill out the form and we&apos;ll get back to you within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your name"
              required
              disabled={status === "loading"}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your email"
              required
              disabled={status === "loading"}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.input}
              placeholder="What is this about?"
              disabled={status === "loading"}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Message *
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
              rows={5}
              placeholder="Tell us how we can help..."
              required
              disabled={status === "loading"}
            />
          </div>

          <button
            type="submit"
            className={`btn btn--primary ${styles.submitBtn}`}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>

      <style jsx global>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
