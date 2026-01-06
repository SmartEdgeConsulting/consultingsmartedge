"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResearchFormData, researchSchema } from "@/src/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ResearchForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResearchFormData>({
    resolver: zodResolver(researchSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      business: "",
      budget: "",
      research: "",
      timeline: "",
    },
  });

  const onSubmit = async (data: ResearchFormData) => {
    try {
      console.log("Form submitted:", data);
      const res = await fetch("/api/research/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      if (result.success) {
        toast.success("Research request Submitted Successfully!");
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
    <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-b from-white to-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200">
          {/* Form Header */}
          <div className="bg-linear-to-r from-primary/10 to-primary/5 p-6 border-b border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">
              Request a Research Quote
            </h2>
            <p className="text-gray-600 mt-2">
              Fill out the form below and our team will get back to you within
              24 hours.
            </p>
          </div>

          {/* Research Form Section */}
          <div className="w-full p-6 sm:p-8 lg:p-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    {...register("name")}
                    className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register("email")}
                    className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                  />

                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="business" className="text-sm font-semibold">
                    Business <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="business"
                    type="text"
                    placeholder="Your company name"
                    {...register("business")}
                    className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                  />
                  {errors.business && (
                    <p className="text-sm text-red-500">
                      {errors.business.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-sm font-semibold">
                    Budget Range
                  </Label>
                  <select
                    id="budget"
                    {...register("budget")}
                    className="w-full h-12 px-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:border-primary focus:ring-primary focus:outline-none"
                  >
                    <option value="">Select a range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-30k">$15,000 - $30,000</option>
                    <option value="30k-plus">$30,000+</option>
                  </select>
                  {errors.budget && (
                    <p className="text-sm text-red-500">
                      {errors.budget.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="research" className="text-sm font-semibold">
                  Research Needs <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="research"
                  placeholder="Tell us about your research project, objectives, and any specific requirements..."
                  rows={6}
                  {...register("research")}
                  className="resize-none border-gray-300 focus:border-primary focus:ring-primary min-h-[120px]"
                />
                {errors.research && (
                  <p className="text-sm text-red-500">
                    {errors.research.message}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Please include details about your target audience, research
                  methodology preferences, and key questions you want answered.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-sm font-semibold">
                  Preferred Timeline
                </Label>
                <Input
                  id="timeline"
                  type="date"
                  {...register("timeline")}
                  className="h-12 border-gray-300 focus:border-primary focus:ring-primary text-gray-700"
                />
                {errors.timeline && (
                  <p className="text-sm text-red-500">
                    {errors.timeline.message}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-600 text-center sm:text-left">
                    By submitting this form, you agree to our{" "}
                    <a
                      href="#"
                      className="text-primary hover:underline font-medium"
                    >
                      Privacy Policy
                    </a>
                  </p>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="default"
                    size="lg"
                    className="text-white font-semibold gap-2 px-8 transition-all duration-300 hover:gap-3 hover:shadow-lg"
                  >
                    {isSubmitting ? "Sending..." : "Send Request"}{" "}
                    <Send className="h-4 w-4" />{" "}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchForm;
