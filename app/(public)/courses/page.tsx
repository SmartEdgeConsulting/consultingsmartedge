import React from "react";
import { Metadata } from "next";
import CoursesHero from "@/sections/hero/CoursesHero";
import Courses from "@/sections/Courses";

export const metadata: Metadata = {
  title: "Our Professional Data Training Programs & Courses",
  description:
    "Discover SmartEdge Consulting's comprehensive data training programs. From beginner data analytics to advanced.",
  keywords: ["SmartEdge", "Consulting", "Analytics", "Data-Driven Decisions"],
  openGraph: {
    title: "Our Professional Data Training Programs & Courses",
    description:
      "Discover SmartEdge Consulting's comprehensive data training programs. From beginner data analytics to advanced.",
    url: "https://www.consultingsmartedge.com/courses",
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
    title: "Our Professional Data Training Programs & Courses",
    description:
      "Discover SmartEdge Consulting's comprehensive data training programs. From beginner data analytics to advanced.",
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
    canonical: "https://www.consultingsmartedge.com/courses",
  },
};
const CoursesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const resolvedParams = await searchParams;

  return (
    <main className="mt-16">
      <CoursesHero />
      <Courses searchParams={resolvedParams} />
    </main>
  );
};

export default CoursesPage;
