import type { Metadata } from "next";
import Script from "next/script";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { LocalBusinessJsonLd } from "@/components/Seo/LocalBusinessJsonLd";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.konarkcomputers.in";

const siteDescription = `Computer & laptop repair in Rajkot since 1999. ${YEARS_OF_EXPERIENCE}+ years of trusted IT support, chip-level service & parts. Call +91 942 642 9416 for doorstep service.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Computer & Laptop Repair in Rajkot | Konark Computers – Since 1999",
    template: "%s | Konark Computers Rajkot",
  },
  description: siteDescription,
  applicationName: "Konark Computers",
  icons: {
    icon: "/kon.webp",
    shortcut: "/kon.webp",
    apple: "/kon.webp",
  },
  authors: [{ name: "Omesh Tank" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "Konark Computers",
    title: "Computer & Laptop Repair in Rajkot | Konark Computers – Since 1999",
    description: siteDescription,
    type: "website",
    locale: "en_IN",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Computer & Laptop Repair in Rajkot | Konark Computers – Since 1999",
    description: siteDescription,
  },
  // verification: { google: "TODO(owner)" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en-IN" className={`${dmSerifDisplay.variable} ${manrope.variable}`}>
      <body>
        <LocalBusinessJsonLd />
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
