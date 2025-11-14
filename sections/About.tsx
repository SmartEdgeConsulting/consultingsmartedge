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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pry mb-6"
          >
            We turn raw <span className="text-sec">data</span> into business
            clarity.
          </h2>
          <p className="text-base sm:text-xl leading-7 text-slate-800 max-w-3xl mb-8">
            SmartEdge Consulting & Analytics is a data-driven consulting firm
            helping organizations make smarter decisions through Research,
            Analytics, and Technology. We don&apos;t just analyze data we help
            you understand it, use it, and profit from it.
          </p>
          <Button
            asChild
            className="text-md font-bold"
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
            width={600}
            height={400}
            alt="About image"
            className="rounded-lg"
            priority
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
