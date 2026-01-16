import Contact from "@/sections/Contact";
import ContactHero from "@/sections/hero/ContactHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Our Team - We’d Love to Hear From You",
  description:
    "Reach out to the SmartEdge Consulting & Analytics team for support and enquiries. We're here to help you make smarter, data-driven decisions for your business.",
  keywords: [
    "SmartEdge",
    "Inquiries",
    "Support",
    "Values",
    "Team",
    "Consulting",
    "Analytics",
    "Data-Driven Decisions",
  ],
  openGraph: {
    title: "Contact Our Team - We’d Love to Hear From You",
    description:
      "Reach out to the SmartEdge Consulting & Analytics team for support and enquiries. We're here to help you make smarter, data-driven decisions for your business.",
    url: "https://www.consultingsmartedge.com/contact",
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
    title: "Contact Our Team - We’d Love to Hear From You",
    description:
      "Reach out to the SmartEdge Consulting & Analytics team for support and enquiries. We're here to help you make smarter, data-driven decisions for your business."
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
    canonical: "https://www.consultingsmartedge.com/contact",
  },
};

const ContactPage = () => {
  return (
    <main className="mt-16">
      <ContactHero />
      <Contact />
    </main>
  );
};

export default ContactPage;
