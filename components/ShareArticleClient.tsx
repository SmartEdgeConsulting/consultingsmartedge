"use client";
import { Link } from "lucide-react";
import {
  XIcon,
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/lib/social-icons";

const ShareArticleClient = ({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) => {
  const fullUrl = `${window.location.origin}/blog/${slug}`;

  const copyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      console.info("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="mt-8 border-t pt-5">
      <h3 className="text-sm font-semibold my-2">Share this article</h3>

      <div className="flex gap-3 text-xl">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <FacebookIcon color="#1877F2" size={20} />
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <XIcon color="#000000" size={20} />
        </a>

        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon color="#0A66C2" size={20} />
        </a>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title} - ${fullUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
        >
          <WhatsAppIcon color="#25D366" size={20} />
        </a>

        <button
          onClick={copyLink}
          aria-label="Copy link"
          className="text-gray-500 hover:text-gray-800"
        >
          <Link size={20} />
        </button>
      </div>
    </div>
  );
};

export default ShareArticleClient;
