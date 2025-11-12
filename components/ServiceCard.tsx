import { serviceProps } from "@/types";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const ServiceCard = ({
  id,
  icon: Icon,
  title,
  description,
  button,
}: serviceProps) => {
  return (
    <div className="relative mb-5 border rounded-lg  shadow-sm flex flex-col space-y-1.5 p-6 text-center text-white">
      {/* Icon Section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 flex items-center justify-center rounded-full bg-acc text-white">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold mt-5 ">{title}</h3>
      <p className="text-sm mt-2 mb-4">{description}</p>

      <Button size="sm" variant="outline" className="mt-auto">
        {button}
      </Button>
    </div>
  );
};

export default ServiceCard;
