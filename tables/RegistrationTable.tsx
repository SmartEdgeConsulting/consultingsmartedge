"use client";

import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Loader2, MoreVertical, XCircle } from "lucide-react";
import { formatDateTime } from "@/lib/utils/format-date";
import { getStatusBadge } from "@/lib/utils/status-badge";
import { useRegistrationsStore } from "@/store/registrationsStore";

const RegistrationTable = () => {
  const ITEMS_PER_PAGE = 10;

   const {
      registrations,
      currentPage,
      updatingStatus,
      setUpdatingStatus,
      updateRegistrationStatus,
    } = useRegistrationsStore();


    // Pagination
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
  
  return (
    <table className="w-full">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            S/N
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Phone
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
            Date
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
                  {reg.gender === "Female" ? "F" : "M"}
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
                  {formatDateTime(reg.createdAt)}
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
  );
};

export default RegistrationTable;
