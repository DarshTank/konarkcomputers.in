"use client";

import { PhoneCall } from "lucide-react";
import { usePathname } from "next/navigation";
import { BUSINESS } from "@/lib/business";
import styles from "./FloatingCallButton.module.css";

export function FloatingCallButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      href={`tel:${BUSINESS.phone}`}
      className={styles.button}
      aria-label={`Call Konark Computers at ${BUSINESS.phoneDisplay}`}
    >
      <PhoneCall size={20} aria-hidden="true" />
    </a>
  );
}
