import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/utils/image-builder";
import { testimonialProps } from "@/types";
import Image from "next/image";

interface AnimatedCanopyProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
}

const AnimatedCanopy = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: AnimatedCanopyProps) => {
  return (
    <div
      {...props}
      style={
        {
          "--gap": "12px",
        } as React.CSSProperties
      }
      className={cn(
        "group relative flex h-full w-full overflow-hidden p-2",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={`item-${index}`}
          className={cn(
            "flex shrink-0",
            vertical ? "flex-col" : "flex-row",
            vertical ? "animate-canopy-vertical" : "animate-canopy-horizontal",
            pauseOnHover && "group-hover:pause-animation",
            reverse && "direction-[reverse]"
          )}
          style={
            {
              gap: "var(--gap)",
              animationDirection: reverse ? "reverse" : "normal",
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      ))}
      {applyMask && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 h-full w-full",
            vertical
              ? "bg-linear-to-b from-white/80 via-transparent to-white/80 dark:from-gray-950/80 dark:to-gray-950/80"
              : "bg-linear-to-r from-white/80 via-transparent to-white/80 dark:from-gray-950/80 dark:to-gray-950/80"
          )}
        />
      )}
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  className,
}: {
  testimonial: testimonialProps;
  className?: string;
}) => {
  const imageUrl = testimonial.profilePicture?.asset
    ? urlFor(testimonial.profilePicture.asset).width(48).height(48).url()
    : "/user.png"; // Fallback image

  return (
    <div
      className={cn(
        "group mx-2 flex h-auto min-h-40 w-80 shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-400/10 hover:-translate-y-1 dark:border-gray-700/50 dark:bg-gray-800/90 dark:hover:border-blue-500",
        className
      )}
    >
      {/* Header with avatar and info */}
      <div className="flex items-center gap-3 mb-4">
        {imageUrl && (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-primary shadow-sm dark:border-blue-900 ring-2 ring-primary/40 dark:ring-blue-950">
            <Image
              src={imageUrl}
              alt={testimonial.name || "Testimonial"}
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-semibold text-base text-primary dark:text-gray-100">
            {testimonial.name}
          </span>
          {testimonial.title && (
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {testimonial.title}
            </span>
          )}
        </div>
      </div>

      {/* Testimonial text with quote styling */}
      <div className="relative">
        <svg
          className="absolute -left-1 -top-1 w-6 h-6 text-primary dark:text-blue-900 opacity-50"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
        </svg>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-4 pl-5">
          {testimonial.testimony}
        </p>
      </div>
    </div>
  );
};

export const AnimatedTestimonials = ({
  testimonials,
  className,
  cardClassName,
}: {
  testimonials: testimonialProps[];
  className?: string;
  cardClassName?: string;
}) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className={cn("w-full overflow-hidden py-4", className)}>
      {[false, true].map((reverse, rowIndex) => (
        <AnimatedCanopy
          key={`canopy-${rowIndex}`}
          reverse={reverse}
          className="mb-4"
          style={
            {
              "--duration": "30s",
            } as React.CSSProperties
          }
          pauseOnHover
          applyMask={false}
          repeat={3}
        >
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={`${testimonial._id || idx}-${rowIndex}`}
              testimonial={testimonial}
              className={cardClassName}
            />
          ))}
        </AnimatedCanopy>
      ))}
    </div>
  );
};
