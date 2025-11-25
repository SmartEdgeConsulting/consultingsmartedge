import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import React from "react";

const ConsultationForm = () => {
  return (
    <section className="py-6 sm:py-8 lg:py-10">
      <form className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 shadow-md rounded-lg py-10">
        <div className="w-full flex flex-col gap-10">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name </Label>
            <Input
              id="name"
              type="name"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email Address </Label>
            <Input
              id="email"
              type="email"
              placeholder="janedoe@example.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" type="text" placeholder="Your company name" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="company">Challenge </Label>
            <Textarea
              id="company"
              placeholder="Tell us about your challenge and lets help..."
              required
            />
          </div>

          <Button
            type="submit"
            variant="default"
            size="sm"
            className="font-extrabold text-white"
          >
            Send Message <Send />
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ConsultationForm;
