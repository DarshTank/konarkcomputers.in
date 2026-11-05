import { BUSINESS } from "@/lib/business";

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ComputerStore",
    name: BUSINESS.name,
    url: BUSINESS.siteUrl,
    image: `${BUSINESS.siteUrl}/kon.webp`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    foundingDate: `${BUSINESS.foundingYear}`,
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: BUSINESS.hoursOpeningTime,
        closes: BUSINESS.hoursClosingTime,
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Rajkot",
    },
    sameAs: [BUSINESS.facebookUrl],
  };

  // Escape '<' as '\u003c' to prevent script injection vulnerabilities
  const jsonString = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

