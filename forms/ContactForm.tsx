import React from "react";
import { Button } from "../components/ui/button";
import { Send } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

const ContactForm = () => {
  return (
    <form className="my-8">
      <div className="w-full flex flex-col gap-8">
        {/* Name & Email Row */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-3">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-white flex items-center gap-1"
            >
              Full Name
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              className="h-11 border-gray-300 focus:border-primary focus:ring-primary transition-all duration-300 hover:border-gray-400 px-4"
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-white flex items-center gap-1"
            >
              Email Address
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
              className="h-11 border-gray-300 focus:border-primary focus:ring-primary transition-all duration-300 hover:border-gray-400 px-4"
            />
          </div>
        </div>

        {/* Company Field */}
        <div className="space-y-3">
          <Label htmlFor="company" className="text-sm font-semibold text-white">
            Company{" "}
            <span className="text-gray-400 font-normal">(Optional)</span>
          </Label>
          <Input
            id="company"
            type="text"
            placeholder="Acme Inc."
            className="h-11 border-gray-300 focus:border-primary focus:ring-primary transition-all duration-300 hover:border-gray-400 px-4"
          />
        </div>

        {/* Message Field */}
        <div className="space-y-3">
          <Label
            htmlFor="message"
            className="text-sm font-semibold text-white flex items-center gap-1"
          >
            Message
            <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="Tell us about your project, goals, and how we can help..."
            required
            className="resize-none border-gray-300 focus:border-primary focus:ring-primary transition-all duration-300 hover:border-gray-400 min-h-[100px] p-4"
            rows={5}
          />
          <p className="text-xs text-slate-300 mt-2">
            Please provide as much detail as possible about your project
            requirements.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button type="submit" variant="default" size="lg" className="w-full">
            <span className="flex items-center justify-center gap-3">
              Send Message
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </span>
          </Button>

          <p className="text-xs text-slate-300 text-center mt-4">
            We typically respond within 24 hours on business days.
          </p>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
