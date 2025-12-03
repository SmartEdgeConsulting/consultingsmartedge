import Careers from "@/sections/Careers";
import CareersHero from "@/sections/hero/CareersHero";
import Reasons from "@/sections/Reasons";

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
