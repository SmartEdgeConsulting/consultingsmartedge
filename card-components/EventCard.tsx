import { eventProps } from "@/types";
import Image from "next/image";
import React from "react";
import { urlFor } from "@/lib/utils/image-builder";


const EventCard = ({ eve, index }: { eve: eventProps; index: number }) => {
  const { name, description, coverImage } = eve;
  const isEven = index % 2 === 0;

  return (
    <article
      className={`flex ${isEven ? "justify-start" : "justify-end"} w-full mb-8`}
    >
      <div className="sm:w-100 w-80 rounded-xl shadow-md overflow-hidden bg-linear-to-b from-primary to-white">
        {/* Image Container - Fixed Height */}
        <div className="w-full h-48 relative">
          <Image
            src={urlFor(coverImage?.asset).url()}
            alt={`Cover image for ${name}`}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, 320px"
          />
        </div>
        {/* Content Container */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-primary mb-2 line-clamp-2">
            {name}
          </h3>
          <p className="text-slate-800 text-sm line-clamp-3">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
