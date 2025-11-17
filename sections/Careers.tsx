import CareersPagination from "@/components/CareersList";
import React from "react";

const Careers = () => {
  return (
    <section id="careers" className="py-15 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-8">
          Career Oportunities
        </h2>
        <CareersPagination />
      </div>
    </section>
  );
};

export default Careers;
