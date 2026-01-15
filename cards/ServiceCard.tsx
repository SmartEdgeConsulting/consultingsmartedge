"use client";

import { serviceProps } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as Icons from "lucide-react";
import { usePathname } from "next/navigation";

const ServiceCard = ({
  icon: iconName,
  title,
  description,
  button,
  link,
}: serviceProps) => {
  const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{
    size: number;
    strokeWidth: number;
  }>;

  const pathname = usePathname();
  return (
    <article className="relative mb-10 pt-10 pb-6 px-6 rounded-lg shadow-sm bg-white text-primary flex flex-col border-border">
      {/* Icon section */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-white flex items-center justify-center rounded-lg bg-gradient-primary shadow-md"
        aria-hidden="true"
      >
        {Icon && <Icon size={28} strokeWidth={2} />}
      </div>

      {/* Content */}
      <div className="flex flex-col grow text-center gap-4 mt-4">
        <h3 className="text-base sm:text-lg font-semibold tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed grow">
          {description}
        </p>

        <Link
          href={pathname === "/" ? "/services" : link || "/"}
          className="mt-auto"
        >
          <Button
            size="sm"
            variant="darkoutline"
            className="w-full"
            title={`${title}: ${description}`}
            aria-label={`Learn more about ${title}`}
          >
            {pathname === "/" ? "Learn More" : button}
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default ServiceCard;
