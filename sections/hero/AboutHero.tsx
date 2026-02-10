import Heading from "@/components/Heading";
import HeroBackground from "@/components/HeroBackground";
import HeroImage from "@/components/HeroImage";
import { User } from "lucide-react";
import React from "react";

const AboutHero = () => {
  return (
    <header className="relative overflow-hidden bg-linear-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 py-16 sm:py-20 lg:py-28">
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: Text content */}
          <div>
            <Heading title="About Us" icon={<User />} />

            <h1 className="hero-heading">
              The <span className="text-gradient-primary">Edge</span>
              <br />
              Behind SmartEdge
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

          {/* Right column */}
          <HeroImage
            imageUrl="/about-hero.jpg"
            alt="About SmartEdge Consulting & Analytics"
          />
        </div>
      </div>
    </header>
  );
};

export default AboutHero;
