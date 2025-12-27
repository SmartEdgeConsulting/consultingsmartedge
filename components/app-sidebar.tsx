"use client";

import { BookOpen, FileText, Home, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation"; 

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Overview",
    url: "/admin",
    iconColor: "text-blue-500",
    hoverColor: "hover:bg-blue-50",
    activeColor: "bg-blue-100",
    icon: Home,
  },
  {
    title: "Applications",
    url: "/admin/applications",
    iconColor: "text-purple-500",
    hoverColor: "hover:bg-purple-50",
    activeColor: "bg-purple-100",
    icon: FileText,
  },
  {
    title: "Consultations",
    url: "/admin/consultations",
    iconColor: "text-orange-500",
    hoverColor: "hover:bg-orange-50",
    activeColor: "bg-orange-100",
    icon: MessageSquare,
  },
  {
    title: "Registrations",
    url: "/admin/registrations",
    iconColor: "text-emerald-500",
    hoverColor: "hover:bg-emerald-50",
    activeColor: "bg-emerald-100",
    icon: Users,
  },
  {
    title: "Research",
    url: "/admin/research",
    iconColor: "text-red-500",
    hoverColor: "hover:bg-red-50",
    activeColor: "bg-red-100",
    icon: BookOpen,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar className="mt-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.url;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`
                          flex items-center gap-3 p-3 rounded-lg 
                          transition-all duration-200
                          ${item.hoverColor}
                          ${isActive ? item.activeColor : ''}
                          ${isActive ? 'font-semibold' : 'font-medium'}
                        `}
                      >
                        <item.icon 
                          className={`${item.iconColor} h-5 w-5 ${isActive ? 'scale-110' : ''}`}
                        />
                        <span className="text-base">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;