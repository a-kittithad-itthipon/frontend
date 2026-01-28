"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  useSidebar,
} from "./ui/sidebar";
import { SidebarGroup } from "@/types/sidebar";

type AppSidebarGroupProps = {
  group: SidebarGroup;
  pathname: string;
};

export function AppSidebarGroup({ group, pathname }: AppSidebarGroupProps) {
  const isOpen = group.children.some((child) =>
    pathname.startsWith(child.href),
  );
  const childPathname = usePathname();
  const { isMobile, toggleSidebar } = useSidebar();

  // If mobile then toggle sidebar
  function handleToggleSidebar() {
    if (isMobile) {
      toggleSidebar();
    }
  }

  return (
    <Collapsible defaultOpen={isOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="cursor-pointer">
            {group.icon && <group.icon />}
            <span>{group.title}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {group.children.map((child) => (
              <SidebarMenuItem key={child.href}>
                <SidebarMenuButton
                  asChild
                  isActive={childPathname === child.href}
                  onClick={handleToggleSidebar}
                >
                  <Link href={child.href}>{child.label}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
