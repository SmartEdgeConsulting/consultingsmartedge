import Contact from "@/sections/Contact";
import ContactHero from "@/sections/hero/ContactHero";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact Our Team - Reach Out to Us",
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
