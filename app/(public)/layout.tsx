import Footer from "@/sections/Footer";
import Navbar from "@/sections/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Navbar />
      <main className="mt-16 w-full mr-0 pr-0">{children}</main>
      <Footer />
    </>
  );
}
