import BlogCard from "@/cards/BlogCard";
import BlogsSkeleton from "@/components/BlogsSkeleton";
import { Suspense } from "react";
import { client } from "@/src/sanity/client";
import { getArticles } from "@/src/sanity/queries";
import { Article } from "@/types";
import { Briefcase } from "lucide-react";

const options = { next: { revalidate: 30 } };

const Blogs = async () => {
  const articles: Article[] = await client.fetch(getArticles, {}, options);

  if (!articles?.length) {
    return (
      <section className="mx-auto px-4 sm:px-10 lg:px-20 py-10 max-w-7xl">
        <div className="h-[250px] bg-white rounded-lg shadow-lg text-slate-400 flex flex-col items-center justify-center">
          <Briefcase className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-base">No Blog Article</h3>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mx-auto px-4 sm:px-10 lg:px-20 py-5 max-w-7xl">
        <Suspense fallback={<BlogsSkeleton />}>
          <div
            className="grid grid-cols-1 gap-5 items-start"
            role="list"
            aria-label="Blog articles"
          >
            {articles.map((article, index) => (
              <BlogCard article={article} key={article._id} index={index} />
            ))}
          </div>
        </Suspense>
      </div>
    </section>
  );
};

export default Blogs;
