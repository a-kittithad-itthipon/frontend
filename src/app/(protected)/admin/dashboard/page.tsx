import { cookies } from "next/headers";

import { SystemDashboard } from "@/features/admin/components/system-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuickStatus } from "@/features/admin/components/quickstatus";
import { MonitorCog } from "lucide-react";

const defaultValues = {
  username: "Loading...",
  userTotal: 0,
  uploadTotal: 0,
  reqTotal: 0,
};

async function getData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) return defaultValues;

  try {
    const res = await fetch(`${process.env.NEXTAPI_URL}/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return defaultValues;
    return await res.json();
  } catch {
    return defaultValues;
  }
}

export default async function DashboardPage() {
  const data = await getData();
  const userTotal = data.user_total;
  const uploadTotal = data.upload_total;
  const reqTotal = data.req_total;

  return (
    <div className="flex flex-col justify-start items-center gap-6 w-full">
      {/* Quick stats */}
      <QuickStatus
        userTotal={userTotal}
        reqTotal={reqTotal}
        uploadTotal={uploadTotal}
      />

      {/* System status table */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-2">
            <MonitorCog size={30} />
            <p className="text-xl font-semibold">System Status</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SystemDashboard />
        </CardContent>
      </Card>
    </div>
  );
}
