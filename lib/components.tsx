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
      if (!value?.asset?._ref) return null;
      const imageUrl = urlFor(value).url();
      if (!imageUrl) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full h-72 sm:h-96 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt || "Blog image"}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              loading="lazy"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-xs text-stone-400 font-sans italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-4xl font-black text-stone-900 mt-14 mb-4 leading-tight tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-stone-900 mt-10 mb-2 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold text-stone-900 mt-8 mb-1 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg font-bold text-stone-800 mt-6 mb-1 leading-snug">
        {children}
      </h4>
    ),
    h5: ({ children }: { children?: React.ReactNode }) => (
      <h5 className="text-base font-semibold text-stone-700 mt-5 mb-1 uppercase tracking-widest font-sans">
        {children}
      </h5>
    ),
    h6: ({ children }: { children?: React.ReactNode }) => (
      <h6 className="text-sm font-semibold text-stone-500 mt-4 mb-1 uppercase tracking-widest font-sans">
        {children}
      </h6>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-base leading-relaxed text-stone-600 my-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-[3px] border-amber-600 pl-6 my-8">
        <p className="text-xl italic text-stone-800 leading-snug">{children}</p>
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 space-y-2 text-stone-600 my-6 leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 space-y-2 text-stone-600 my-6 leading-relaxed">
        {children}
      </ol>
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
          className="text-blue-700 underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-stone-900">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-stone-500">{children}</em>
    ),
  },
};
