import Testimonials from "@/components/Testimonials";
import BootcampDetails from "@/sections/BootcampDetails";
import BootcampHero from "@/sections/hero/BootcampHero";
import { client } from "@/src/sanity/client";
import { getVideoTestimonials } from "@/src/sanity/queries";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "DataEdge's Bootcamp - 8 Weeks of Practical, Career-Ready Data Skills",
  description:
    "An intensive and hands-on 8-week class that helps you go from zero to producing real dashboards, insights, and business reports that employers actually want.",
  keywords: [
    "DataEdge",
    "Bootcamp",
    "Data Skills",
    "Career Ready",
    "Data Science",
    "Machine Learning",
    "Power BI",
    "Dashboard",
    "Market Analysis",
  ],
  openGraph: {
    title:
      "DataEdge's Bootcamp - 8 Weeks of Practical, Career-Ready Data Skills",
    description:
      "An intensive and hands-on 8-week class that helps you go from zero to producing real dashboards, insights, and business reports that employers actually want.",
    url: "https://www.consultingsmartedge.com/services/bootcamp",
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
    title:
      "DataEdge's Bootcamp - 8 Weeks of Practical, Career-Ready Data Skills",
    description:
      "An intensive and hands-on 8-week class that helps you go from zero to producing real dashboards, insights, and business reports that employers actually want.",
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
    canonical: "https://www.consultingsmartedge.com/services/bootcamp",
  },
};

const BootcampPage = async () => {
  let testimonials = [];

  try {
    testimonials = await client.fetch(
      getVideoTestimonials,
      {},
      { next: { revalidate: 30 } }
    );
  } catch (error) {
    console.error("Failed to fetch team members:", error);
  }

  return (
    <main>
      <div className="">
        <BootcampHero />
        <BootcampDetails />
        <Testimonials testimonials={testimonials} />
      </div>
    </main>
  );
};

export default BootcampPage;
