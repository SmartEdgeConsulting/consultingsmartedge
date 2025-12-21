import React from "react";
import Heading from "./Heading";
import { Quote } from "lucide-react";
import { testimonialProps } from "@/types";
import { AnimatedTestimonials } from "@/src/components/ui/animated-testimonials";

const Testimonials = ({testimonials} : { testimonials: testimonialProps[] }) => {
  return (
    <div id="testimonials" className="scroll-mt-18 py-10 sm:py-12 lg:py-14 text-center">
      <Heading title="Testimonials" icon={<Quote />} />
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
};

export default Testimonials;
