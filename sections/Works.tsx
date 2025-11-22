import Heading from "@/components/Heading";
import ProcessCard from "@/card-components/ProcessCard";
import { Button } from "@/components/ui/button";
import { process } from "@/lib/data";
import { Gpu } from "lucide-react";

const Works = () => {
  return (
    <section className="py-10 ">
      <div className="mx-auto max-w-7xl items-center flex flex-col">
        <div className="text-center mb-10">
          <Heading title="How It Works" icon={<Gpu size={18} />} />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            From Data to Impact
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-4 text-slate-800 text-center gap-6 mb-6">
          {process.map((process) => (
            <ProcessCard key={process.id} {...process} />
          ))}
        </div>
        <Button
          variant="default"
          className="mt-6"
          aria-label="Book A Discovery Session with SmartEdge Consulting "
        >
          Book A Discovery Session
        </Button>
      </div>
    </section>
  );
};

export default Works;
