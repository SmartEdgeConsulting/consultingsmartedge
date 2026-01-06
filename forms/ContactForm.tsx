import React from "react";
import { Button } from "../components/ui/button";
import { Send } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormData, contactSchema } from "@/src/zod/schema";
import { toast } from "sonner";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        reset();
      } else {
        toast.error(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section className="shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200">
      <div className="bg-linear-to-r from-primary/10 to-primary/5 p-6 border-b border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary">
          Send us a Message
        </h2>
        <p className="text-gray-600 mt-2">
          Fill out the form below and we&apos;ll get back to you within 24
          hours.
        </p>
      </div>
      <form className="my-8 px-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-8">
          {/* Name & Email Row */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-sm font-semibold flex items-center gap-1"
              >
                Full Name
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="h-11 border-gray-300 focus:border-primary focus:ring-primary transition-all duration-300 hover:border-gray-400 px-4"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-sm font-semibold flex items-center gap-1"
              >
                Email Address
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className="h-11 border-gray-300 focus:border-primary focus:ring-primary transition-all duration-300 hover:border-gray-400 px-4"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Company Field */}
          <div className="space-y-3">
            <Label htmlFor="company" className="text-sm font-semibold">
              Company{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="Acme Inc."
              {...register("company")}
              className="h-11 border-gray-300 focus:border-primary focus:ring-primary transition-all duration-300 hover:border-gray-400 px-4"
            />
            {errors.company && (
              <p className="text-sm text-red-500">{errors.company.message}</p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-3">
            <Label
              htmlFor="message"
              className="text-sm font-semibold flex items-center gap-1"
            >
              Message
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project, goals, and how we can help"
              {...register("message")}
              className="resize-none border-gray-300 focus:border-primary focus:ring-primary transition-all duration-300 hover:border-gray-400 min-h-[100px] p-4"
              rows={5}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
            <p className="text-xs text-slate-800 mt-2">
              Please provide as much detail as possible about your project
              requirements.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full group"
              disabled={isSubmitting}
            >
              <span className="flex items-center justify-center gap-3">
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </Button>

            <p className="text-xs text-slate-800 text-center mt-4">
              We typically respond within 24 hours on business days.
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;