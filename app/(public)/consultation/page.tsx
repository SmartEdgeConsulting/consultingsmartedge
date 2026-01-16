import ConsultationForm from "@/forms/ConsultationForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Get a Free Data Strategy Session",
  description:
    "We’ll help you understand how data can improve your decisions, marketing, customer insights, and operations.",
  keywords: [
    "SmartEdge",
    "Events",
    "Consulting",
    "Consultation",
    "Analytics",
    "Data-Driven Decisions",
  ],
  openGraph: {
    title: "Get a Free Data Strategy Session",
    description:
      "We’ll help you understand how data can improve your decisions, marketing, customer insights, and operations.",
      url: "https://www.consultingsmartedge.com/consultation",
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
    title: "Get a Free Data Strategy Session",
    description:
      "We’ll help you understand how data can improve your decisions, marketing, customer insights, and operations."
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
    canonical: "https://www.consultingsmartedge.com/consultation",
  },
};

const ConsultationPage = () => {
  return (
    <main className="mt-16 bg-primary/10 backdrop-blur-md">
      <ConsultationForm />
    </main>
  );
};

export default ConsultationPage;
