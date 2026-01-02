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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
  User,
  Mail,
  FileText,
  Calendar,
  MoreVertical,
  Target,
  Building2,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface Consultation {
  id: string;
  name: string;
  email: string;
  company?: string;
  challenge: string;
  status: "pending" | "attended";
  userId: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 10;

const ConsultationPage = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      toast.success("New consultation received!");
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
        setIsLoading(true);
        const response = await fetch("/api/consultations");
        const data = await response.json();

        if (data.success) {
          setConsultations(data.data);
        }
      } catch (error) {
        console.error("Error fetching consultations:", error);
        toast.error("Failed to load consultations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Pagination calculations
  const totalPages = Math.ceil(consultations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedConsultations = consultations.slice(startIndex, endIndex);

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
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 font-medium"
          >
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "attended":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 font-medium"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Attended
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200"
          >
            {status}
          </Badge>
        );
    }
  };

  // Export to CSV
  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await fetch("/api/consultations/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `consultations-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Consultations exported successfully");
    } catch (error) {
      console.error("Error exporting consultations:", error);
      toast.error("Failed to export consultations");
    } finally {
      setExporting(false);
    }
  };

  const changeStatus = async (
    id: string,
    newStatus: "pending" | "attended"
  ) => {
    try {
      setUpdatingStatus(id);
      const res = await fetch(`/api/consultations/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: newStatus,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setConsultations((prev) =>
          prev.map((con) =>
            con.id === id ? { ...con, status: newStatus } : con
          )
        );
        toast.success("Status updated successfully!");
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error changing status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

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
          onClick={handleExport}
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
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-lg font-semibold text-gray-900">
              Loading consultations...
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Please wait while we fetch your data
            </p>
          </div>
        </div>
      ) : consultations.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-xl border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No consultations yet
            </h3>
            <p className="text-gray-600">
              Consultations will appear here once users submit requests.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hidden md:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      Client
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      Email
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      Company
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      Challenge
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      Date
                    </div>
                  </TableHead>
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
                      {formatDate(con.createdAt)}
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
                            onClick={() => changeStatus(con.id, "attended")}
                            disabled={con.status === "attended"}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark as Attended
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => changeStatus(con.id, "pending")}
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
                        onClick={() => changeStatus(con.id, "attended")}
                        disabled={con.status === "attended"}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Mark as Attended
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => changeStatus(con.id, "pending")}
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
                      {formatDate(con.createdAt)}
                    </div>
                    {getStatusBadge(con.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{startIndex + 1}</span>{" "}
                to{" "}
                <span className="font-semibold">
                  {Math.min(endIndex, consultations.length)}
                </span>{" "}
                of <span className="font-semibold">{consultations.length}</span>{" "}
                consultations
              </div>

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
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
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
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages)
                        );
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
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConsultationPage;
