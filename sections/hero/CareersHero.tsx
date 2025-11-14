import { Button } from "@/components/ui/button";
import Link from "next/link";

const CareersHero = () => {
  return (
    <section className="relative py-20 flex justify-center items-center min-h-[400px] sm:min-h-[500px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/reason.jpg')" }}
      />

      {/* Black Transparent Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col items-start text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
            Join <span className="text-acc">SmartEdge</span>
          </h1>

          <p className="text-base sm:text-xl leading-7 text-slate-300 max-w-xl mb-8">
            Join our team and help build intelligent solutions that power better
            decisions. We&apos;re looking for curious, innovative minds ready to
            turn data into impact.
          </p>

          <Button asChild>
            <Link href="#careers">View Careers</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
