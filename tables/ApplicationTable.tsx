"use client";

import { useApplicationsStore, usePusherInit } from "@/store/applicationsStore";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils/format-date";
import {
  Briefcase,
  Calendar,
  ExternalLink,
  FileText,
  Phone,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

const ApplicationTable = () => {
  const {
    applications,
    currentPage,
    fetchApplications,
  } = useApplicationsStore();

  usePusherInit();
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Pagination calculations
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedApplications = applications.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto hidden sm:block">
        <table className="w-full">
          <thead className="bg-linear-to-r from-gray-50 to-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs text-gray-700 uppercase tracking-wider">
                Applicant
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Applied
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Resume
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedApplications.map((app) => (
              <tr
                key={app.id}
                className="hover:bg-gray-50/80 transition-colors duration-150"
              >
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {app.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {app.experience} year(s) experience
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">
                    {app.email}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-sm text-gray-700 font-medium">
                    {app.phoneNumber}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      {app.career.jobTitle}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {formatDateTime(app.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-blue-200 hover:bg-blue-50 text-blue-700 hover:text-blue-800"
                  >
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <FileText className="h-3.5 w-3.5 mr-1.5" />
                      View
                      <ExternalLink className="h-3 w-3 ml-1.5" />
                    </a>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden divide-y divide-gray-100">
        {paginatedApplications.map((app) => (
          <div
            key={app.id}
            className="p-5 hover:bg-gray-50/50 transition-colors duration-150"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {app.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-0.5">{app.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {app.phoneNumber}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-medium">{app.career.jobTitle}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                Applied {formatDateTime(app.createdAt)}
              </div>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full border-blue-200 hover:bg-blue-50 text-blue-700 hover:text-blue-800"
                >
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    View Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTable;
