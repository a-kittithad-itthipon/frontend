"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";

const data = [
  {
    id: 1,
    name: "Portainer",
    domain: "portainer.local",
    type: "System",
    status: "Running",
  },
  {
    id: 2,
    name: "Nginx",
    domain: "nginx.local",
    type: "System",
    status: "Running",
  },
  {
    id: 3,
    name: "Technitium",
    domain: "technitium.local",
    type: "System",
    status: "Running",
  },
  {
    id: 4,
    name: "PHPmyadmin",
    domain: "pma.local",
    type: "System",
    status: "Running",
  },
  {
    id: 5,
    name: "Dozzle",
    domain: "dozzle.local",
    type: "System",
    status: "Running",
  },
  {
    id: 6,
    name: "Dashdot",
    domain: "dashdot.local",
    type: "System",
    status: "Running",
  },
  {
    id: 7,
    name: "Dashdot",
    domain: "dashdot.local",
    type: "System",
    status: "Running",
  },
];

export function SystemDashboard() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Container Name</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id} className="hover:bg-gray-50 transition">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <a
                  href={`https://${item.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 hover:text-sky-900"
                >
                  {item.domain}
                </a>
                <ArrowUpRight
                  size={16}
                  className="text-sky-700 group-hover:text-sky-900"
                />
              </div>
            </TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>
              <div className="flex justify-center items-center gap-2">
                <span className="text-green-600 font-medium">
                  {item.status}
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
