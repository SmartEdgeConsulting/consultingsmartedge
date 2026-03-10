import React from "react";
import { components } from "@/lib/components";
import { formatDate } from "@/lib/utils/format-date";
import { urlFor } from "@/lib/utils/image-builder";
import getReadingTime from "@/lib/utils/read-time";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { Article } from "@/types";
import ShareArticle from "./ShareArticle";
import BackButton from "./BackButton";
import ProgressBar from "./ProgressBar";

const BlogContent = ({ article }: { article: Article }) => {
  return (
    <div>
      <ProgressBar />
      <BackButton />
      <div className="flex flex-col gap-5 py-5 lg:px-35 sm:px-25 px-5">
        {/* Hero */}
        <header className="max-w-2xl mx-auto px-6 pt-14 pb-10 text-center">
          <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-gradient-primary bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-5 font-sans">
            {article.category}
          </span>
          <h1 className="text-4xl sm:text-5xl text-primary leading-tight tracking-tight mb-5">
            {article.title}
          </h1>

          <div className="flex items-center justify-center gap-3 text-xs text-stone-400 font-sans flex-wrap">
            <span className="font-semibold text-stone-600">
              {article.author.name}
            </span>
            <span className="text-stone-200 text-base">|</span>
            <time>{formatDate(article.publishedAt)}</time>
            <span className="text-stone-200 text-base">|</span>
            <span>{getReadingTime(article.content)}</span>
          </div>
        </header>

        {/* Cover image */}
        {article.coverImage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-14">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <Image
                src={
                  urlFor(article.coverImage).width(1200).height(675).url() ||
                  "/placeholder.png"
                }
                alt={article.title || "Blog cover image"}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
                fetchPriority="high"
              />
            </div>
            {article.coverImage.caption && (
              <p className="text-center text-xs text-stone-400 font-sans italic mt-2.5">
                {article.coverImage.caption}
              </p>
            )}
          </div>
        )}

        {/**Divider */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex-1 h-px bg-stone-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-primary opacity-60" />
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        {/* Body content */}
        <PortableText value={article.content} components={components} />

        <ShareArticle slug={article.slug} title={article.title} />
      </div>
    </div>
  );
};

export default BlogContent;
