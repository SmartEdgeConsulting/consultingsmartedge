"use client";

import Contact from "@/sections/Contact";
import ContactHero from "@/sections/hero/ContactHero";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-animate",
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse", // smoother when scrolling up/down
          },
        }
      );
    },
    { scope: contactRef } // automatically scopes & cleans up
  );

  return (
    <main className="mt-16" ref={contactRef}>
      <ContactHero />
      <Contact />
    </main>
  );
};

export default ContactPage;
