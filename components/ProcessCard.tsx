import { processProps } from "@/types";

const ProcessCard = ({ id, title, description }: processProps) => {
  return (
    <div className="flex flex-col gap-2.5 items-center">
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary">
        {id}
      </div>
      <div className="">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProcessCard;
