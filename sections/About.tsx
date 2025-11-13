import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section id="about" className="py-20 grid gap-8 grid-cols-1 sm:grid-cols-2">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <Heading title="Who We Are" icon={<Users size={18} />} />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            We turn raw data into business clarity.
          </h2>
          <p className="text-base sm:text-xl leading-7 text-slate-300 max-w-3xl mb-8">
            SmartEdge Consulting & Analytics is a data-driven consulting firm
            helping organizations make smarter decisions through Research,
            Analytics, and Technology. We don&apos;t just analyze data — we help
            you understand it, use it, and profit from it.
          </p>
          <Button className="text-md font-bold">
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <Image
          src="/about.webp"
          width={600}
          height={400}
          alt="About image"
          className="rounded-lg"
        />
      </div>
    </section>
  );
};

export default About;
