import StatsCard from "@/cards/StatsCard";
import React, { useEffect, useCallback } from "react";
import { Users, FileText, FileSearch, Clock, RefreshCw } from "lucide-react";
import { Statistics } from "@/types";
import { useResearchsStore } from "@/store/researchsStore";
import { useRegistrationsStore } from "@/store/registrationsStore";
import { useConsultationsStore } from "@/store/consultationsStore";
import { useUsersStore } from "@/store/usersStore";
import { formatDate } from "@/lib/utils/format-date";
import Link from "next/link";
import { Button } from "./ui/button";

const Overview = () => {
  const researchUnread = useResearchsStore(
    (state) => state.unreadResearchCount ?? 0
  );

  const {
    users,
    userCount,
    weeklyChange,
    fetchUsers,
    fetchUserGrowth,
    isLoading: usersLoading,
  } = useUsersStore();

  const { consultations, fetchConsultations } = useConsultationsStore();
  const { registrations, fetchRegistrations } = useRegistrationsStore();
  const { fetchResearchs } = useResearchsStore();

  useEffect(() => {
    fetchUsers();
    fetchUserGrowth();
    fetchRegistrations();
    fetchConsultations?.();
    fetchResearchs?.();
  }, [
    fetchUsers,
    fetchUserGrowth,
    fetchRegistrations,
    fetchConsultations,
    fetchResearchs,
  ]);

  const handleRefresh = useCallback(() => {
    fetchUsers();
    fetchUserGrowth();
  }, [fetchUsers, fetchUserGrowth]);

  const stats: Statistics[] = [
    {
      index: 1,
      label: "Total Users",
      value: Number(userCount || users.length || 0),
      color: "bg-blue-500",
      change: weeklyChange,
      icon: Users,
    },
    {
      index: 2,
      label: "Pending Consultations",
      value: Number(consultations.filter((c) => c.status === "pending").length),
      color: "bg-amber-500",
      icon: Clock,
    },
    {
      index: 3,
      label: "Total Registrations",
      value: Number(registrations.length),
      color: "bg-green-500",
      icon: FileText,
    },
    {
      index: 4,
      label: "Research Requests",
      value: Number(researchUnread || 0),
      color: "bg-purple-500",
      icon: FileSearch,
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome to SmartEdge{" "}
          <span className="inline-block animate-wave">👋</span>
        </h2>
        <Button
          onClick={handleRefresh}
          disabled={usersLoading}
          title="Refresh data"
        >
          <RefreshCw
            className={`w-4 h-4 ${usersLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          return <StatsCard key={stat.index} stat={stat} />;
        })}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
          <Link
            href="/admin/users"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1"
          >
            See all users →
          </Link>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.slice(0, 7).map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    {user.phoneNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-gray-200">
          {users.slice(0, 7).map((user) => (
            <div key={user.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">
                    {" "}
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span className="text-sm text-gray-600">{user.phoneNo}</span>
              </div>
              <p className="text-xs text-gray-500">
                {" "}
                {formatDate(user.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Overview;
