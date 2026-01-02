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
import {
  Download,
  Loader2,
  ExternalLink,
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDateTime } from "@/lib/utils/format-date";
import { useApplicationsStore, usePusherInit } from "@/store/applicationsStore";

const ITEMS_PER_PAGE = 10;

const ApplicationDashboardPage = () => {
  const {
    applications,
    currentPage,
    isLoading,
    exporting,
    fetchApplications,
    setCurrentPage,
    setExporting,
  } = useApplicationsStore();

  usePusherInit();
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Pagination calculations
  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedApplications = applications.slice(startIndex, endIndex);

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

  // Export to CSV
  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await fetch("/api/applications/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `applications-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Applications exported successfully");
    } catch (error) {
      console.error("Error exporting applications:", error);
      toast.error("Failed to export applications");
    } finally {
      setExporting(false);
    }
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
        <div className="flex items-center gap-4">
          <Button
            onClick={handleExport}
            disabled={exporting || applications.length === 0 || isLoading}
            variant="default"
          >
            {exporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </>
            )}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700">
              Loading applications...
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Please wait while we fetch your data
            </p>
          </div>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-linear-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No applications yet
            </h3>
            <p className="text-gray-600 mb-6">
              Job applications will appear here once candidates start applying
              to your positions.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto hidden sm:block">
              <table className="w-full">
                <thead className="bg-linear-to-r from-gray-50 to-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Applicant
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Phone
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Position
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Applied
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Resume
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-gray-50/80 transition-colors duration-150"
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {app.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {app.experience} year(s) experience
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">
                          {app.email}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm text-gray-700 font-medium">
                          {app.phoneNumber}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">
                            {app.career.jobTitle}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {formatDateTime(app.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-blue-200 hover:bg-blue-50 text-blue-700 hover:text-blue-800"
                        >
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1.5" />
                            View
                            <ExternalLink className="h-3 w-3 ml-1.5" />
                          </a>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-gray-100">
              {paginatedApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 hover:bg-gray-50/50 transition-colors duration-150"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base">
                          {app.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {app.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-700">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {app.phoneNumber}
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">{app.career.jobTitle}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      Applied {formatDateTime(app.createdAt)}
                    </div>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="w-full border-blue-200 hover:bg-blue-50 text-blue-700 hover:text-blue-800"
                      >
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          View Resume
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                        setCurrentPage(Math.max(currentPage - 1, 1));
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
