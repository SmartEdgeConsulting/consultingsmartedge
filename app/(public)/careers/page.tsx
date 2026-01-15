import Careers from "@/sections/Careers";
import CareersHero from "@/sections/hero/CareersHero";
import Reasons from "@/sections/Reasons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the SmartEdge Team - Explore Opportunities",
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
