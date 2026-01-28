"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";
import { LucideIcon } from "lucide-react";

export type SidebarItem = {
  type: "item";
  label: string;
  href: string;
  icon?: LucideIcon;
};

type AppSidebarItemProps = {
  item: SidebarItem;
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
