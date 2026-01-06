"use client";

import { useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useApplicationsStore, usePusherInit } from "@/store/applicationsStore";
import ApplicationTable from "@/tables/ApplicationTable";
import NoList from "@/components/NoList";
import AdminLoader from "@/components/AdminLoader";

const ITEMS_PER_PAGE = 10;

const ApplicationDashboardPage = () => {
  const {
    applications,
    currentPage,
    isLoading,
    fetchApplications,
    setCurrentPage,
    markApplicationRead,
  } = useApplicationsStore();

  usePusherInit();
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  useEffect(() => {
    const timer = setTimeout(() => {
      markApplicationRead();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "ellipsis", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "ellipsis",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="space-y-6 py-2">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-base sm:text-2xl font-bold text-gray-900 tracking-tight">
            Job Applications
          </h1>
          <p className="text-sm text-gray-600 mt-2 font-normal">
            Manage and review all job application requests in one place
          </p>
        </div>
      </div>

      {isLoading ? (
        <AdminLoader title="application" />
      ) : applications.length === 0 ? (
        <NoList
          title="applications"
          description=" Job applications will appear here once candidates start applying
              to your positions."
        />
      ) : (
        <>
          {/* Desktop Table */}
          <ApplicationTable />

          {/* Pagination and Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 font-medium bg-gray-50 px-4 py-2.5 rounded-lg">
              Showing{" "}
              <span className="font-bold text-gray-900">{startIndex + 1}</span>{" "}
              to{" "}
              <span className="font-bold text-gray-900">
                {Math.min(endIndex, applications.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-gray-900">
                {applications.length}
              </span>{" "}
              applications
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-0">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(Math.max(currentPage - 1, 1));
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50 text-gray-400"
                          : "text-gray-700 hover:text-gray-900"
                      }
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page, index) =>
                    page === "ellipsis" ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis className="text-gray-400" />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page as number);
                          }}
                          isActive={currentPage === page}
                          className={
                            currentPage === page
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                          }
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(Math.max(currentPage + 1, 1));
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50 text-gray-400"
                          : "text-gray-700 hover:text-gray-900"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationDashboardPage;
