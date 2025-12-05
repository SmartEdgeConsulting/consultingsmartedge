import React from "react";
import Heading from "./Heading";
import { DollarSign } from "lucide-react";

const Pricing = () => {
  return (
    <div id="pricing" className='scroll-mt-18'>
      <Heading title="Pricing" icon={<DollarSign />} />
    </div>
  );
};

export default Pricing;
