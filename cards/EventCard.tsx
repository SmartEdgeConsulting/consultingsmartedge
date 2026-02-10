import { urlFor } from "@/lib/utils/image-builder";
import { eventProps } from "@/types";
import Image from "next/image";
import React from "react";

const EventCard = ({ event, index }: { event: eventProps; index: number }) => {
  const { name, time, description, coverImage, ctaButton } = event;
  const isEven = index % 2 === 0;

  return (
    <article
      className={`${isEven ? "self-start left" : "self-end right"} group w-full max-w-md bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/20`}
    >
      {/* Image Container */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={urlFor(coverImage?.asset).url()}
          alt={`Cover image for ${name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Event Name */}
        <div className="flex items-start gap-3 mb-4">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>

        {/* Description */}
        <div className="flex gap-3 mb-4 items-start">
          <p className="text-gray-600 text-sm line-clamp-3 flex-1">
            {description}
          </p>
        </div>

        {/* Time */}
        {time !== "Concluded" && (
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-gray-700">
              {time || "Date TBA"}
            </span>
          </div>
        )}

        {/* CTA Button */}
        {ctaButton?.text && (
          <a
            href={ctaButton.url || undefined}
            target="blank"
            rel="noopener noreferrer"
            className="block w-full py-3 px-4 border border-primary text-primary text-center font-semibold rounded-lg hover:bg-primary/20 transition-colors duration-200"
          >
            {ctaButton.text}
          </a>
        )}
      </div>
    </article>
  );
};

export default EventCard;
