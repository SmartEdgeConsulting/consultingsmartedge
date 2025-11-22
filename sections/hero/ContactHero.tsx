import Heading from "@/components/Heading";
import { MessageSquareMore } from "lucide-react";

const ContactHero = () => {
  return (
    <header className="contact-animate py-12 sm:py-14 lg:py-16 scroll-mt-16">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <Heading title="Get in Touch" icon={<MessageSquareMore size={18} />} />
        <h1 className="hero-heading">
          Let&apos;s Build Smarter Solutions Together
        </h1>
        <p className="hero-paragraph">
          We&apos;d love to understand your goals and discuss how SmartEdge can
          help you unlock the power of your data.
        </p>
      </div>
    </header>
  );
};

export default ContactHero;
