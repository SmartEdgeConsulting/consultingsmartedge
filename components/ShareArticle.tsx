"use client"

import dynamic from "next/dynamic";

const ShareArticleClient = dynamic(() => import("./ShareArticleClient"), {
  ssr: false,
  loading: () => (
    <div className="mt-8 border-t pt-5">
      <h3 className="text-sm font-semibold my-2">Share this article</h3>
      <div className="flex gap-3 text-xl">
        <div className="w-20 h-5 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  ),
});

const ShareArticle = ({ title, slug }: { title: string; slug: string }) => {
  return <ShareArticleClient title={title} slug={slug} />;
};

export default ShareArticle;