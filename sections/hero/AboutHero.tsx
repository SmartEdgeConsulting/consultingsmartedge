//import Mission from "@/components/Mission";
import { lazy, Suspense } from "react";

const Mission = lazy(() => import("@/components/Mission"));
const AboutHero = () => {
  return (
    <section className="py-20 flex flex-col items-center mx-auto text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pry mb-8">
        The <span className="text-sec">Edge</span> Behind SmartEdge
      </h1>
      <p className="text-sm sm:text-base leading-7 text-slate-800 max-w-2xl mb-8 text-center">
        SmartEdge Consulting & Analytics is a forward-thinking data consulting
        company focused on helping businesses extract value from their data. We
        believe every organization — regardless of size — can make better
        decisions when equipped with the right insights. We combine data,
        research, and technology to help organizations grow smarter.
      </p>
      <Mission />
    </section>
  );
};

export default AboutHero;
