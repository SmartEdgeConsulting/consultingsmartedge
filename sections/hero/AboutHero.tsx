import React from "react";

const AboutHero = () => {
  return (
    <section className="py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pry mb-8">
          The <span className="text-sec">Edge</span> Behind SmartEdge
        </h1>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-800 max-w-3xl mx-auto mb-8">
          SmartEdge Consulting & Analytics is a forward-thinking data consulting
          company focused on helping businesses extract value from their data.
          We believe every organization regardless of size can make better
          decisions when equipped with the right insights. We combine data,
          research, and technology to help organizations grow smarter.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
