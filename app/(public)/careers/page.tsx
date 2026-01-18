import Careers from "@/sections/Careers";
import CareersHero from "@/sections/hero/CareersHero";
import Reasons from "@/sections/Reasons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the SmartEdge Team - Explore Opportunities",
  description:
      "Discover exciting career opportunities at SmartEdge Consulting & Analytics. Join our team of data enthusiasts and help businesses make smarter decisions with data-driven insights.",
  keywords: [   
    "SmartEdge",
    "Careers",
    "Data Science",
    "Analytics",
    "Data-Driven Decisions",
    "Consulting",
    "Job Opportunities",
    "Join Our Team",
  ],
  openGraph: {
    title: "Join the SmartEdge Team - Explore Opportunities",
    description:  
      "Discover exciting career opportunities at SmartEdge Consulting & Analytics. Join our team of data enthusiasts and help businesses make smarter decisions with data-driven insights.",
    url: "https://www.consultingsmartedge.com/careers",
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
    title: "Join the SmartEdge Team - Explore Opportunities",
    description:
      "Discover exciting career opportunities at SmartEdge Consulting & Analytics. Join our team of data enthusiasts and help businesses make smarter decisions with data-driven insights."
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
    canonical: "https://www.consultingsmartedge.com/careers",
  },  
};

const CareersPage = () => {
  return (
    <main className="mt-16">
      <CareersHero />
      <Reasons />
      <Careers />
    </main>
  );
};

export default CareersPage;
