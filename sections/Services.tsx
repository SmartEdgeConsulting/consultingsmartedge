import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";

const Services = () => {
  return (
    <section
      id="services"
      className="py-12 sm:py-16 lg:py-20 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
