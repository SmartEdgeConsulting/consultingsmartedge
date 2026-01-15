import React from "react";

import Blogs from "@/sections/Blogs";
import BlogHero from "@/sections/hero/BlogHero";
import { Metadata } from "next";
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "SmartEdge's Blog - Insights that Keep You Ahead",
};

const BlogsPage = () => {
  return (
    <main className="mt-16">
      <BlogHero />
      <Blogs />
    </main>
  );
};

export default BlogsPage;
