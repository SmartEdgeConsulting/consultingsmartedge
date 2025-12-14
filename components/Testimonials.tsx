import React from "react";
import Heading from "./Heading";
import { Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <div id="testimonials" className="scroll-mt-18 py-10 sm:py-12 lg:py-14">
      <Heading title="Testimonials" icon={<Quote />} />
    </div>
  );
};

export default Testimonials;
