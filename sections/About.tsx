import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section
      id="about"
      role="region"
      aria-labelledby="about-heading"
      className="py-20"
    >
      <div className="mx-auto max-w-7xl grid gap-12 grid-cols-1 sm:grid-cols-2 px-4 sm:px-6 lg:px-8 items-center">
        <div className="mb-16">
          <Heading title="Who We Are" icon={<Users size={18} />} />
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight"
          >
            We turn raw <span className="text-gradient-primary">data</span> into
            business clarity
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600 max-w-3xl mb-8">
            SmartEdge Consulting & Analytics is a data-driven consulting firm
            helping organizations make smarter decisions through Research,
            Analytics, and Technology. We don&apos;t just analyze data we help
            you understand it, use it, and profit from it.
          </p>
          <Button
            asChild
            className="text-sm font-semibold"
            aria-label="Learn more about SmartEdge Consulting "
          >
            <Link href="/about" prefetch={false}>
              Learn More About Us
            </Link>
          </Button>
        </div>
        <div>
          <Image
            src="/about.webp"
            width={672}
            height={448}
            alt="Data analysts working on a laptop"
            className="rounded-lg w-full h-auto"
            priority
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwMS...gAAAAA==" // Generic blue blur
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
