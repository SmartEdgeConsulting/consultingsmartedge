"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ConsultationFormData, consultationSchema } from "@/src/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ConsultationForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      challenge: "",
    },
  });

  const onSubmit = async (data: ConsultationFormData) => {
    try {
      const res = await fetch("/api/consultations/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      if (result.success) {
        toast.success("Consultation Submitted Successfully!");
        reset();
        router.push("/");
      } else {
        toast.error("Error submitting consultation: " + result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit consultation. Please try again.");
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-0 shadow-lg rounded-2xl overflow-hidden bg-white border-t-4 border-primary">
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

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("name")}
                  required
                  className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
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
                  {...register("email")}
                  required
                  className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
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
                  {...register("company")}
                  className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                />
                {errors.company && (
                  <p className="text-xs text-red-500">
                    {errors.company.message}
                  </p>
                )}
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
                  {...register("challenge")}
                  required
                  rows={5}
                  className="resize-none border-gray-300 focus:border-primary focus:ring-primary min-h-[120px]"
                />
                {errors.challenge && (
                  <p className="text-xs text-red-500">
                    {errors.challenge.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="default"
                disabled={!isValid || isSubmitting}
                size="lg"
                className="w-full sm:w-auto font-semibold gap-2 transition-all hover:gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
