import Careers from "@/sections/Careers";
import CareersHero from "@/sections/hero/CareersHero";
import Reasons from "@/sections/Reasons";

const page = () => {
  return (
    <div className="mt-16">
      <CareersHero />
      <Reasons />
      <Careers />
    </div>
  );
};

export default page;
