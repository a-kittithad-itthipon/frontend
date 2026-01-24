"use client";

import { useRouter, usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User2Icon } from "lucide-react";

export function AvatarDropdown() {
  const router = useRouter();
  const pathname = usePathname();

  function handleProfileLink() {
    if (pathname.startsWith("/admin")) {
      return router.push("/admin/profile");
    } else if (pathname.startsWith("/user")) {
      return router.push("/user/profile");
    }
  }

  async function handleLogout() {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Tyep": "application/json" },
    });

    // Cancel operation if failed
    if (!res.ok) return;

    // After finish then redirect to login page
    router.push("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full cursor-pointer"
          variant="ghost"
          size="icon"
        >
          <User2Icon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-xs">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={handleProfileLink}>
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
