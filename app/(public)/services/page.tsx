import ServiceHero from "@/sections/hero/ServiceHero";
import Services from "@/sections/Services";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "SmartEdge's Services - Solutions That Move Businesses Forward",
  description:
    "Discover SmartEdge's comprehensive services designed to help businesses leverage data and analytics for smarter decision-making and sustainable growth.",
  keywords: [
    "SmartEdge",
    "Services",
    "Consulting",
    "Analytics",
    "Data-Driven Decisions",
    "Business Intelligence",
    "Data Analytics",
    "Predictive Analytics",
    "Intelligence Automation",
  ],
  openGraph: {
    title:
      "SmartEdge Consulting & Analytics Services - Solutions That Move Businesses Forward",
    description:
      "Discover SmartEdge's comprehensive services designed to help businesses leverage data and analytics for smarter decision-making and sustainable growth.",
    url: "https://www.consultingsmartedge.com/services",
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
      "SmartEdge Consulting & Analytics Services - Solutions That Move Businesses Forward",
    description:
      "Discover SmartEdge's comprehensive services designed to help businesses leverage data and analytics for smarter decision-making and sustainable growth."
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
    canonical: "https://www.consultingsmartedge.com/services",
  },
};

const ServicePage = () => {
  return (
    <main>
      <ServiceHero />
      <Services />
    </main>
  );
};

export default ServicePage;
