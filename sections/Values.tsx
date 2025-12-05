"use client";

import { values } from "@/lib/data";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as Icons from "lucide-react";

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
        x: 100, 
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15, 
      });
    }, containerRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <section id="values" className="py-20 bg-primary/10 scroll-mt-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
          Our Core Values
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          ref={containerRef}
        >
          {values.map((value) => {
            const Icon = Icons[
              value.icon as keyof typeof Icons
            ] as React.ComponentType<{
              size?: number;
              strokeWidth?: number;
              className?: string;
            }>;

            return (
              <div key={value.id} className="flex items-center my-4 gap-5">
                <div className="shrink-0 mr-4">
                  {Icon && <Icon size={35} className="text-secondary" strokeWidth={2}/>}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-primary">
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
