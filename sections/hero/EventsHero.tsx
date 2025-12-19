import Heading from "@/components/Heading";
import { Calendar } from "lucide-react";

const EventHero = () => {
  return (
    <header className="py-8 sm:py-10 lg:py-14 scroll-mt-16">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <Heading title="Our Events" icon={<Calendar size={18} />} />
        <h1 className="hero-heading">
          What&apos;s Next at{" "}
          <span className="text-gradient-primary">SmartEdge?</span>
        </h1>
      </div>
    </header>
  );
};

export default EventHero;
