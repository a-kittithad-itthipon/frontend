"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Rocket, Key, User, Menu, X } from "lucide-react";

const HEADER_LINKS = [
  { title: "Home", href: "/" },
  { title: "Contact", href: "/contact" },
  { title: "Active Site", href: "/active-site" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold hover:text-sky-600 transition"
        >
          <Rocket size={36} />
          <span className="text-2xl">Adocs</span>
        </Link>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Button variant="ghost" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8 text-lg font-semibold">
            {HEADER_LINKS.map(({ title, href }) => (
              <Link
                key={title}
                href={href}
                className={cn(
                  "transition-colors hover:text-sky-600",
                  isActive(href) && "text-sky-600"
                )}
              >
                {title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full px-6 py-3 hover:bg-sky-50 hover:text-sky-800 transition"
            >
              <Key className="h-5 w-5" />
              Sign In
            </Link>

            <Link
              href="/register"
              className="flex items-center gap-2 rounded-full bg-gray-800 px-6 py-3 text-white hover:bg-sky-50 hover:text-sky-800 transition"
            >
              <User className="h-5 w-5" />
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t bg-background px-4 py-6 space-y-6">
          <nav className="flex flex-col gap-4 text-lg font-semibold">
            {HEADER_LINKS.map(({ title, href }) => (
              <Link
                key={title}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "hover:text-sky-600 transition",
                  isActive(href) && "text-sky-600"
                )}
              >
                {title}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pt-4 border-t">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full px-6 py-3 hover:bg-sky-50 hover:text-sky-800 transition"
            >
              <Key className="h-5 w-5" />
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-gray-800 px-6 py-3 text-white hover:bg-sky-50 hover:text-sky-800 transition"
            >
              <User className="h-5 w-5" />
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
