import Link from "next/link";
import { Phone, ArrowRight, Home, Wrench, Package, HelpCircle } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export default function NotFound() {
  return (
    <div
      style={{
        padding: "clamp(4rem, 8vw, 8rem) 0",
        background: "var(--color-surface)",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container" style={{ maxWidth: "760px", textAlign: "center" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 8vw, 6rem)",
            color: "var(--color-accent)",
            lineHeight: 1,
            display: "block",
            marginBottom: "var(--space-2)",
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
          }}
        >
          The page you are looking for may have moved, been renamed, or is temporarily unavailable. Please explore our main sections below or contact our Rajkot workshop directly.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-4)",
            marginBottom: "var(--space-8)",
            textAlign: "left",
          }}
        >
          <Link
            href="/"
            className="btn btn--outline"
            style={{ justifyContent: "flex-start", gap: "var(--space-3)", padding: "var(--space-4)" }}
          >
            <Home size={18} style={{ color: "var(--color-accent)" }} />
            <span>Home Page</span>
          </Link>
          <Link
            href="/services/laptop-repair-rajkot"
            className="btn btn--outline"
            style={{ justifyContent: "flex-start", gap: "var(--space-3)", padding: "var(--space-4)" }}
          >
            <Wrench size={18} style={{ color: "var(--color-accent)" }} />
            <span>Laptop Repair</span>
          </Link>
          <Link
            href="/products"
            className="btn btn--outline"
            style={{ justifyContent: "flex-start", gap: "var(--space-3)", padding: "var(--space-4)" }}
          >
            <Package size={18} style={{ color: "var(--color-accent)" }} />
            <span>Parts &amp; Chargers</span>
          </Link>
          <Link
            href="/contact"
            className="btn btn--outline"
            style={{ justifyContent: "flex-start", gap: "var(--space-3)", padding: "var(--space-4)" }}
          >
            <HelpCircle size={18} style={{ color: "var(--color-accent)" }} />
            <span>Contact &amp; Location</span>
          </Link>
        </div>

        <div
          style={{
            background: "var(--color-white)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-6)",
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-4)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
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

