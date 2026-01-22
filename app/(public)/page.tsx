import About from "@/sections/About";
import UpcomingEvents from "@/sections/UpcomingEvents";
import Featured from "@/sections/Featured";
import Hero from "@/sections/hero/Hero";
import ServicesOverview from "@/sections/ServicesOverview";
import Works from "@/sections/Works";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartEdge Consulting & Analytics - Data-driven Business Solutions",
  description:
    "SmartEdge is a data-driven consulting firm that helps businesses uncover clarity and accelerate growth through data analytics, research, and intelligent automation.",
  keywords: ["SmartEdge", "Consulting", "Analytics", "Data-Driven Decisions"],
  openGraph: {
    title: "SmartEdge Consulting & Analytics - Data-driven Business Solutions",
    description:
      "SmartEdge is a data-driven consulting firm that helps businesses uncover clarity and accelerate growth through data analytics, research, and intelligent automation.",
    url: "https://www.consultingsmartedge.com/",
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
    title: "SmartEdge Consulting & Analytics - Data-driven Business Solutions",
    description:
      "SmartEdge is a data-driven consulting firm that helps businesses uncover clarity and accelerate growth through data analytics, research, and intelligent automation.",
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
    canonical: "https://www.consultingsmartedge.com/",
  },
};

const Home = () => {
  return (
    <main className="relative">
      <Hero />
      <About />
      <ServicesOverview />
      <Works />
      <Featured />
      <UpcomingEvents />
    </main>
  );
};

export default Home;
