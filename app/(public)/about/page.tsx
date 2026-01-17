import type { Metadata } from "next";
import Mission from "@/sections/Mission";
import AboutHero from "@/sections/hero/AboutHero";
import Teams from "@/sections/Teams";
import Values from "@/sections/Values";

export const metadata: Metadata = {
  title:
    "About SmartEdge - Our Mission, Values, and Team",
  description:
    "Learn about SmartEdge Consulting & Analytics, our mission to empower businesses to make smarter decisions using data, our core values, and the dedicated team behind our success.",
  keywords: [
    "SmartEdge",
    "About Us",
    "Mission",
    "Values",
    "Team",
    "Consulting",
    "Analytics",
    "Data-Driven Decisions",
  ],
  openGraph: {
    title:
      "About SmartEdge Consulting & Analytics - Our Mission, Values, and Team",
    description:
      "Learn about SmartEdge's mission to empower businesses to make smarter decisions using data, our core values, and the dedicated team behind our success.",
    url: "https://www.consultingsmartedge.com/about",
    siteName: "SmartEdge Consulting & Analytics",
    images: [
      {
        url: "/smartedge_logo.png",
        width: 1200,
        height: 630,
        alt: "SmartEdge Consulting & Analytics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "About SmartEdge - Our Mission, Values, and Team",
    description:
      "Learn about SmartEdge's mission to empower businesses to make smarter decisions using data, our core values, and the dedicated team behind our success."
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.consultingsmartedge.com/about",
  },
};

const AboutPage = () => {
  return (
    <main className="mt-16">
      <AboutHero />
      <Mission />
      <Values />
      <Teams />
    </main>
  );
};

export default AboutPage;
