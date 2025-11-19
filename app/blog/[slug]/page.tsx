
import BlogContent from "@/components/BlogContent";
import { client } from "@/src/sanity/client";
import { getArticle } from "@/src/sanity/queries";
import { Article } from "@/types";
import React from "react";

interface BlogPageProps {
  params: Promise<{ slug: string }>; 
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { slug } = await params;

  const article : Article = await client.fetch(getArticle, { slug });

  if (!article) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-10 text-center text-gray-600">
        <p>Sorry, this article could not be found.</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl mt-16">
      <BlogContent article={article}/>
    </main>
  );
};

export default BlogPage;
