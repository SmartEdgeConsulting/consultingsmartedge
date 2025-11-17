import Heading from "@/components/Heading";
import { Newspaper } from "lucide-react";
import React from "react";

const BlogHero = () => {
  return (
    <section className="py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Heading title="Our Blog" icon={<Newspaper size={18} />} />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-8">
          Insights that Inspire <span className="text-secondary">Action</span>
        </h1>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-800 max-w-3xl mx-auto mb-8">
          Stay informed with thought-leadership articles, business intelligence
          tips, and analytics case studies from our team.
        </p>
      </div>
    </section>
  );
};

export default BlogHero;
