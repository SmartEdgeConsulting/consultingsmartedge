import Heading from "@/components/Heading";
import ProcessCard from "@/cards/ProcessCard";
import { processes } from "@/lib/data";
import { Gpu } from "lucide-react";

const Works = () => {
  return (
    <section className="py-10 ">
      <div className="mx-auto max-w-7xl items-center flex flex-col px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Heading title="How It Works" icon={<Gpu size={18} />} />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            From <span className="text-gradient-primary">Data</span> to Impact
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-slate-800 text-center gap-6 mb-6">
          {processes.map((process, index) => {
            return (
              <div
                key={process.id}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProcessCard {...process} />
                {/* Connector Arrow (Desktop only) */}
                {index < processes.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white text-3xl opacity-60 animate-pulse">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Works;
