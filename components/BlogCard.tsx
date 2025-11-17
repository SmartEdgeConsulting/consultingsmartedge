import { articlesProp } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({
  article,
  index,
}: {
  article: articlesProp;
  index: number;
}) => {
  return (
    <article
      className="
        w-full flex flex-col sm:flex-row 
        border rounded-xl overflow-hidden 
        bg-white shadow-sm hover:shadow-md transition-shadow
      "
    >
      {/* Image */}
      <div className="w-full sm:w-1/3 h-56 sm:h-auto relative">
        <Image
          src="/careers1.jpg"
          alt="blog coverimage"
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center gap-3 p-6 sm:w-2/3 bg-primary/10">
        <h3 className="text-xl sm:text-2xl font-semibold text-primary">
          {article.title}
        </h3>

        <div className="text-sm text-gray-500 uppercase">
          {article.date} • {article.category}
        </div>

        <p className="text-gray-600 line-clamp-3">
          {article.content}{" "}
          <Link
            href={`/blog/${article.slug}`}
            className="text-red-500 hover:underline"
          >
            Read more
          </Link>
        </p>
      </div>
    </article>
  );
};

export default BlogCard;
