import Events from "@/sections/Events";
import EventHero from "@/sections/hero/EventsHero";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Some of Our Events - Check Out some of our Latest Events",
  description:
    "Learn about SmartEdge Consulting & Analytics events, and be a part of it",
  keywords: [
    "SmartEdge",
    "Events",
    "Consulting",
    "Analytics",
    "Data-Driven Decisions",
  ],
  openGraph: {
  title: "Some of Our Events - Check Out some of our Latest Events",
    description:
      "Learn about SmartEdge Consulting & Analytics events, and be a part of it",
    url: "https://www.consultingsmartedge.com/events",
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
  title: "Some of Our Events - Check Out some of our Latest Events",
    description:
      "Learn about SmartEdge Consulting & Analytics events, and be a part of it"
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
    canonical: "https://www.consultingsmartedge.com/events",
  },
};

const EventsPage = () => {
  return (
    <main className="mt-16">
      <EventHero />
      <Events />
    </main>
  );
};

export default EventsPage;
