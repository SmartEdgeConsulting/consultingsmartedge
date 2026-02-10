"use client";

import Heading from "@/components/Heading";
import HeroBackground from "@/components/HeroBackground";
import HeroImage from "@/components/HeroImage";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import React from "react";

const CoursesHero = () => {
  const stats = [
    { number: "20+", label: "Students Trained" },
    { number: "95%", label: "Success Rate" },
    { number: "5+", label: "Expert Instructors" },
  ];

  return (
    <header className="relative overflow-hidden bg-linear-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 py-16 sm:py-20 lg:py-28">
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: Text content */}
          <div>
            <Heading title="New Learning Experience" icon={<Sparkles />} />

            <h1 className="hero-heading">
              Professional <span className="text-gradient-primary">Data</span>
              <br />
              Training Programs &<br />
              Pricing Guide
            </h1>

            <p className="hero-paragraph">
              At SmartEdge Consulting & Analytics, our training programs are
              designed to move you from curiosity to confidence and from
              learning to real-world application. Whether you are starting your
              data journey, transitioning careers, or advancing into AI and
              engineering, our structured learning paths equip you with
              practical, job-ready skills.
            </p>

            <div>
              <Button variant="default" aria-label="Explore Programs" asChild>
                <a href="#courses">Explore Programs →</a>
              </Button>
            </div>

            {/* Stats section */}
            <div className="stats-grid mt-12 grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="stat-number mb-2 text-4xl font-extrabold text-primary">
                    {stat.number}
                  </div>
                  <div className="stat-label text-sm font-medium text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <HeroImage
            imageUrl="/blackman.png"
            alt="Professional data training program"
          />
        </div>
      </div>
    </header>
  );
};

export default CoursesHero;
