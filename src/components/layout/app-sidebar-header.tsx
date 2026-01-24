"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { AppSidebarTrigger } from "@/components/app-sidebar-trigger";
import { AvatarDropdown } from "@/components/avatar-dropdown";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

const IGNORED_SEGMENTS = ["admin", "user"];

const formatLabel = (segment: string) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export function AppSidebarHeader() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbSegments = segments.filter(
    (seg) => !IGNORED_SEGMENTS.includes(seg),
  );

  return (
    <header className="flex sticky top-0 z-30 h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <div className="flex items-center h-5 gap-2">
        <AppSidebarTrigger />
        <Separator orientation="vertical" />

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbSegments.map((segment, index) => {
              const isLast = index === breadcrumbSegments.length - 1;

              return (
                <React.Fragment key={segment}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{formatLabel(segment)}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbPage className="text-muted-foreground">
                        {formatLabel(segment)}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>

                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <ModeToggle className="rounded-full" variant="ghost" />
        <AvatarDropdown />
      </div>
    </header>
  );
}
