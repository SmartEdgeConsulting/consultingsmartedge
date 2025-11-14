import CareersPagination from "@/components/CareersList";
import React from "react";

const Careers = () => {
  return (
    <section id="careers" className="py-15 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pry mb-8">
        Career Oportunities
      </h2>
      <CareersPagination />
    </section>
  );
};

export default Careers;
