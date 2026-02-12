"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rocket, Key, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "text-sky-600 cursor-pointer flex justify-center items-center hover:text-gray-800 transition-all duration-200"
      : "cursor-pointer flex justify-center items-center hover:text-sky-600 transition-all duration-200";

  return (
    <nav className="h-[90px] w-full sticky z-50 top-0 left-0 flex justify-center items-center border-b border-gray-100 bg-white">
      <div className="flex justify-between items-center h-full w-full sm:w-[90%] lg:w-[75%] mt-3 py-3 px-4 sm:px-6 lg:px-0">
        <div className="flex justify-start items-center flex-1 min-w-0">
          <Link
            className="flex justify-start items-center gap-2 flex-shrink-0 cursor-pointer hover:text-sky-600 transition-all duration-200"
            href={"/"}
          >
            <span className="flex-shrink-0">
              <Rocket size={40} className="sm:w-[50px] sm:h-[50px]" />
            </span>
            <span className="text-lg sm:text-2xl font-bold hidden sm:inline">Adocs</span>
          </Link>
        </div>
        <div className="hidden md:flex justify-center items-center gap-6 lg:gap-15 text-base lg:text-lg font-bold flex-2">
          <Link href="/" className={isActive("/")}>
            Home
          </Link>
          <a
            href="https://docs.addp.site"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex justify-center items-center hover:text-sky-600 transition-all duration-200"
          >
            Document
          </a>
          <Link href="/contact" className={isActive("/contact")}>
            About
          </Link>
          <Link href="/system-list" className={isActive("/system-list")}>
            Containers
          </Link>
        </div>
        <div className="flex justify-end items-center gap-2 sm:gap-3 lg:gap-5 flex-1 text-xs sm:text-sm font-medium text-white">
          <Link
            href="/login"
            className="px-3 sm:px-5 lg:px-7 py-2 sm:py-3 lg:py-4 rounded-full flex justify-center items-center gap-1 sm:gap-2 text-black hover:text-sky-800 hover:bg-sky-50 transition-all duration-200 whitespace-nowrap flex-shrink-0"
          >
            <Key size={16} className="sm:w-[20px] sm:h-[20px]" /> <span className="hidden sm:inline">Login</span>
          </Link>
          <Link
            href="/register"
            className="px-3 sm:px-5 lg:px-7 py-2 sm:py-3 lg:py-4 bg-gray-800 rounded-full flex justify-center items-center gap-1 sm:gap-2 text-white hover:bg-sky-50 hover:text-sky-800 transition-all duration-200 whitespace-nowrap flex-shrink-0"
          >
            <User size={16} className="sm:w-[20px] sm:h-[20px]" /> <span className="hidden sm:inline">Register</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
