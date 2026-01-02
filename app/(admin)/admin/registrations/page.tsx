// app/(admin)/admin/registration/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getPusherClient } from "@/lib/pusher-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  MoreVertical,
  Loader2,
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  CheckCheck,
  UserX,
} from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Registration } from "@/types";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

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

    channel.bind("new-registration", (data: Registration) => {
      console.log("New Registration received:", data);
      setRegistrations((prev) => [data, ...prev]);
      toast.success("New registration received!");
    });

    return () => {
      console.log("Cleaning up Pusher subscription");
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  // Fetch initial registrations
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch("/api/registrations");
        const data = await response.json();

        if (data.success) {
          setRegistrations(data.data);
        }
      } catch (error) {
        console.error("Error fetching registrations:", error);
        toast.error("Failed to load registrations");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  // Export to CSV
  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await fetch("/api/registrations/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `registrations-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Registrations exported successfully");
    } catch (error) {
      console.error("Error exporting registrations:", error);
      toast.error("Failed to export registrations");
    } finally {
      setExporting(false);
    }
  };

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

  // Pagination
  const totalPages = Math.ceil(registrations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRegistrations = registrations.slice(startIndex, endIndex);

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
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-medium">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "accepted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-medium">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            {status}
          </Badge>
        );
    }
  };

  const changeStatus = async (
    id: string,
    newStatus: "pending" | "rejected" | "accepted"
  ) => {
    try {
      setUpdatingStatus(id);
      const res = await fetch(`/api/registrations/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: newStatus,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setRegistrations((prev) =>
          prev.map((reg) =>
            reg.id === id ? { ...reg, status: newStatus } : reg
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
      label: "Total Registrations",
      value: registrations.length,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Pending",
      value: registrations.filter((r) => r.status === "pending").length,
      icon: Clock,
      color: "bg-amber-500",
    },
    {
      label: "Accepted",
      value: registrations.filter((r) => r.status === "accepted").length,
      icon: CheckCheck,
      color: "bg-green-500",
    },
    {
      label: "Rejected",
      value: registrations.filter((r) => r.status === "rejected").length,
      icon: UserX,
      color: "bg-red-500",
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-lg font-semibold text-gray-900">
            Loading registrations...
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-base sm:text-2xl font-bold text-gray-900">
            Bootcamp Registrations
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage and review bootcamp registrations
          </p>
        </div>
        <Button
          onClick={handleExport}
          disabled={exporting || registrations.length === 0}
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
      {registrations.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-2 sm:p-3 rounded-lg`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {registrations.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No registrations yet
            </h3>
            <p className="text-gray-600">
              Registrations will appear here once users sign up for the bootcamp.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      S/N
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        Email
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        Phone
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedRegistrations.map((reg, index) => {
                    const globalIndex = startIndex + index + 1;
                    return (
                      <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {globalIndex.toString().padStart(3, "0")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {reg.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{reg.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{reg.phoneNo}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 capitalize">
                            {reg.gender === "Female" ? "F" : "M"  }
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={reg.proofOfPayment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
                          >
                            View Proof
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(reg.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {formatDate(reg.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={updatingStatus === reg.id}
                                className="h-8 w-8"
                              >
                                {updatingStatus === reg.id ? (
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
                                onClick={() => changeStatus(reg.id, "accepted")}
                                disabled={reg.status === "accepted"}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Accept
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => changeStatus(reg.id, "rejected")}
                                disabled={reg.status === "rejected"}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => changeStatus(reg.id, "pending")}
                                disabled={reg.status === "pending"}
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                Mark as Pending
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
            {paginatedRegistrations.map((reg, index) => {
              const globalIndex = startIndex + index + 1;
              return (
                <div
                  key={reg.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-500">
                          #{globalIndex.toString().padStart(3, "0")}
                        </span>
                        {getStatusBadge(reg.status)}
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {reg.name}
                      </h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={updatingStatus === reg.id}
                          className="h-8 w-8"
                        >
                          {updatingStatus === reg.id ? (
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
                          onClick={() => changeStatus(reg.id, "accepted")}
                          disabled={reg.status === "accepted"}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Accept
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => changeStatus(reg.id, "rejected")}
                          disabled={reg.status === "rejected"}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => changeStatus(reg.id, "pending")}
                          disabled={reg.status === "pending"}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Mark as Pending
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {reg.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {reg.phoneNo}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="capitalize">Gender: {reg.gender}</span>
                      <a
                        href={reg.proofOfPayment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                      >
                        View Proof
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 pt-2 border-t border-gray-100">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDate(reg.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{startIndex + 1}</span>{" "}
                to{" "}
                <span className="font-semibold">
                  {Math.min(endIndex, registrations.length)}
                </span>{" "}
                of <span className="font-semibold">{registrations.length}</span>{" "}
                registrations
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
            </div>
          )}
        </>
      )}
    </div>
  );
}