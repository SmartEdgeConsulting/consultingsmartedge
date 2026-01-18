import React from "react";

import Blogs from "@/sections/Blogs";
import BlogHero from "@/sections/hero/BlogHero";
import { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SmartEdge's Blog - Insights that Keep You Ahead",
  description:
    "Stay informed with business intelligence tips, articles and analytics case studies from our team.",
  keywords: [
    "SmartEdge",
    "Data Science",
    "Analytics",
    "Data Articles",
    "Blogs",
    "Insights",
    "Business Intelligence",
    "Case Studies",
  ],
  openGraph: {
    title: "SmartEdge's Blog - Insights that Keep You Ahead",
    description:
      "Stay informed with business intelligence tips, articles and analytics case studies from our team.",
    url: "https://www.consultingsmartedge.com/blog",
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
    title: "SmartEdge's Blog - Insights that Keep You Ahead",
    description:
      "Stay informed with business intelligence tips, articles and analytics case studies from our team."
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
    canonical: "https://www.consultingsmartedge.com/blog",
  },
};

const BlogsPage = () => {
  return (
    <main className="mt-16">
      <BlogHero />
      <Blogs />
    </main>
  );
};

export default BlogsPage;
