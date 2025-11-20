import { urlFor } from "@/lib/utils/image-builder";
import { Article, PortableTextBlock } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

const BlogCard = ({ article, index }: { article: Article; index: number }) => {
  //function to convert block of content to plain text
  const getPlainText = (blocks: PortableTextBlock[]): string =>
    blocks
      .map((block) => block.children?.map((child) => child.text).join("") || "")
      .join("\n");

  const previewText = useMemo(() => {
    // Filter only portable text blocks for text extraction
    const textBlocks = article.content.filter(
      (block): block is PortableTextBlock => block._type === "block"
    );

    if (textBlocks.length === 0) {
      return "No content available...";
    }

    //convert block of content to plain text and return te sliced text
    const text = getPlainText(textBlocks);
    return text.length > 180 ? text.slice(0, 180) + "..." : text;
  }, [article.content]);

  return (
    <article
      className="
        w-full flex flex-col sm:flex-row 
        border rounded-xl overflow-hidden 
        bg-white shadow-sm hover:shadow-md transition-shadow
      "
      role="listitem"
    >
      {/* Cover Image */}
      <div className="w-full sm:w-1/3 h-56 sm:h-auto relative">
        <Image
          src={urlFor(article.coverImage.asset).url() || "/placeholder.jpg"}
          alt={`Cover image for ${article.title}`}
          fill
          className="object-cover"
          loading={index < 3 ? "eager" : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center gap-3 p-6 sm:w-2/3 bg-primary/10">
        {/**Blog Details */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-primary">
            {article.title}
          </h3>

          <div className="text-xs text-gray-500 uppercase mb-4">
            {article.category}
          </div>

          <p className="text-gray-600">
            {previewText}
            <Link
              href={`/blog/${article.slug}`}
              className="text-red-500 hover:underline"
              aria-label={`Read more about ${article.title}`}
            >
              Read more
            </Link>
          </p>
        </div>

        <div className="flex gap-2.5 items-center mt-3">
          <div className="relative h-8 w-8 rounded-full border border-black overflow-hidden">
            <Image
              src={
                article.author?.profilePicture?.asset
                  ? urlFor(article.author.profilePicture.asset).url()
                  : "/user.png"
              }
              alt={article.author?.name || "User avatar"}
              fill
              sizes="32px"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col text-xs text-gray-600">
            <span className="font-medium">
              {article.author?.name || "Anonymous"}
            </span>
            <span>
              {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",

                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
