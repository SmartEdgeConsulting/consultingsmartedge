import { serviceProps } from "@/types";
import { Button } from "./ui/button";

const ServiceCard = ({
  id,
  icon: Icon,
  title,
  description,
  button,
}: serviceProps) => {
  console.log(id)
  return (
    <div className="relative mb-5 rounded-lg shadow-md flex flex-col space-y-1.5 p-6 text-center text-white bg-pry/90">
      {/* Icon Section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 flex items-center justify-center rounded-lg bg-sec/70">
        <Icon size={24} />
      </div>
      <h3 className="text-sm sm:text-base font-semibold mt-5">{title}</h3>
      <p className="text-xs sm:text-sm mt-2 mb-4 text-slate-300 leading-5">{description}</p>

      <Button size="sm" variant="outline" className="mt-auto">
        {button}
      </Button>
    </div>
  );
};

export default ServiceCard;
