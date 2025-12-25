"use client";
import { getPusherClient } from "@/lib/pusher-client";
import React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { EllipsisVertical } from "lucide-react";

interface Consultation {
  id: string;
  name: string;
  email: string;
  company?: string;
  challenge: string;
  status: "pending" | "reviewed" | "archived";
  userId: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 10;

const ConsultationPage = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Set up Pusher subscription
  useEffect(() => {
    const pusher = getPusherClient();
    if (!pusher) {
      console.error("Pusher client not initialized");
      return;
    }

    const channel = pusher.subscribe("admin-dashboard");

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("Successfully subscribed to admin-dashboard");
    });

    channel.bind("new-consultation", (data: Consultation) => {
      console.log("New Consultation received:", data);
      setConsultations((prev) => [data, ...prev]);
    });

    return () => {
      console.log("Cleaning up Pusher subscription");
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  // Fetch initial consultations
  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await fetch("/api/consultations");
        const data = await response.json();

        if (data.success) {
          setConsultations(data.data);
          console.log("Fetched consultations:", data.data.length);
        }
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };

    fetchConsultations();
  }, []);

  // Group consultations by date
  const groupByDate = (consultations: Consultation[]) => {
    const groups: { [key: string]: Consultation[] } = {};

    consultations.forEach((consultation) => {
      const date = new Date(consultation.createdAt);
      const dateKey = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(consultation);
    });

    return groups;
  };

  const groupedConsultations = groupByDate(consultations);
  const dateKeys = Object.keys(groupedConsultations).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  // Pagination calculations
  const totalPages = Math.ceil(consultations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedConsultations = consultations.slice(startIndex, endIndex);
  const paginatedGrouped = groupByDate(paginatedConsultations);
  const paginatedDateKeys = Object.keys(paginatedGrouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
            Pending
          </Badge>
        );
      case "reviewed":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
            Reviewed
          </Badge>
        );
      case "archived":
        return (
          <Badge className="bg-slate-500 hover:bg-slate-600 text-white">
            Archived
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600 text-white">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Consultations</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and review consultation requests
          </p>
        </div>
        <div className="bg-slate-100 text-primary px-4 py-2 rounded-lg text-sm font-semibold border border-slate-200">
          {consultations.length} Total
        </div>
      </div>

      {consultations.length === 0 ? (
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-12 text-center bg-slate-50">
          <div className="text-slate-400 mb-2">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-slate-600 font-medium">No consultations yet</p>
          <p className="text-slate-400 text-sm mt-1">
            New consultation requests will appear here
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-8">
            {paginatedDateKeys.map((dateKey) => (
              <div key={dateKey} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-primary/10"></div>
                  <h2 className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {dateKey}
                  </h2>
                  <div className="h-px flex-1 bg-primary/10"></div>
                </div>

                <div className="border border-slate-200 rounded-lg sm:overflow-hidden bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/5 hover:bg-primary/10">
                        <TableHead className="w-15 font-semibold">
                          S/N
                        </TableHead>
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                        <TableHead className="font-semibold">Company</TableHead>
                        <TableHead className="font-semibold">
                          Challenge
                        </TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        {/**<TableHead className="font-semibold">Time</TableHead>*/}
                        <TableHead className="w-15"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedGrouped[dateKey].map((con, index) => {
                        const globalIndex =
                          startIndex +
                          paginatedConsultations.findIndex(
                            (c) => c.id === con.id
                          ) +
                          1;
                        return (
                          <TableRow
                            key={con.id}
                            className="hover:bg-primary/10 transition-colors"
                          >
                            <TableCell className="font-semibold text-slate-600">
                              {globalIndex.toString().padStart(3, "0")}
                            </TableCell>
                            <TableCell className="font-semibold text-slate-900 capitalize">
                              {con.name}
                            </TableCell>
                            <TableCell className="text-sm text-slate-600">
                              {con.email}
                            </TableCell>
                            <TableCell className="font-medium text-primary">
                              {con.company || (
                                <span className="text-slate-400 italic">
                                  N/A
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="max-w-xs truncate text-slate-600">
                              {con.challenge}
                            </TableCell>
                            <TableCell>{getStatusBadge(con.status)}</TableCell>
                            {/**<TableCell className="text-xs text-slate-500 font-medium">
                              {new Date(con.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </TableCell>*/}
                            <TableCell>
                              <EllipsisVertical />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {getPageNumbers().map((page, index) =>
                  page === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
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
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

          <div className="text-sm text-slate-600 text-center bg-slate-50 py-2 rounded-lg">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, consultations.length)} of {consultations.length}{" "}
            consultations
          </div>
        </>
      )}
    </div>
  );
};

export default ConsultationPage;
