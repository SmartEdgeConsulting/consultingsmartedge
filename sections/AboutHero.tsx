//import Heading from "@/components/Heading";
import Mission from "@/components/Mission";
//import { Users } from "lucide-react";
import React from "react";

const AboutHero = () => {
  return (
    <section className="py-20 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">The <span className="text-sec">Edge</span> Behind SmartEdge</h1>
      <p className="text-sm sm:text-xl text-slate-300 max-w-3xl mb-8">
        We combine data, research, and technology to help organizations grow
        smarter.
      </p>
      {/**<Heading title="Who We Are" icon={<Users size={18} />} />*/}
      <p className="text-sm sm:text-base text-slate-300 max-w-3xl mb-8 text-center">
        SmartEdge Consulting & Analytics is a forward-thinking data consulting
        company focused on helping businesses extract value from their data. We
        believe every organization — regardless of size — can make better
        decisions when equipped with the right insights.
      </p>
      <Mission />
    </section>
  );
};

export default AboutHero;
