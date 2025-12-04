"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contactInfo, socials } from "@/lib/data";
import { useState } from "react";
import { toast } from "sonner";
import * as Icons from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const year = new Date().getFullYear();

  // Footer links
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Careers", href: "/" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      toast.success(data.message);
      setEmail("");
    } catch (error) {
      setStatus("error");
      toast.error(
        error instanceof Error ? error.message : "Failed to subscribe"
      );
    }
  };

  return (
    <footer className="bg-primary">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {/**first  */}
          <div className="text-slate-300 text-sm sm:text-base">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl text-accent mb-2 font-bold">
                SmartEdge
              </h3>
              <p className="">Consulting & Analytics</p>
            </div>
            <p className="leading-7">
              Transforming businesses through data-driven insights and
              cutting-edge analytics solutions. Your trusted partner in the data
              revolution.
            </p>
          </div>
          {/**second */}
          <div>
            <h4 className="uppercase text-white text-sm sm:text-base mb-4">
              Quick Links
            </h4>
            <ul className="text-slate-300 text-sm sm:text-base">
              {quickLinks.map((link, index) => {
                return (
                  <li key={index} className="mb-2">
                    <a href={link.href}>{link.label}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/**third */}
          <div>
            <h4 className="uppercase text-white text-sm sm:text-base mb-4">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-2.5">
              {contactInfo.map((contact) => {
                const Icon = Icons[
                  contact.icon as keyof typeof Icons
                ] as React.ComponentType<{
                  size?: number;
                  strokeWidth?: number;
                  className?: string;
                }>;
                return (
                  <div key={contact.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 flex items-center justify-center text-secondary rounded-lg">
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm text-slate-200">
                        {contact.info}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t flex justify-center items-center py-10">
          <div className="text-center">
            <h4 className="uppercase text-white text-sm sm:text-base mb-4">
              Suscribe to Our NewsLetter
            </h4>
            <p className="text-slate-300 text-sm sm:text-base mb-2.5">
              Get weekly insights, tips, and business intelligence updates.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2.5">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                className="flex-1"
              />
              <Button
                type="submit"
                size="md"
                disabled={status === "loading" || !email}
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t flex flex-col sm:flex-row gap-5 justify-between items-center pt-10">
          <div className="flex gap-1.5 sm:gap-2 ">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <div
                  key={social.id}
                  className="flex items-center justify-center h-10 w-10 rounded-full border group"
                >
                  <a
                    href={social.href}
                    aria-label={social.name}
                    target="open_blank"
                    className="mx-2"
                  >
                    <Icon className="w-5 h-5  transition-transform duration-200 group-hover:scale-110" />
                  </a>
                </div>
              );
            })}
          </div>
          <div>
            <p className="text-slate-300 text-xs sm:text-sm">
              &copy; {year} SmartEdge Consulting & Analytics. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
