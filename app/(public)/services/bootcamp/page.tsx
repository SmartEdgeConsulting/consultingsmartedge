import Testimonials from "@/components/Testimonials";
import BootcampDetails from "@/sections/BootcampDetails";
import BootcampHero from "@/sections/hero/BootcampHero";
import React from "react";

const BootcampPage = () => {
  return (
    <main>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <BootcampHero />
        <BootcampDetails />
        <Testimonials />
      </div>
    </main>
  );
};

export default BootcampPage;
