import CareersList from "@/components/CareersList";
import React from "react";
import { getDepartments, getJobs } from "@/src/sanity/queries";
import { client } from "@/src/sanity/client";

const options = { next: { revalidate: 30 } };

const Careers = async () => {
  const departments = await client.fetch(getDepartments, {}, options);
  const availableJobs = await client.fetch(getJobs, {}, options);

  return (
    <section id="careers" className="py-15 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-8">
          Career Oportunities
        </h2>
        <CareersList availableJobs={availableJobs} departments={departments} />
      </div>
    </section>
  );
};

export default Careers;
