"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export function ActiveSite() {
  const [search, setSearch] = useState("");

  const systems = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: "system" + (i + 1),
    domain: "sys" + (i + 1) + ".local",
    type: "Web",
    owner: "Administrator",
    status: "Running",
  }));

  const filteredSystems = systems.filter(
    (sys) =>
      sys.name.toLowerCase().includes(search.toLowerCase()) ||
      sys.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex flex-col items-center w-full min-h-[calc(100vh-90px)] px-4 md:px-12 py-6 gap-6">
      {/* Search */}
      <div className="w-full max-w-5xl flex justify-end">
        <div className="flex items-center border border-border rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-primary transition">
          <input
            type="text"
            placeholder="Search name or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 outline-none w-full text-foreground bg-background placeholder-muted-foreground"
          />
          <span className="px-4 text-foreground">
            <i className="bx bx-search text-2xl"></i>
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="w-full max-w-5xl bg-card rounded-3xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-foreground text-background sticky top-0 z-10">
              <tr className="text-left">
                <th className="px-4 py-3 w-[5%]">No.</th>
                <th className="px-4 py-3 w-[25%]">Container Name</th>
                <th className="px-4 py-3 w-[25%]">Domain</th>
                <th className="px-4 py-3 w-[15%]">Type</th>
                <th className="px-4 py-3 w-[20%]">Owner</th>
                <th className="px-4 py-3 w-[10%]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSystems.map((sys) => (
                <tr
                  key={sys.id}
                  className="border-b border-border hover:bg-muted transition-all"
                >
                  <td className="px-4 py-3">{sys.id}</td>
                  <td className="px-4 py-3 truncate max-w-xs">{sys.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sky-600 hover:text-sky-800">
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        {sys.domain}
                      </a>
                      <ArrowUpRight size={16} />
                    </div>
                  </td>
                  <td className="px-4 py-3">{sys.type}</td>
                  <td className="px-4 py-3">{sys.owner}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center gap-2 text-green-600 font-medium">
                      <i className="bx bxs-circle text-[14px]"></i>
                      <span className="hidden md:inline">{sys.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSystems.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-muted-foreground"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
