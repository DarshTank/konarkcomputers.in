import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: "Konark Computers — Precision Care for Your Digital World | Rajkot",
    template: "%s | Konark Computers Rajkot",
  },
  description:
    `Trusted computer & laptop repair, IT services, networking, and maintenance since 1999. Serving Rajkot with ${YEARS_OF_EXPERIENCE}+ years of expertise. Call +91-9426429416.`,
  icons: {
    icon: "/kon.webp",
    shortcut: "/kon.webp",
    apple: "/kon.webp",
  },
  keywords: [
    "computer repair Rajkot",
    "laptop service Rajkot",
    "IT support Gujarat",
    "Konark Computers",
    "laptop charger",
    "laptop battery",
    "virus removal",
    "networking",
  ],
  authors: [{ name: "Omesh Tank" }],
  openGraph: {
    title: "Konark Computers — Precision Care for Your Digital World",
    description:
      "Trusted computer & laptop repair, IT services, and maintenance since 1999 in Rajkot, Gujarat.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body>
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
