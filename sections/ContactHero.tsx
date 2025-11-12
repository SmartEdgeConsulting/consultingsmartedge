import Heading from "@/components/Heading";
import { MessageSquareMore } from "lucide-react";


const ContactHero = () => {
  
  return (
    <section className="contact-animate py-20 flex flex-col">
      <div className="flex flex-col items-center">
        <Heading title="Get in Touch" icon={<MessageSquareMore size={18} />} />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Let&apos;s Build Smarter <span className="text-sec">Solutions</span>{" "}
          Together
        </h1>
        <p className="text-sm sm:text-xl text-slate-300 max-w-3xl mb-8 text-center">
          We&apos;d love to understand your goals and discuss how SmartEdge can
          help you unlock the power of your data
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
