import DataLab from "@/sections/DataLab";
import DataLabHero from "@/sections/hero/DataLabHero";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Get Automated Insights in Minutes.",
  description: "Upload Your Data for analysis and Get Automated Insights in Minutes",
  keywords: [
    "SmartEdge",
    "Events",
    "Consulting",
    "Consultation",
    "Analytics",
    "Data-Driven Decisions",
  ],
  openGraph: {
    title: "Get Automated Insights in Minutes.",
    description: "Upload Your Data for analysis and Get Automated Insights in Minutes",
    url: "https://www.consultingsmartedge.com/automated-data-lab",
    siteName: "SmartEdge Consulting & Analytics",
    images: [
      {
        url: "/smartedgelogo.jpg",
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
    title: "Get Automated Insights in Minutes.",
    description: "Upload Your Data for analysis and Get Automated Insights in Minutes",
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
    canonical: "https://www.consultingsmartedge.com/automated-data-lab",
  },
};

const DataLabPage = () => {
  return (
    <main className="mt-16">
      <DataLabHero />
      <DataLab />
    </main>
  );
};

export default DataLabPage;
