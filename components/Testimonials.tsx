import React from "react";
import Heading from "./Heading";
import { Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <div id="testimonials" className="scroll-mt-18">
      <Heading title="Testimonials" icon={<Quote />} />
    </div>
  );
};

export default Testimonials;
