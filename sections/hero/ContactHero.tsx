import Heading from "@/components/Heading";
import { MessageSquareMore } from "lucide-react";


const ContactHero = () => {
  
  return (
    <section className="contact-animate py-15 flex flex-col">
      <div className="flex flex-col items-center mx-auto text-center px-4 sm:px-6 lg:px-8">
        <Heading title="Get in Touch" icon={<MessageSquareMore size={18} />} />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pry mb-6">
          Let&apos;s Build Smarter <span className="text-sec">Solutions</span>{" "}
          Together
        </h1>
        <p className="text-base sm:text-xl leading-7 text-slate-800 max-w-3xl mb-8 text-center">
          We&apos;d love to understand your goals and discuss how SmartEdge can
          help you unlock the power of your data.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
