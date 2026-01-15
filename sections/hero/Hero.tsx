"use client"; 

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Now dynamic works with ssr: false
const AnimatedBackground = dynamic(
  () => import("@/components/AnimatedBackground"),
  {
    ssr: false, // No SSR hydration mismatch
  }
);

const Hero = () => {
  return (
    <AnimatedBackground
      particleCount={80}
      connectionDistance={150}
      primaryColor="59, 130, 246"
      backgroundColor="#09007D"
      className="min-h-screen"
    >
      <header
        id="home"
        className="min-h-screen flex flex-col items-center justify-center px-4 mx-auto max-w-5xl text-center"
      >
        <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-tight font-bold text-white mb-6">
          Data. Intelligence. Growth Powered by{" "}
          <span className="text-accent">SmartEdge</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8">
          We help businesses uncover clarity and accelerate growth through data
          analytics, research, and intelligent automation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-4 md:gap-6">
          <Button
            variant="default"
            size="default"
            className="font-bold"
            aria-label="Book Consultation"
            aria-roledescription="navigation button"
          >
            <Link href="/consultation" className="no-underline">
              Get a Free Data Consultation
            </Link>
          </Button>
          <Button
            variant="outline"
            size="default"
            className="font-bold"
            aria-label="Upload Data for Analysis"
            aria-roledescription="navigation button"
          >
            <Link href="/automated-data-lab" className="no-underline">
              Upload Your Data
            </Link>
          </Button>
        </div>
      </header>
    </AnimatedBackground>
  );
};

export default Hero;
