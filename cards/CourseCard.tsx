import AddToCartButton from "@/components/addToCart";
import { isCourseNew } from "@/lib/utils/course-utils";
import { urlFor } from "@/lib/utils/image-builder";
import { coursesProps } from "@/types";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import React from "react";

const CourseCard = ({ course }: { course: coursesProps }) => {
  const {
    title,
    description,
    pricing,
    thumbnail,
    modulesCount,
    lessonsCount,
    publishedAt,
  } = course;


  // Get just the starting price for display
  const getStartingPrice = () => {
    if (!pricing) return "Price not set";

    const {
      deliveryMethod,
      selfPacedPrice,
      instructorPrice,
      currency = "USD",
    } = pricing;
    const currencySymbol =
      currency === "NGN"
        ? "₦"
        : currency === "EUR"
          ? "€"
          : currency === "GBP"
            ? "£"
            : "$";

    switch (deliveryMethod) {
      case "self-paced":
        return `${currencySymbol}${selfPacedPrice?.toLocaleString() || "0"}`;
      case "instructor-based":
        return `${currencySymbol}${instructorPrice?.toLocaleString() || "0"}`;
      case "both":
        // Show starting from lowest price
        const lowestPrice = Math.min(selfPacedPrice || 0, instructorPrice || 0);
        return `${currencySymbol}${lowestPrice.toLocaleString()}+`;
      default:
        return "Price not set";
    }
  };

  return (
    <div className="h-full max-w-sm rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y- flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-100">
        {thumbnail?.asset ? (
          <Image
            src={urlFor(thumbnail.asset).url()}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <BookOpen className="w-16 h-16 text-primary opacity-50" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {isCourseNew(publishedAt) && (
            <span className="bg-black/75 animate-pulse text-white px-3 py-1 rounded-full text-xs font-semibold">
              NEW
            </span>
          )}
        </div>
      </div>

      {/* Content - All left-aligned */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title  */}
        <h3 className="text-primary font-bold text-base mb-2 line-clamp-2 text-left">
          {title}
        </h3>

        {/* Description  */}
        <p className="text-slate-800 text-sm mb-4 line-clamp-2 text-left">
          {description}
        </p>

        {/* Course Stats  */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 text-left">
          <span>{modulesCount || 0} Modules</span>
          <span>•</span>
          <span>{lessonsCount || 0} Lessons</span>
        </div>

        {/* Price with button on right */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500">
              {pricing?.deliveryMethod === "both" ? "Starting at" : "Price"}
            </span>
            <span className="text-lg font-bold text-gray-900">
              {getStartingPrice()}
            </span>
          </div>

          <AddToCartButton course={course}/>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
