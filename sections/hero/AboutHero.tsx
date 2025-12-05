import Image from "next/image";
import React from "react";

const AboutHero = () => {
  return (
    <header className="py-10 sm:py-12 lg:py-20 bg-primary/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column: Text content */}
          <div>
            <h1 className="hero-heading">
              The <span className="text-gradient-primary">Edge</span> Behind
              SmartEdge
            </h1>
            <p className="hero-paragraph">
              SmartEdge Consulting & Analytics is a forward-thinking data
              consulting company focused on helping businesses extract value
              from their data. We believe every organization regardless of size
              can make better decisions when equipped with the right insights.
              We combine data, research, and technology to help organizations
              grow smarter.
            </p>
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
                src="/about-hero.jpg"
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

export default AboutHero;
