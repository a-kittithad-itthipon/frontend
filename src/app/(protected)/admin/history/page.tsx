import type { Metadata } from "next";

import { AdminHistory } from "@/components/admin/history";

export const metadata: Metadata = {
  title: "History - Admin",
};

export default function HistoryPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <AdminHistory />
    </div>
  );
}
