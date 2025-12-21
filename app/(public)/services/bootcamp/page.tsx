import Testimonials from "@/components/Testimonials";
import BootcampDetails from "@/sections/BootcampDetails";
import BootcampHero from "@/sections/hero/BootcampHero";
import { client } from "@/src/sanity/client";
import { getTestimonials } from "@/src/sanity/queries";
import React from "react";

const BootcampPage = async () => {
  let testimonials = [];
  
    try {
      testimonials = await client.fetch(
        getTestimonials,
        {},
        { next: { revalidate: 30 } }
      );
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    }

  return (
    <main>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <BootcampHero />
        <BootcampDetails />
        <Testimonials testimonials={testimonials} />
      </div>
    </main>
  );
};

export default BootcampPage;
