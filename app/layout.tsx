import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";

const poppins = localFont({
  src: [
    {
      path: "../public/fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.consultingsmartedge.com"),
  title: "SmartEdge Consulting & Analytics - Data-driven Business Solutions",
  icons: {
    icon: "/favicon.png",
  },
  description:
    "SmartEdge is a data-driven consulting firm that helps businesses uncover clarity and accelerate growth through data analytics, research, and intelligent automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SmartEdge Consulting & Analytics",
    url: "https://www.consultingsmartedge.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.consultingsmartedge.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    logo: "https://www.consultingsmartedge.com/logo-512.jpg",
    description:
      "SmartEdge is a data-driven consulting firm that helps businesses uncover clarity and accelerate growth through data analytics, research, and intelligent automation.",
    sameAs: [
      "https://www.linkedin.com/company/smartedge-analytics/",
      "https://www.facebook.com/profile.php?id=61581334894053",
      "https://youtube.com/@smartedgeconsulting",
      "https://www.instagram.com/smartedge_consulting/",
    ],
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />
        </head>
        <body className={`${poppins.className} w-full mr-0 pr-0`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
