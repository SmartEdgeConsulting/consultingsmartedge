import { serviceProps } from "@/types";
import { Button } from "./ui/button";

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  button,
}: serviceProps) => {
  return (
    <article className="relative mb-10 pt-10 pb-6 px-6 rounded-lg shadow-lg bg-pry/90 text-white flex flex-col">
      {/* Icon Section */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 flex items-center justify-center rounded-lg bg-sec/70 shadow-md"
        aria-hidden="true"
      >
        <Icon size={28} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="flex flex-col grow text-center gap-4 mt-4">
        <h3 className="text-base sm:text-lg font-semibold ">{title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed grow">
          {description}
        </p>

        <Button
          size="sm"
          variant="outline"
          className="mt-auto w-full mx-auto"
          aria-label={`Learn more about ${title}`}
        >
          {button}
        </Button>
      </div>
    </article>
  );
};

export default ServiceCard;
