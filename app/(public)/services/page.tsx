import ServiceHero from "@/sections/hero/ServiceHero";
import Services from "@/sections/Services";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "SmartEdge's Expertise - What We Offer",
};

const ServicePage = () => {
  return (
    <main>
      <ServiceHero />
      <Services />
    </main>
  );
};

export default ServicePage;
