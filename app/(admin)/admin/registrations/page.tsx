// app/(admin)/admin/registration/page.tsx
"use client";

import { useEffect } from "react";
import {
  useRegistrationsStore,
  usePusherInit,
} from "@/store/registrationsStore";
import { Button } from "@/components/ui/button";
import {
  Download,
  MoreVertical,
  Loader2,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  CheckCheck,
  UserX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { formatDateTime } from "@/lib/utils/format-date";
import NoList from "@/components/NoList";
import AdminLoader from "@/components/AdminLoader";
import StatsCard from "@/cards/StatsCard";
import { getStatusBadge } from "@/lib/utils/status-badge";
import RegistrationTable from "@/tables/RegistrationTable";
import PaginationComponent from "@/components/Pagination";

const ITEMS_PER_PAGE = 10;

export default function RegistrationsPage() {
  const {
    registrations,
    currentPage,
    loading,
    exporting,
    updatingStatus,
    fetchRegistrations,
    setCurrentPage,
    exportRegistrations,
    setExporting,
    setUpdatingStatus,
    markRegistrationRead,
    updateRegistrationStatus,
  } = useRegistrationsStore();

  usePusherInit();
  useEffect(() => {
    fetchRegistrations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      markRegistrationRead();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Pagination
  const totalPages = Math.ceil(registrations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRegistrations = registrations.slice(startIndex, endIndex);

  const changeStatus = async (
    id: string,
    newStatus: "pending" | "rejected" | "accepted"
  ) => {
    try {
      setUpdatingStatus(id);
      const res = await fetch(`/api/registrations/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: newStatus }),
      });
      const result = await res.json();

      if (result.success) {
        updateRegistrationStatus(id, newStatus);
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
          onClick={exportRegistrations}
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
      {!loading && registrations.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            return <StatsCard key={index} stat={stat} />;
          })}
        </div>
      )}

      {/* Empty State */}
      {loading ? (
        <AdminLoader title="registrations" />
      ) : registrations.length === 0 ? (
        <NoList
          title="registrations"
          description="Registrations will appear here once users sign up for the
              bootcamp."
        />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <RegistrationTable />
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
                      {formatDateTime(reg.createdAt)}
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
            totalItems={registrations.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
            itemLabel="registrations"
          />
        </>
      )}
    </div>
  );
}
