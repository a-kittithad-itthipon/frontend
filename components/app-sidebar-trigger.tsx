"use client";

import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
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
