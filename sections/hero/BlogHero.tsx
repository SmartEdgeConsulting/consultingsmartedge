import Heading from "@/components/Heading";
import { Newspaper } from "lucide-react";
import React from "react";

const BlogHero = () => {
  return (
    <header className="py-8 sm:py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Heading title="Our Blog" icon={<Newspaper size={18} />} />
        <h1 className="hero-heading">
          Insights that Inspire <span className="text-gradient-primary">Action</span>
        </h1>
        <p className="hero-paragraph">
          Stay informed with thought-leadership articles, business intelligence
          tips, and analytics case studies from our team.
        </p>
      </div>
    </header>
  );
};

export default BlogHero;
