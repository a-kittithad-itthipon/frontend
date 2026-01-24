"use client";

import { useState } from "react";
import { ArrowUpRight, Activity, Inbox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { System } from "./site";

type Props = {
  data: System[];
  onRowClick: (sys: System) => void;
};

export function SiteTable({ data, onRowClick }: Props) {
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const isLoading = false;

  const sorted = [...data].sort((a, b) =>
    sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  );

  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>#</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => setSortAsc(!sortAsc)}
            >
              Name
            </TableHead>
            <TableHead>Domain</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {!isLoading &&
            paginated.map((sys) => (
              <TableRow
                key={sys.id}
                onClick={() => onRowClick(sys)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>{sys.id}</TableCell>
                <TableCell className="font-medium">{sys.name}</TableCell>
                <TableCell className="flex items-center gap-1 text-primary">
                  {sys.domain}
                  <ArrowUpRight className="h-4 w-4" />
                </TableCell>
                <TableCell>{sys.owner}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      sys.status === "Running"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    <Activity className="mr-1 h-3 w-3" />
                    {sys.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}

          {!isLoading && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>
                <div className="flex flex-col items-center py-16 text-muted-foreground">
                  <Inbox className="mb-4 h-10 w-10" />
                  No systems found
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 text-sm">
        <span>
          Page {page} of {Math.ceil(data.length / pageSize)}
        </span>
        <div className="space-x-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={page * pageSize >= data.length}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
