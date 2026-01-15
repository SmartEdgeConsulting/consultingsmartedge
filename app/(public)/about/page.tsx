import type { Metadata } from 'next'

import Mission from "@/sections/Mission";
import AboutHero from "@/sections/hero/AboutHero";
import Teams from "@/sections/Teams";
import Values from "@/sections/Values";

export const metadata: Metadata = {
  title: 'About SmartEdge Consulting & Analytics - Our Mission, Values, and Team',
}

const AboutPage = () => {
  return (
    <main className="mt-16">
      <AboutHero />
      <Mission />
      <Values />
      <Teams />
    </main>
  );
};

export default AboutPage;
