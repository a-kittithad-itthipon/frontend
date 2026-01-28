"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  status: string;
  onStatusChange: (v: "all" | "running" | "stopped") => void;
};

export function SiteFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Sites status</h1>
        <p className="text-muted-foreground">
          Monitor and manage deployed systems
        </p>
      </div>

      <div className="flex gap-3">
        <Tabs
          value={status}
          onValueChange={(value) =>
            onStatusChange(value as "all" | "running" | "stopped")
          }
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="running">Running</TabsTrigger>
            <TabsTrigger value="stopped">Stopped</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search name or domain..."
            className="pl-9"
          />
        </div>
      </div>
    </div>
  );
}
