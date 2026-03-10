import notFound from "@/app/not-found";
import BlogContent from "@/components/BlogContent";
import { urlFor } from "@/lib/utils/image-builder";
import { client } from "@/src/sanity/client";
import { getArticle } from "@/src/sanity/queries";
import { Article } from "@/types";
import { Metadata } from "next";
import React from "react";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article: Article = await client.fetch(getArticle, { slug });

  if (!article) notFound();

  const coverImageUrl = article.coverImage
    ? urlFor(article.coverImage).width(1200).height(630).url()
    : "/smartedge_logo.png";

  return {
    title: `${article.title} - SmartEdge Consulting & Analytics`,
    description: article.excerpt || "",
    keywords: [
      "SmartEdge",
      "Analytics",
      "Data Articles",
      "Blogs",
      "Insights",
      "Business Intelligence",
      "Case Studies",
      "Data Science",
      article.title.split(" ")[0],
    ],
    openGraph: {
      title: `${article.title} - SmartEdge Consulting & Analytics`,
      description: article.excerpt || "",
      url: `https://www.consultingsmartedge.com/blog/${article.slug}`,
      siteName: "SmartEdge Consulting & Analytics",
      images: [
        {
          url: coverImageUrl,
          width: 1200,
          height: 630,
          alt: "SmartEdge Consulting & Analytics",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} - SmartEdge Consulting & Analytics`,
      description: article.excerpt || ""
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `https://www.consultingsmartedge.com/blog/${article.slug}`,
    }
  };
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { slug } = await params;

  const article: Article = await client.fetch(getArticle, { slug });

  if (!article) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-10 text-center text-gray-600">
        <p>Sorry, this article could not be found.</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl mt-16">
      <BlogContent article={article} />
    </main>
  );
};

export default BlogPage;
