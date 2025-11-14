import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-7xl grid gap-8 grid-cols-1 sm:grid-cols-2 px-4 sm:px-6 lg:px-8 items-center">
        <div className="mb-16">
          <Heading title="Who We Are" icon={<Users size={18} />} />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pry mb-6">
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
            className="text-md font-bold"
            aria-label="Learn more about our company"
          >
            <Link href="/about">Learn More About Us</Link>
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
