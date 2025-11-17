import { reasons } from "@/lib/data";
import { Check } from "lucide-react";
import Image from "next/image";

const Reasons = () => {
  return (
    <section className="py-16 sm:py-20 bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white mb-12 sm:mb-16">
          Why <span className="text-secondary">SmartEdge</span>?
        </h2>

        <div className="grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-2 items-center">
          {/* Image secondarytion */}
          <div className="relative aspect-3/2 lg:aspect-4/3 w-full">
            <Image
              src="/careers1.jpg"
              alt="SmartEdge team collaboration and workplace culture"
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
            />
          </div>

          {/* Reasons List */}
          <div>
            <ul className="space-y-4 sm:space-y-6">
              {reasons.map((reason) => (
                <li
                  key={reason.id}
                  className="flex items-start gap-3 sm:gap-4 text-base sm:text-lg lg:text-xl text-slate-300 group"
                >
                  <Check
                    size={24}
                    className="text-secondary mt-0.5 sm:mt-1 shrink-0 transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="transition-colors duration-200 group-hover:text-white">
                    {reason.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reasons;
