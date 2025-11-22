import { processProps } from "@/types";

const ProcessCard = ({ id, title, description, color }: processProps) => {
  return (
    <div className="flex flex-col gap-2.5 items-center shadow-xl px-5 py-15 rounded-full bg-accent/20">
      <div className={`${color} h-12 w-12 flex items-center justify-center rounded-full font-bold text-base mb-4`}>
        {id}
      </div>
      <div>
        <h3 className="font-bold text-base sm:text-lg text-primary">{title}</h3>
        <p className="leading-6 text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
};

export default ProcessCard;
