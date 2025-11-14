import ContactCard from "@/components/ContactCard";
import Form from "@/components/Form";
import { contactInfo } from "@/lib/data";

const Contact = () => {
  return (
    <section className="contact-animate mx-auto px-4 sm:px-8 lg:px-10 flex flex-col sm:flex-row gap-15 items-start py-20">
      <div className=" sm:w-[40%] w-full flex flex-col gap-2.5">
        {contactInfo.map((contact) => (
          <ContactCard
            key={contact.id}
            id={contact.id}
            icon={contact.icon}
            label={contact.label}
            info={contact.info}
            description={contact.description}
          />
        ))}
      </div>

      <div className="bg-pry sm:w-[60%] w-full rounded-lg p-5">
        <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4">
          Send us a Message
        </h4>
        <p className="text-sm sm:text-base leading-7 text-slate-300 max-w-3xl mb-8">
          Fill out the form below and we&apos;ll get back to you within 24
          hours.
        </p>

        <Form />
      </div>
    </section>
  );
};

export default Contact;
