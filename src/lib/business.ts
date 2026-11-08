// Konark Computers - Canonical Business Information
// Established 1999 in Rajkot, Gujarat, India.
import { YEARS_OF_EXPERIENCE, START_YEAR } from "./constants";

export const BUSINESS = {
  name: "Konark Computers",
  legalName: "Konark Computers",
  founder: "Omesh Tank",
  foundingYear: START_YEAR,
  yearsOfExperience: YEARS_OF_EXPERIENCE,
  phone: "+91-9426429416",
  phoneDisplay: "+91 942 642 9416",
  email: "omesh_tank@yahoo.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.konarkcomputers.in",
  facebookUrl: "https://www.facebook.com/Konark.Computers/",
  instagramUrl: "https://www.instagram.com/omesh_konark?obrf=c2E0Z3V0ZDQ2d2hj",
  youtubeUrl: "https://www.youtube.com/@konarkcomputers",
  hoursDisplay: "Mon – Sat: 9:00 AM – 9:00 PM",
  hoursDays: "Monday through Saturday",
  hoursOpeningTime: "09:00",
  hoursClosingTime: "21:00",
  address: {
    street: "234-Vitt Bhavan, Near Gondal Road Flyover",
    city: "Rajkot",
    state: "Gujarat",
    postalCode: "360002",
    country: "IN",
    countryName: "India",
    full: "234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot, Gujarat 360002, India",
  },
  geo: {
    latitude: 22.277962,
    longitude: 70.798489,
  },
  priceRange: "₹₹",
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=Konark%20Computers%2C%20Rajkot%2C%20Gujarat%2C%20India&t=&z=14&ie=UTF8&iwloc=&output=embed",
  googleMapsPlaceUrl:
    "https://www.google.com/maps?ll=22.277962,70.798489&z=14&t=m&hl=en-US&gl=US&mapclient=embed&cid=1162576568112931297",
  // TODO(owner): Confirm address consistency. The Google Reviews link query currently uses "Shrimad Bhavan Dhebar Rd", update once confirmed.
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Konark+Computers+Shrimad+Bhavan+Dhebar+Rd+Rajkot",
} as const;

