"use client";

import Link from "next/link";
import {
  Users,
  ArrowUpToLine,
  SquareActivity,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function QuickStatus({
  userTotal,
  reqTotal,
  uploadTotal,
}: {
  userTotal: number;
  reqTotal: number;
  uploadTotal: number;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
      {/* Users Card */}
      <Card className="transition hover:bg-gray-800 hover:text-white shadow-md">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex items-center gap-2 text-md font-semibold justify-center">
              <Users />
              <p>
                Users <span className="text-sm">(Req: {reqTotal})</span>
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Link href="/admin/user-management">
            <div className="text-2xl font-bold text-center">{userTotal}</div>
          </Link>
        </CardContent>
      </Card>

      {/* Uploads Card */}
      <Card className="transition hover:bg-gray-800 hover:text-white shadow-md">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex items-center gap-2 text-md font-semibold justify-center">
              <ArrowUpToLine />
              <p>Uploads Total</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Link href="/admin/upload">
            <div className="text-2xl font-bold text-center">{uploadTotal}</div>
          </Link>
        </CardContent>
      </Card>

      {/* System Monitor Card */}
      <Card className="transition hover:bg-gray-800 hover:text-white shadow-md">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex items-center gap-2 text-md font-semibold justify-center">
              <SquareActivity />
              <p>System</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Link href="https://dashdot.local" target="_blank">
            <div className="flex items-center justify-center gap-1 text-lg">
              <p>Monitor</p>
              <ArrowUpRight />
            </div>
          </Link>
        </CardContent>
      </Card>

      {/* Documents Card */}
      <Card className="transition hover:bg-gray-800 hover:text-white shadow-md">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex items-center gap-2 text-md font-semibold justify-center">
              <FileText />
              <p>Documents</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Link href="https://fileadmin.local" target="_blank">
            <div className="flex items-center justify-center gap-1 text-lg">
              <p>Docs Edit</p>
              <ArrowUpRight />
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
