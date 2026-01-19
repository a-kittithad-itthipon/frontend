"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AppSidebarItem } from "./app-sidebar-item";
import { AppSidebarGroup } from "./app-sidebar-group";

import { sidebarMenu } from "@/constants/sidebar";
import { DoorOpenIcon, Rocket } from "lucide-react";

export function AppSidebar({ role }: { role: "admin" | "user" }) {
  const pathname = usePathname();

  async function handleLogout() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/logout`, {
      method: "POST",
    });
    if (res.ok) return redirect("/login");
  }

  return (
    <Sidebar className="*:bg-background">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 text-xl font-bold"
              >
                <Rocket />
                <span>Adocs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarMenu[role].map((item) => {
              if (item.type === "item") {
                return (
                  <AppSidebarItem
                    key={item.href}
                    item={item}
                    pathname={pathname}
                  />
                );
              }

              return (
                <AppSidebarGroup
                  key={item.title}
                  group={item}
                  pathname={pathname}
                />
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer"
              onClick={handleLogout}
            >
              <DoorOpenIcon />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
