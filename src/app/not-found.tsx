import Link from "next/link";
import { Phone, ArrowRight, Home, Wrench, Package, HelpCircle } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export default function NotFound() {
  const quickLinks = [
    { href: "/", label: "Home Page", icon: Home, desc: "Explore computer workshop" },
    { href: "/services/laptop-repair-rajkot", label: "Laptop Repair", icon: Wrench, desc: "Screen, battery & hardware" },
    { href: "/products", label: "Parts & Chargers", icon: Package, desc: "Genuine adapters & storage" },
    { href: "/contact", label: "Contact & Location", icon: HelpCircle, desc: "Workshop address & phone" },
  ];

  return (
    <div
      style={{
        padding: "clamp(4rem, 8vw, 8rem) 0",
        background: "var(--color-surface)",
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container" style={{ maxWidth: "780px", textAlign: "center" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 8vw, 6rem)",
            color: "var(--color-accent)",
            lineHeight: 1,
            display: "block",
            marginBottom: "var(--space-2)",
            fontWeight: 700,
          }}
        >
          404
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-3xl)",
            color: "var(--color-dark)",
            marginBottom: "var(--space-4)",
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.8,
            marginBottom: "var(--space-8)",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          The page you are looking for may have moved, been renamed, or is temporarily unavailable. Please explore our main sections below or contact our Rajkot workshop directly.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--space-4)",
            marginBottom: "var(--space-8)",
          }}
        >
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "16px 18px",
                  background: "#ffffff",
                  border: "1px solid rgba(26, 26, 46, 0.12)",
                  borderRadius: "var(--radius-lg)",
                  textDecoration: "none",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                  transition: "all var(--duration-fast)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(15, 150, 156, 0.1)",
                    color: "var(--color-teal)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "var(--color-dark)",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#64748b",
                      marginTop: "2px",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
                <ArrowRight size={16} style={{ color: "#94a3b8", flexShrink: 0 }} />
              </Link>
            );
          })}
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid rgba(26, 26, 46, 0.1)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-6)",
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-4)",
            flexWrap: "wrap",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        >
          <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", fontWeight: 500 }}>
            Need immediate computer assistance in Rajkot?
          </span>
          <a
            href={`tel:${BUSINESS.phone}`}
            className="btn btn--primary"
            style={{ gap: "var(--space-2)", fontSize: "var(--text-sm)" }}
          >
            <Phone size={16} />
            Call {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
