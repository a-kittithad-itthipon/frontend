"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import { Menu } from "lucide-react";

export function AppSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      className="cursor-pointer"
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
    >
      <Menu />
    </Button>
  );
}
