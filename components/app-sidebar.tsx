import { BookOpen, FileText, Home, MessageSquare, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Overview",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Applications",
    url: "/admin/applications",
    icon: FileText, 
  },
  {
    title: "Consultations",
    url: "/admin/consultations",
    icon: MessageSquare,
  },
  {
    title: "Registrations",
    url: "/admin/registrations",
    icon: Users, 
  },
  {
    title: "Research",
    url: "/admin/research",
    icon: BookOpen, 
  },
];

const AppSidebar = () => {
  return (
    <Sidebar className="mt-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-5 p-2 text-lg"
                    >
                      <item.icon className="h-7 w-7" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
