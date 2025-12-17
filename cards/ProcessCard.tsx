import { processProps } from "@/types";

const ProcessCard = ({
  id,
  title,
  description,
}: processProps) => {
   
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-3 relative">
      {/* Step Number Badge */}
      <div className="absolute -top-5 left-8 w-10 h-10 bg-linear-to-br from-primary/40 to-primary/30 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-lg font-bold text-white">{id}</span>
      </div>


      {/* Content */}
      <h3 className="text-lg font-bold text-primary mb-4 text-center">
        {title}
      </h3>
      <p className="text-gray-600 text-center text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default ProcessCard;
