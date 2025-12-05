import React from "react";
import Curriculum from "../components/Curriculum";
import Testimonials from "../components/Testimonials";
import Benefits from "../components/Benefits";
import Pricing from "../components/Pricing";

const BootcampDetails = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-20">
      <Curriculum />
      <Testimonials />
      <Benefits />
      <Pricing />
    </section>
  );
};

export default BootcampDetails;
