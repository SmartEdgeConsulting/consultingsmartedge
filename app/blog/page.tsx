import React from "react";

import Blogs from "@/sections/Blogs";
import BlogHero from "@/sections/hero/BlogHero";

const BlogPage = async () => {
  return (
    <main className="mt-16">
      <BlogHero />
      <Blogs />
    </main>
  );
};

export default BlogPage;
