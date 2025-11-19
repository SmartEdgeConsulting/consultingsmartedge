import React from "react";
import { components } from "@/lib/components";
import { formatDate } from "@/lib/utils/format-date";
import { urlFor } from "@/lib/utils/image-builder";
import getReadingTime from "@/lib/utils/read-time";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { Article } from "@/types";
import ShareArticle from "./ShareArticle";

const BlogContent = ({ article }: { article: Article }) => {
  return (
    <div>
      <div className="flex flex-col gap-5 py-5 lg:px-35 sm:px-25 px-5">
        {/* Meta info */}
        <div className="text-sm font-medium text-blue">
          <span>{formatDate(article.publishedAt)}</span> •{" "}
          <span>{getReadingTime(article.content)}</span>
        </div>

        {/* Title */}
        <h1 className="mt-2 sm:text-4xl text-3xl text-primary lg:font-extrabold sm:font-semibold font-bold sm:leading-10 leading-9">
          {article.title}
        </h1>

        {/* Cover image */}
        {article.coverImage && (
          <div className="sm:px-12.5 px-2.5">
            <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[400px]">
              <Image
                src={urlFor(article.coverImage)?.url() || "/placeholder.png"}
                alt={article.title || "Blog cover image"}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover rounded-md"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        )}

        {/* Body content */}
        <PortableText value={article.content} components={components} />

        <ShareArticle slug={article.slug} title={article.title} />
      </div>
    </div>
  );
};

export default BlogContent;
