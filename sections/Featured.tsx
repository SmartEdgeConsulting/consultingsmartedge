import { Button } from "@/components/ui/button";
import React from "react";

const Featured = () => {
  return (
    <section className="py-10 bg-primary/10">
      <div className="mx-auto max-w-7xl items-center flex flex-col text-center gap-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
          The Automated Data Lab
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-800 max-w-3xl mx-auto mb-8">
          Try our Automated Data Lab — a simple tool that lets you upload your
          data securely and get an instant insight summary. No meetings, no
          waiting — just clarity.
        </p>
        <Button className="font-bold">Try the Data Lab</Button>
      </div>
    </section>
  );
};

export default Featured;
