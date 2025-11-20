"use client";

import React, { useRef } from "react";
import EventCard from "@/card-components/EventCard";
import { eventProps } from "@/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Events = ({ events }: { events: eventProps[] }) => {
  const eventRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!eventRef.current) return;

    const items = gsap.utils.toArray(eventRef.current.children);

    const ctx = gsap.context(() => {
      items.forEach((el, index) => {
        gsap.from(el as gsap.TweenTarget, {
          scrollTrigger: {
            trigger: el as gsap.DOMTarget,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      });
    }, eventRef);

    return () => ctx.revert();
  }, [events]); // Add events as dependency

  return (
    <section className="py-10">
      <div ref={eventRef} className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-20">
        {events.map((eve, index) => {
          return <EventCard key={eve._id} eve={eve} index={index} />;
        })}
      </div>
    </section>
  );
};

export default Events;