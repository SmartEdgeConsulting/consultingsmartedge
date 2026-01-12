"use client";

import { useEffect } from "react";
import { useApplicationsStore, usePusherInit } from "@/store/applicationsStore";
import ApplicationTable from "@/tables/ApplicationTable";
import NoList from "@/components/NoList";
import AdminLoader from "@/components/AdminLoader";
import PaginationComponent from "@/components/Pagination";

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
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={applications.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
            itemLabel="applications"
          />
        </>
      )}
    </div>
  );
};

export default ApplicationDashboardPage;
