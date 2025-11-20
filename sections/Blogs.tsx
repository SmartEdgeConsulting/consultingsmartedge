import BlogCard from "@/card-components/BlogCard";
import BlogsSkeleton from "@/components/BlogsSkeleton";
import NoBlog from "@/components/NoBlog";
import { Suspense } from "react";
import { client } from "@/src/sanity/client";
import { getArticles } from "@/src/sanity/queries";
import { Article} from "@/types";

const options = { next: { revalidate: 30 } };

const Blogs = async () => {
  const articles : Article[] = await client.fetch(getArticles, {}, options);

  if (!articles?.length) {
    return (
      <section>
        <div className="mx-auto px-4 sm:px-10 lg:px-20 py-10 max-w-7xl">
          <NoBlog />
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
