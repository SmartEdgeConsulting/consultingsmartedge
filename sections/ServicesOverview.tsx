import Heading from "@/components/Heading";
import ServiceCard from "@/components/ServiceCard";
import { servicesData } from "@/lib/data";
import { Zap } from "lucide-react";

const ServicesOverview = () => {
  return (
    <section className="py-20 scroll-mt-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <Heading title="What We Do" icon={<Zap size={18} />} />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Giving You An Edge That&apos;s{" "}
            <span className="text-secondary">Smart…</span>
          </h2>
          <p className="text-base sm:text-xl text-slate-800 leading-relaxed max-w-3xl mb-8 mx-auto">
            From data to decisions, we deliver tailored solutions that transform
            how you work, plan, and grow.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            return <ServiceCard key={service.id} {...service} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
