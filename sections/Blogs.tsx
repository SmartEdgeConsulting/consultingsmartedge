import BlogCard from "@/components/BlogCard";
import NoBlog from "@/components/NoBlog";
import { blogArticles } from "@/lib/data";
import React from "react";

const Blogs = () => {
  return (
    <section>
      <div className="mx-auto px-4 sm:px-10 lg:px-20 py-10 max-w-7xl">
        {blogArticles && blogArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 items-start">
            {blogArticles.map((article, index) => (
              <BlogCard article={article} key={article.id} index={index} />
            ))}
          </div>
        ) : (
          <NoBlog />
        )}
      </div>
    </section>
  );
};

export default Blogs;
