import Image from "next/image";
import { urlFor } from "./utils/image-builder";
import { PortableTextComponents } from "@portabletext/react";

interface ImageValue {
  asset?: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  caption?: string;
}

interface LinkValue {
  href: string;
}

export const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      const imageUrl = urlFor(value).url();
      if (!imageUrl) return null;
      return (
        <figure className="my-4">
          <div className="relative w-full h-[300px] my-6">
            <Image
              src={imageUrl}
              alt={value.alt || "Blog image"}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              loading="lazy"
              className="object-cover rounded-md"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-primary">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-semibold mt-6 mb-3 text-primary">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold mt-5 mb-2 text-primary">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="leading-6 text-sm sm:text-base text-gray-500 text-justify">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 space-y-2 text-gray-500">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 space-y-2 text-gray-500">{children}</ol>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: LinkValue;
    }) => {
      const rel =
        value?.href && !value.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
      return (
        <a
          href={value?.href}
          rel={rel}
          target={rel ? "_blank" : "_self"}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-extrabold text-primary">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-gray-500 leading-6 text-sm sm:text-base">
        {children}
      </em>
    ),
  },
};
