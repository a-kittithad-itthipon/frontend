"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SiteFilters } from "./site-filters";
import { SiteTable } from "./site-table";

export type System = {
  id: number;
  name: string;
  domain: string;
  type: string;
  owner: string;
  status: "Running" | "Stopped";
};

const SYSTEMS: System[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `system${i + 1}`,
  domain: `sys${i + 1}.local`,
  type: "Web",
  owner: "Administrator",
  status: i % 7 === 0 ? "Stopped" : "Running",
}));

export function Site() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "running" | "stopped">("all");
  const [selected, setSelected] = useState<System | null>(null);

  const filtered = SYSTEMS.filter((sys) => {
    const matchesSearch =
      sys.name.toLowerCase().includes(search.toLowerCase()) ||
      sys.domain.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "all" || sys.status.toLowerCase() === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="flex flex-1 flex-col gap-6 px-4 py-6 md:px-12">
      <SiteFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <div className="border rounded shadow">
        <SiteTable data={filtered} onRowClick={setSelected} />
      </div>
    </main>
  );
}
