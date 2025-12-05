import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DataLabHero = () => {
  return (
    <header className="py-10 sm:py-12 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column: Text content */}
          <div>
            <h1 className="hero-heading">
              Upload Your <span className="text-gradient-primary">Data</span>{" "}
              And Discover Insights Instantly
            </h1>
            <p className="hero-paragraph mb-4">
              Our Automated Data Lab allows businesses to securely upload their
              data and receive an instant analysis report — visualizing key
              patterns, data quality scores, and business insights in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Button
                variant="default"
                className="text-md font-bold"
                aria-label="Book Consultation"
                aria-roledescription="navigation button"
              >
                <Link href="/">Try It Free</Link>
              </Button>
              <Button
                variant="darkoutline"
                className="text-md font-bold"
                aria-label="Upload Data for Analysis"
                aria-roledescription="navigation button"
              >
                <Link href="#custom-report">Request Custom Report</Link>
              </Button>
            </div>
          </div>

          {/* Right column: Image with decorative elements */}
          <div className="relative order-last flex justify-center items-center">
            {/* Decorative blob background */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-80 h-80 bg-linear-to-br from-primary/20 to-primary/10 rounded-[35%_65%_65%_35%/35%_35%_65%_65%] animate-pulse"></div>
            </div>

            {/* Shadow blob */}
            <div className="absolute w-[300px] h-[300px] bg-primary/20 blur-xl rounded-[30%_70%_70%_30%/30%_30%_70%_70%] transform translate-y-2"></div>

            {/* Main Image */}
            <div className="relative z-10 transition-transform duration-300 hover:scale-105">
              <Image
                src="/upload.webp"
                width={600}
                height={400}
                alt="About image"
                className="w-[300px] h-[300px] object-cover rounded-[30%_70%_70%_30%/30%_30%_70%_70%] shadow-2xl"
                priority
                quality={85}
              />
            </div>

            {/* Decorative dots */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-primary/30 rounded-[40%_60%_60%_40%/40%_40%_60%_60%]"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/20 rounded-[50%_50%_50%_50%/50%_50%_50%_50%]"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DataLabHero;
