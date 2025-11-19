const BlogsSkeleton = () => (
  <div className="grid grid-cols-1 gap-5">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="w-full flex flex-col sm:flex-row border rounded-xl overflow-hidden bg-white shadow-sm"
      >
        <div className="w-full sm:w-1/3 h-56 sm:h-auto bg-gray-200 animate-pulse" />
        <div className="flex flex-col justify-center gap-3 p-6 sm:w-2/3 bg-primary/10">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
        </div>
      </div>
    ))}
  </div>
);

export default BlogsSkeleton;
