import Mission from "@/components/Mission";

const AboutHero = () => {
  return (
    <section className="py-20 flex flex-col items-center mx-auto text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
        The <span className="text-sec">Edge</span> Behind SmartEdge
      </h1>
      <p className="text-sm sm:text-base text-slate-300 max-w-3xl mb-6">
        We combine data, research, and technology to help organizations grow
        smarter.
      </p>
      <p className="text-sm sm:text-base leading-7 text-slate-300 max-w-3xl mb-8 text-center">
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
