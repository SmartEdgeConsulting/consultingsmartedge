import ContactCard from "@/cards/ContactCard";
import ContactForm from "@/forms/ContactForm";
import { contactInfo } from "@/lib/data";

const Contact = () => {
  return (
    <section className="contact-animate py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 flex flex-col sm:flex-row gap-15 items-start">
        <div className="sm:w-[60%] w-full">
          <ContactForm />
        </div>

        <div className="sm:w-[40%] w-full flex flex-col gap-2.5">
          {contactInfo.map((contact) => (
            <ContactCard key={contact.id} {...contact} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
