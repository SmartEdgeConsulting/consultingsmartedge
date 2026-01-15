"use client";

import { useState } from "react";
import { Menu, X, BarChart3, FileText, Bell } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import UploadsPage from "./uploads/page";
import InsightsPage from "./insights/page";
import ActionsPage from "./actions/page";


export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<string>("dashboard");
  const { user } = useUser();

  const menuItems = [
    { id: "uploads", icon: FileText, label: "My Uploads" },
    { id: "insights", icon: BarChart3, label: "Recent Insights" },
    { id: "actions", icon: FileText, label: "Actions" },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case "uploads":
        return <UploadsPage />;
      case "insights":
        return <InsightsPage />;
      case "actions":
        return <ActionsPage />;
      default:
        return <UploadsPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-primary text-white">
        <div className="p-5 border-b border-blue-600">
          <Link href="/">
            <h3 className="text-base sm:text-2xl text-white mb-2 font-bold">
              SmartEdge
            </h3>
            <p className="text-sm text-gray-200">Consulting & Analytics</p>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activePage === item.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-200 hover:bg-blue-600/80 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-600">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="text-xl text-white font-bold">SmartEdge</h3>
            <p className="text-xs text-gray-400">Consulting & Analytics</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
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

        {/* Mobile User Section */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 md:px-6">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                Dashboard
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
                <Bell size={20} className="text-gray-600" />
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
