import Heading from "@/components/Heading";
import { MessageSquareMore } from "lucide-react";


const ContactHero = () => {
  
  return (
    <section className="contact-animate py-12 sm:py-16 lg:py-20 scroll-mt-16">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <Heading title="Get in Touch" icon={<MessageSquareMore size={18} />} />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pry mb-6">
          Let&apos;s Build Smarter <span className="text-sec">Solutions</span>{" "}
          Together
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-slate-800 max-w-3xl mx-auto mb-8">
          We&apos;d love to understand your goals and discuss how SmartEdge can
          help you unlock the power of your data.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
