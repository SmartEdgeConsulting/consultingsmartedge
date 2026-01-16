import Research from "@/sections/Research";
import ResearchForm from "@/forms/ResearchForm";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Market & Investment Research Services - SmartEdge Consulting & Analytics",
  description:
    "Understanding your market, customers, and competition with research-driven intelligence that fuels strategy.",
  keywords: [
    "SmartEdge",
    "Services",
    "Consulting",
    "Analytics",
    "Data-Driven Decisions",
    "Research",
    "Market Analysis",
  ],
  openGraph: {
    title:
      "Market & Investment Research Services - SmartEdge Consulting & Analytics",
    description:
      "Understanding your market, customers, and competition with research-driven intelligence that fuels strategy.",
    url: "https://www.consultingsmartedge.com/services/research",
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
      "Market & Investment Research Services - SmartEdge Consulting & Analytics",
    description:
      "Understanding your market, customers, and competition with research-driven intelligence that fuels strategy."
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
    canonical: "https://www.consultingsmartedge.com/services/research",
  },
};


const page = () => {
  return (
    <main>
      <Research />
      <ResearchForm />
    </main>
  );
};

export default page;
