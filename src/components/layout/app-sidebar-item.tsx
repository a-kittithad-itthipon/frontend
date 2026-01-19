"use client";

import Link from "next/link";
import type { MenuItem } from "@/types/sidebar";

import { cn } from "@/lib/utils";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

type ItemType = Extract<MenuItem, { type: "item" }>;

type AppSidebarItemProps = {
  item: ItemType;
  pathname: string;
};

export function AppSidebarItem({ item, pathname }: AppSidebarItemProps) {
  const active = pathname.startsWith(item.href);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className={cn(active && "bg-muted")}>
        <Link href={item.href}>
          {item.icon && <item.icon />}
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
