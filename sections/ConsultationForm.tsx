import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import Image from "next/image";
import React from "react";

const ConsultationForm = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-0 shadow-lg rounded-2xl overflow-hidden bg-white">
          {/* Image Section */}
          <div className="w-full lg:w-2/5 bg-white hidden sm:flex justify-center items-center p-6">
            <Image
              src="/consult.jpg"
              alt="Consultation Page image"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-3/5 p-6 sm:p-8 lg:p-12">
            <header className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                Get a Free 30-Minute{" "}
                <span className="text-gradient-primary">Data</span> Strategy
                Session
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We&apos;ll help you understand how data can improve your
                decisions, marketing, customer insights, and operations.
              </p>
            </header>

            <form className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-primary"
                >
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-primary"
                >
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="janedoe@example.com"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="company"
                  className="text-sm font-medium text-primary"
                >
                  Company
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Your company name"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="challenge"
                  className="text-sm font-medium text-primary"
                >
                  Challenge <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="challenge"
                  placeholder="Tell us about your challenge and let's help..."
                  required
                  rows={5}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full sm:w-auto font-semibold gap-2 transition-all hover:gap-3"
              >
                Send Message <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
