"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SYSTEM_STATS } from "@/constants/dashboard";
import { ExternalLink } from "lucide-react";

export function SystemStatus() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {SYSTEM_STATS.map((item) => {
        const Icon = item.icon;

        // ───────────────── System Health Card ─────────────────
        if (item.title === "System Health") {
          return (
            <Card key={item.title}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </span>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
              </CardHeader>

              <CardContent className="flex items-center justify-center">
                {/* External link */}
                <Link
                  href={item.href || ""}
                  target="_blank"
                  className="flex items-center gap-2 hover:underline"
                >
                  View
                  <ExternalLink className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
                </Link>
              </CardContent>
            </Card>
          );
        }

        // ───────────────── Combined Running / Not Running ─────────────────
        if (item.title === "Containers") {
          const total = item.running + item.stopped;
          const healthPercent = Math.round((item.running / total) * 100);

          return (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="flex flex-row items-center justify-between pb-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </p>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    <span className="font-semibold text-green-600">
                      {item.running}
                    </span>{" "}
                    running
                  </span>
                  <span className="text-sm">
                    <span className="font-semibold text-red-600">
                      {item.stopped}
                    </span>{" "}
                    stopped
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded bg-muted overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${healthPercent}%` }}
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  {healthPercent}% operational
                </p>
              </CardContent>
            </Card>
          );
        }

        // ───────────────── Default Stat Cards ─────────────────
        return (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="flex flex-row items-center justify-between pb-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </p>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
