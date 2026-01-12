"use client";

import React from "react";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  useConsultationsStore,
  usePusherInit,
} from "@/store/consultationsStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  Loader2,
  FileText,
  Calendar,
  MoreVertical,
  Target,
  Building2,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils/format-date";
import NoList from "@/components/NoList";
import AdminLoader from "@/components/AdminLoader";
import { getStatusBadge } from "@/lib/utils/status-badge";
import StatsCard from "@/cards/StatsCard";
import PaginationComponent from "@/components/Pagination";

const ITEMS_PER_PAGE = 10;

const ConsultationPage = () => {
  const {
    consultations,
    currentPage,
    isLoading,
    exporting,
    updatingStatus,
    fetchConsultations,
    exportConsultations,
    updateConsultationStatus,
    setCurrentPage,
    markConsultationRead,
  } = useConsultationsStore();

  usePusherInit();
  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  useEffect(() => {
    const timer = setTimeout(() => {
      markConsultationRead();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(consultations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedConsultations = consultations.slice(startIndex, endIndex);

  // Stats
  const stats = [
    {
      label: "Total Consultations",
      value: consultations.length,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Pending",
      value: consultations.filter((c) => c.status === "pending").length,
      icon: Clock,
      color: "bg-amber-500",
    },
    {
      label: "Attended",
      value: consultations.filter((c) => c.status === "attended").length,
      icon: CheckCircle2,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-base sm:text-2xl font-bold text-gray-900">
            Consultations
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage and review consultation requests
          </p>
        </div>
        <Button
          onClick={exportConsultations}
          disabled={exporting || consultations.length === 0}
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
      {!isLoading && consultations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            return <StatsCard key={index} stat={stat} />;
          })}
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <AdminLoader title="consultations" />
      ) : consultations.length === 0 ? (
        <NoList
          title="consultations"
          description="Consultations will appear here once users submit requests."
        />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hidden md:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold">Client</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Company</TableHead>
                  <TableHead className="font-semibold">Challenge</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedConsultations.map((con) => (
                  <TableRow key={con.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{con.name}</TableCell>
                    <TableCell className="text-gray-600">{con.email}</TableCell>
                    <TableCell className="text-gray-600">
                      {con.company || "N/A"}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-gray-600">
                      {con.challenge}
                    </TableCell>
                    <TableCell>{getStatusBadge(con.status)}</TableCell>
                    <TableCell className="text-gray-600 text-sm">
                      {formatDateTime(con.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={updatingStatus === con.id}
                            className="h-8 w-8"
                          >
                            {updatingStatus === con.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <MoreVertical className="h-4 w-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              updateConsultationStatus(con.id, "attended")
                            }
                            disabled={con.status === "attended"}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark as Attended
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateConsultationStatus(con.id, "pending")
                            }
                            disabled={con.status === "pending"}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            Mark as Pending
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {paginatedConsultations.map((con) => (
              <div
                key={con.id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {con.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5">{con.email}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={updatingStatus === con.id}
                        className="h-8 w-8"
                      >
                        {updatingStatus === con.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreVertical className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          updateConsultationStatus(con.id, "attended")
                        }
                        disabled={con.status === "attended"}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Mark as Attended
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          updateConsultationStatus(con.id, "pending")
                        }
                        disabled={con.status === "pending"}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Mark as Pending
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                    {con.company || "No company"}
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <Target className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                    <span className="flex-1">{con.challenge}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDateTime(con.createdAt)}
                    </div>
                    {getStatusBadge(con.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={consultations.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
            itemLabel="consultations"
          />
        </>
      )}
    </div>
  );
};

export default ConsultationPage;
