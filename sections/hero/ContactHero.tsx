import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { MessageSquareMore } from "lucide-react";
import Link from "next/link";

const ContactHero = () => {
  return (
    <header className="py-12 sm:py-14 lg:py-16 scroll-mt-16">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <Heading title="Get in Touch" icon={<MessageSquareMore size={18} />} />
        <h1 className="hero-heading">
          Let&apos;s Build Smarter{" "}
          <span className="text-gradient-primary">Solutions</span> Together
        </h1>
        <p className="hero-paragraph">
          We&apos;d love to understand your goals and discuss how SmartEdge can
          help you unlock the power of your data.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-center">
          <Button
            variant="default"
            className="text-md font-bold"
            aria-label="Book Consultation"
            aria-roledescription="navigation button"
          >
            <Link href="/consultation">Book a Consultation</Link>
          </Button>
          <Button
            variant="darkoutline"
            className="text-md font-bold"
            aria-label="Join or community platforms"
            aria-roledescription="navigation button"
          >
            <a
              href="https://chat.whatsapp.com/EqE8eCwYLbT8kO69Euqxc9"
              aria-label="community invite link"
              target="open_blank"
            >
              Join Our Community
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ContactHero;
