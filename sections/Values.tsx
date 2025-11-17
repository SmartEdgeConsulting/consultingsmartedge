"use client";

import { values } from "@/lib/data";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Values = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const items = gsap.utils.toArray<HTMLElement>(
      containerRef.current.children
    );

    const ctx = gsap.context(() => {
      gsap.from(items, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        x: 100, // animate from right
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, //stagger each card by 0.2 secondaryonds
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section id="values" className="py-20 bg-primary scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Our Core Values
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-5 "
          ref={containerRef}
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.id} className="flex items-center my-4 gap-5">
                <div className="mr-4">
                  <Icon size={35} className="text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">
                    {value.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Values;
