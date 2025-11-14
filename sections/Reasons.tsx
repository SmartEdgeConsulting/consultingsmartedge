import { reasons } from "@/lib/data";
import { Check } from "lucide-react";
import Image from "next/image";
import React, { useMemo } from "react";

const Reasons = () => {
  // Memoize the reasons list to prevent unnecessary re-renders

  const reasonsList = useMemo(
    () =>
      reasons.map((reason) => (
        <li
          key={reason.id}
          className="flex items-start gap-5 text-base sm:text-xl text-slate-300 mb-6 group"
        >
          <Check
            size={25}
            className="text-sec mt-1 shrink-0 transition-transform group-hover:scale-110"
          />
          <span className="transition-colors group-hover:text-white">
            {reason.text}
          </span>
        </li>
      )),
    []
  );

  return (
    <section id="about" className="py-20 bg-pry">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white mb-6">
        Why <span className="text-sec">SmartEdge</span>?
      </h2>
      <div className="mx-auto max-w-7xl grid gap-8 grid-cols-1 sm:grid-cols-2 px-4 sm:px-6 lg:px-8 items-center">
        <div>
          <Image
            src="/careers1.jpg"
            width={600}
            height={400}
            alt="About image"
            className="rounded-lg"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </div>
        <div className="">
          <ul className="space-y-6">{reasonsList}</ul>
        </div>
      </div>
    </section>
  );
};

export default Reasons;
