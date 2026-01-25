"use client";

import Link from "next/link";
import type { MenuItem } from "@/types/sidebar";
import { cn } from "@/lib/utils";

import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";

type ItemType = Extract<MenuItem, { type: "item" }>;

type AppSidebarItemProps = {
  item: ItemType;
  pathname: string;
};

export function AppSidebarItem({ item, pathname }: AppSidebarItemProps) {
  const active = pathname.startsWith(item.href);
  const { isMobile, toggleSidebar } = useSidebar();

  // If mobile then toggle sidebar
  function handleToggleSidebar() {
    if (isMobile) {
      toggleSidebar();
    }
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(active && "bg-muted")}
        onClick={handleToggleSidebar}
      >
        <Link href={item.href}>
          {item.icon && <item.icon />}
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
