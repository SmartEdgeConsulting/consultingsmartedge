import React from "react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Form = () => {
  return (
    <form className="my-5">
      <div className="w-full flex flex-col gap-10">
        <div className="w-full flex flex-col sm:flex-row gap-10 sm:gap-4">
          <div className="w-full grid gap-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="name"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="w-full grid gap-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" type="text" placeholder="Your company name" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="company">Message *</Label>
          <Textarea
            id="company"
            placeholder="Tell us about your project and how we can help..."
            required
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="sm"
          className="w-full font-extrabold text-white"
        >
          Send Message <Send />
        </Button>
      </div>
    </form>
  );
};

export default Form;
