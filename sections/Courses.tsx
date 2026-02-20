import CourseCard from "@/cards/CourseCard";
import { getCourses } from "@/src/sanity/queries";
import { coursesProps } from "@/types";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { sanityFetch } from "@/src/sanity/live";

const COURSES_PER_PAGE = 6;

const Courses = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const allCourses: coursesProps[] = [];
  let totalPages = 1;
  let paginatedCourses: coursesProps[] = [];

  try {
    // Fetch all courses
    const { data: allCourses } = await sanityFetch({ query: getCourses });

    // Calculate pagination
    totalPages = Math.ceil(allCourses.length / COURSES_PER_PAGE);

    // Get courses for current page
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    const endIndex = startIndex + COURSES_PER_PAGE;
    paginatedCourses = allCourses.slice(startIndex, endIndex);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Show max 5 page numbers

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, last page, and pages around current page
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        // Middle
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++)
          pageNumbers.push(i);
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="text-4xl font-bold text-primary text-center mb-10">
        Our <span className="text-gradient-primary">Courses</span>
      </h1>
      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 px-5">
        {paginatedCourses.length > 0 ? (
          paginatedCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No courses found
          </div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${currentPage - 1}`}
                aria-disabled={currentPage <= 1}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNum, index) => (
              <PaginationItem key={index}>
                {pageNum === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href={`?page=${pageNum}`}
                    isActive={currentPage === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href={`?page=${currentPage + 1}`}
                aria-disabled={currentPage >= totalPages}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      {/* Optional: Showing results info */}
      {allCourses.length > 0 && (
        <div className="text-sm text-gray-500 mt-4">
          Showing {(currentPage - 1) * COURSES_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * COURSES_PER_PAGE, allCourses.length)} of{" "}
          {allCourses.length} courses
        </div>
      )}
    </div>
  );
};

export default Courses;
