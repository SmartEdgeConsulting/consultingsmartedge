import StatsCard from "@/cards/StatsCard";
import React, { useEffect } from "react";
import { Users, FileText, FileSearch, Clock } from "lucide-react";
import { Statistics } from "@/types";
import { useResearchsStore } from "@/store/researchsStore";
import { useRegistrationsStore } from "@/store/registrationsStore";
import { useConsultationsStore } from "@/store/consultationsStore";
import { useUsersStore } from "@/store/usersStore";
import { formatDate } from "@/lib/utils/format-date";

const Overview = () => {
  const researchUnread = useResearchsStore(
    (state) => state.unreadResearchCount ?? 0
  );
  const { users, userCount, fetchUsers } = useUsersStore();
  const { consultations } = useConsultationsStore();
  const { registrations, fetchRegistrations } = useRegistrationsStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const stats: Statistics[] = [
    {
      index: 1,
      label: "Total Users",
      value: Number(userCount || users.length || 0),
      color: "bg-blue-500",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          return <StatsCard key={stat.index} stat={stat} />;
        })}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Users</h3>
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
              {users.map((user) => (
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
          {users.map((user) => (
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
