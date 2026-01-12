"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  Loader2,
  Mail,
  Calendar,
  Users,
  DollarSign,
  FileText,
  Clock,
  Building,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils/format-date";
import NoList from "@/components/NoList";
import AdminLoader from "@/components/AdminLoader";
import { usePusherInit, useResearchsStore } from "@/store/researchsStore";
import StatsCard from "@/cards/StatsCard";
import PaginationComponent from "@/components/Pagination";

const ITEMS_PER_PAGE = 10;

export default function ResearchPage() {
  const {
    research,
    currentPage,
    isLoading,
    exporting,
    fetchResearchs,
    setCurrentPage,
    exportResearchs,
    markResearchRead,
  } = useResearchsStore();

  usePusherInit();
  useEffect(() => {
    fetchResearchs();
  }, [fetchResearchs]);

  useEffect(() => {
    const timer = setTimeout(() => {
      markResearchRead();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Pagination
  const totalPages = Math.ceil(research.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedResearch = research.slice(startIndex, endIndex);

  // Stats
  const stats = [
    {
      index: 1,
      label: "Total Research",
      value: research.length,
      icon: Users,
      color: "bg-blue-500",
    },
  ];

  // Helper function to format budget display
  const formatBudget = (budget: string | undefined | null) => {
    if (!budget) return "Not specified";
    return budget.split("-").join(" - ").replace("k", "K").replace("plus", "+");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-base sm:text-2xl font-bold text-gray-900">
            Research Requests
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage and review client research requests
          </p>
        </div>
        <Button
          onClick={exportResearchs}
          disabled={exporting || research.length === 0}
          className="w-full sm:w-auto"
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

      {/* Stats Cards */}
      {!isLoading && research.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            return <StatsCard key={stat.index} stat={stat} />;
          })}
        </div>
      )}

      {/* Empty State */}
      {isLoading ? (
        <AdminLoader title="research" />
      ) : research.length === 0 ? (
        <NoList
          title="research"
          description="Client research requests will appear here"
        />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Research Needs
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Timeline
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedResearch.map((item) => {
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {item.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {item.business || "Not provided"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {formatBudget(item.budget)}
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div
                            className="text-sm text-gray-600 truncate"
                            title={item.research}
                          >
                            {item.research}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {item.timeline || "Not specified"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {formatDateTime(item.createdAt)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {paginatedResearch.map((item, index) => {
              const globalIndex = startIndex + index + 1;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-500">
                          #{globalIndex.toString().padStart(3, "0")}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                      <span className="truncate">{item.email}</span>
                    </div>

                    {item.business && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                        {item.business}
                      </div>
                    )}

                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                      <span>Budget: {formatBudget(item.budget)}</span>
                    </div>

                    <div className="flex items-start text-sm text-gray-600 pt-2 border-t border-gray-100">
                      <FileText className="h-4 w-4 mr-2 mt-0.5 text-gray-400 shrink-0" />
                      <p className="line-clamp-2">{item.research}</p>
                    </div>

                    {item.timeline && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                        <span>Deadline: {item.timeline}</span>
                      </div>
                    )}

                    <div className="flex items-center text-sm text-gray-600 pt-2 border-t border-gray-100">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400 shrink-0" />
                      {formatDateTime(item.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={research.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
            itemLabel="research requests"
          />
        </>
      )}
    </div>
  );
}
