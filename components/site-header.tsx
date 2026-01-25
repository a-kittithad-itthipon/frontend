"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Home,
  Contact,
  List,
  Menu,
  Rocket,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   Config                                   */
/* -------------------------------------------------------------------------- */

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Contact", href: "/contact", icon: Contact },
  { title: "Site Lists", href: "/site", icon: List },
];

/* -------------------------------------------------------------------------- */
/*                                   Logo                                     */
/* -------------------------------------------------------------------------- */

function NavLogo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-2 font-black"
    >
      <Rocket className="h-5 w-5" />
      <span className={cn("text-xl truncate", className)}>Adocs</span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Shared Nav Items                              */
/* -------------------------------------------------------------------------- */

function NavLinks({
  onClick,
  vertical = false,
  withActive = false,
}: {
  onClick?: () => void;
  vertical?: boolean;
  withActive?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className={cn("flex gap-1", vertical && "flex-col")}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Button
            key={item.href}
            variant="ghost"
            asChild
            onClick={onClick}
            className={cn(
              "justify-start gap-2",
              withActive && isActive && "bg-accent text-accent-foreground",
            )}
          >
            <Link href={item.href}>
              {vertical && <item.icon className="h-4 w-4" />}
              <span>{item.title}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Mobile Nav                                 */
/* -------------------------------------------------------------------------- */

function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex md:hidden items-center justify-between z-50 h-14 top-0 sticky border-b bg-background px-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open menu">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="flex flex-col">
          {/* Header */}
          <SheetHeader>
            <SheetTitle />
            <div className="flex items-center justify-center">
              <NavLogo
                className="text-2xl"
                onClick={() => setOpen(false)} // ✅ close on logo click
              />
            </div>
            <SheetDescription />
          </SheetHeader>

          {/* Menu */}
          <nav className="px-4">
            <NavLinks vertical withActive onClick={() => setOpen(false)} />
          </nav>
        </SheetContent>
      </Sheet>

      <Rocket />

      <Button variant="outline" className="cursor-pointer" asChild>
        <Link href="/login">Sign in</Link>
      </Button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Desktop Nav                                 */
/* -------------------------------------------------------------------------- */

function DesktopNav() {
  return (
    <div className="hidden md:flex items-center justify-between px-8 z-50 h-14 top-0 border-b bg-background sticky">
      <div className="flex items-center gap-6">
        <NavLogo />
        <NavLinks />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href="/login">Sign in</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Site Header                                 */
/* -------------------------------------------------------------------------- */

export function SiteHeader() {
  return (
    <>
      <MobileNav />
      <DesktopNav />
    </>
  );
}
