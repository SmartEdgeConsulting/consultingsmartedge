//admin/page.tsx
"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
} from "lucide-react";
import ApplicationDashboardPage from "./applications/page";
import ConsultationPage from "./consultations/page";
import RegistrationsPage from "./registrations/page";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<string>("dashboard");
  const { user } = useUser();

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "applications", icon: Users, label: "Applications" },
    { id: "consultations", icon: BarChart3, label: "Consultations" },
    { id: "registrations", icon: Settings, label: "Registrations" },
    { id: "research", icon: Settings, label: "Research" },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setSidebarOpen(false);
  };

  // Dashboard Page
  const DashboardPage = () => {
    const tableData = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "Active",
        date: "2024-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        status: "Active",
        date: "2024-01-14",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        status: "Inactive",
        date: "2024-01-13",
      },
      {
        id: 4,
        name: "Alice Williams",
        email: "alice@example.com",
        status: "Active",
        date: "2024-01-12",
      },
      {
        id: 5,
        name: "Charlie Brown",
        email: "charlie@example.com",
        status: "Pending",
        date: "2024-01-11",
      },
    ];

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {["Total Users", "Active", "Revenue", "Growth"].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">{stat}</p>
              <p className="text-2xl font-bold text-gray-800">
                {index === 0
                  ? "2,543"
                  : index === 1
                    ? "1,892"
                    : index === 2
                      ? "$45,231"
                      : "+12.5%"}
              </p>
              <p className="text-xs text-green-600 mt-2">
                ↑ +8.2% from last month
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Users
            </h3>
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {row.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          row.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : row.status === "Inactive"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {row.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-gray-200">
            {tableData.map((row) => (
              <div key={row.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{row.name}</p>
                    <p className="text-sm text-gray-600">{row.email}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      row.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : row.status === "Inactive"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{row.date}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "applications":
        return <ApplicationDashboardPage />;
      case "consultations":
        return <ConsultationPage />;
      case "registrations":
        return <RegistrationsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-primary text-white">
        <div className="p-5">
          <h3 className="text-base sm:text-2xl text-white mb-2 font-bold">
            SmartEdge
          </h3>
          <p className="text-sm">Consulting & Analytics</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activePage === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-2.5 border-b border-gray-800 flex items-center justify-between">
          <div className="p-5">
            <h3 className="text-base sm:text-2xl text-white mb-2 font-bold">
              SmartEdge
            </h3>
          </div>{" "}
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activePage === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 md:px-6">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg">
                <Search size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
