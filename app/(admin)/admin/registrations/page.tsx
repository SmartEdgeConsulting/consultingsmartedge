// app/(admin)/admin/registration/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getPusherClient } from "@/lib/pusher-client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, EllipsisVertical, Loader2 } from "lucide-react";
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
          console.log("Fetched registrations:", data.data.length);
        }
      } catch (error) {
        console.error("Error fetching registrations:", error);
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
    } catch (error) {
      console.error("Error exporting registrations:", error);
      alert("Failed to export registrations");
    } finally {
      setExporting(false);
    }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
        toast.success("Status changed successfully!");
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error changing status:", error);
      toast.error("Failed to change status. Please try again.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Registrations</h1>
          <p className="text-muted-foreground">Manage bootcamp registrations</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">{registrations.length} Total</Badge>
          <Button
            onClick={handleExport}
            disabled={exporting || registrations.length === 0}
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

      {registrations.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">
              No registrations yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-8">
            {paginatedRegistrations.map((reg) => (
              <div key={reg.id} className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-15">S/N</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead></TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedRegistrations.map((reg, index) => {
                        const globalIndex = startIndex + index + 1;
                        return (
                          <TableRow key={reg.id}>
                            <TableCell className="font-medium">
                              {globalIndex.toString().padStart(3, "0")}
                            </TableCell>
                            <TableCell className="font-medium">
                              {reg.name}
                            </TableCell>
                            <TableCell>{reg.email}</TableCell>
                            <TableCell>{reg.phoneNo}</TableCell>
                            <TableCell>{reg.gender}</TableCell>
                            <TableCell className="capitalize">
                              <a
                                href={reg.proofOfPayment}
                                aria-label={`${reg.name}'s Proof of Payment`}
                                target="open_blank"
                                rel="noopener noreferrer"
                                className="underline text-[blue]"
                              >
                                View POP
                              </a>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(reg.status)}>
                                {reg.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {new Date(reg.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    disabled={updatingStatus === reg.id}
                                  >
                                    {updatingStatus === reg.id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <EllipsisVertical className="h-4 w-4" />
                                    )}
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>
                                    Change Status
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() =>
                                      changeStatus(reg.id, "accepted")
                                    }
                                    disabled={reg.status === "accepted"}
                                  >
                                    Accept
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      changeStatus(reg.id, "rejected")
                                    }
                                    disabled={reg.status === "rejected"}
                                  >
                                    Reject
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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

          <div className="text-sm text-muted-foreground text-center">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, registrations.length)} of {registrations.length}{" "}
            registrations
          </div>
        </>
      )}
    </div>
  );
}
