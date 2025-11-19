import React from "react";

import Blogs from "@/sections/Blogs";
import BlogHero from "@/sections/hero/BlogHero";
export const dynamic = 'force-dynamic';

const BlogsPage = () => {
  return (
    <main className="mt-16">
      <BlogHero />
      <Blogs />
    </main>
  );
};

export default BlogsPage;
