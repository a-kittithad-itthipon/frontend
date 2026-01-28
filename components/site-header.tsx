"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Home,
  Contact,
  List,
  Menu,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

/* -------------------------------------------------------------------------- */
/*                                   Config                                   */
/* -------------------------------------------------------------------------- */

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Contact", href: "/contact", icon: Contact },
  { title: "Sites", href: "/site", icon: List },
];

/* -------------------------------------------------------------------------- */
/*                                   Logo                                     */
/* -------------------------------------------------------------------------- */

function NavLogo({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 font-bold tracking-tight",
        className,
      )}
    >
      <Rocket className="h-5 w-5 text-primary" />
      <span className="text-lg">Adocs</span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Nav Links                                  */
/* -------------------------------------------------------------------------- */

function NavLinks({
  vertical = false,
  onClick,
}: {
  vertical?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex gap-1", vertical && "flex-col items-start")}>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Button
            key={item.title}
            asChild
            variant="ghost"
            className={cn("w-full", isActive && "bg-muted text-foreground")}
          >
            <Link href={item.href} onClick={onClick}>
              {item.title}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Site Header                                 */
/* -------------------------------------------------------------------------- */

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Left */}
        <div className="flex items-center gap-6">
          <NavLogo />

          {/* Desktop nav */}
          <div className="hidden md:flex gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Button
                  asChild
                  key={item.title}
                  variant="ghost"
                  className={cn(isActive && "bg-muted text-foreground")}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-muted-foreground",
                      isActive && "text-primary",
                    )}
                  >
                    {item.title}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <ModeToggle variant="ghost" />

          <Separator orientation="vertical" className="hidden md:block h-4" />

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign up</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Mobile Menu                                 */
/* -------------------------------------------------------------------------- */

function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <NavLogo
              className="justify-center"
              onClick={() => setOpen(false)}
            />
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div className="h-full flex flex-col flex-1 gap-6 p-4">
          <div className="grid gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Button asChild key={item.title} variant="ghost">
                  <Link
                    href={item.href}
                    className={cn("justify-start", isActive && "bg-muted")}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                </Button>
              );
            })}
          </div>

          <div className="mt-auto">
            <div className="flex flex-col gap-1">
              <Button variant="outline" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
