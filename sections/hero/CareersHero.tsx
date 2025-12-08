import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const CareersHero = () => {
  return (
    <header className="relative flex items-center justify-center min-h-[400px] sm:min-h-[500px] py-20 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/career2.jpg"
        alt="SmartEdge careers - team collaboration"
        fill
        loading="lazy"
        quality={85}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-2xl px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col items-start text-left max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
            Join the <span className="text-accent">SmartEdge</span> Team
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-slate-300 mb-6 sm:mb-8">
            Be part of a mission-driven data company transforming how Africa and
            the world make business decisions.
          </p>

          <Button asChild size="lg">
            <Link href="#careers" className="font-semibold">
              View Open Positions
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default CareersHero;
