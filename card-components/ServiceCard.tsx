import { serviceProps } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  button,
  link,
}: serviceProps) => {
  return (
    <article className="relative mb-10 pt-10 pb-6 px-6 rounded-lg shadow-lg bg-white text-primary flex flex-col">
      {/* Icon section */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-white flex items-center justify-center rounded-lg bg-gradient-primary shadow-md"
        aria-hidden="true"
      >
        <Icon size={28} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="flex flex-col grow text-center gap-4 mt-4">
        <h3 className="text-base sm:text-lg font-semibold ">{title}</h3>
        <p className="text-sm text-slate-800 leading-relaxed grow">
          {description}
        </p>

        <Link href={link || "/"} className="mt-auto">
          <Button
            size="sm"
            variant="darkoutline"
            className="w-full"
            aria-label={`Learn more about ${title}`}
          >
            {button}
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default ServiceCard;
