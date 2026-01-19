import type { Metadata } from "next";

import DNS from "@/features/user/components/dns";

export const metadata: Metadata = {
  title: "Dashboard - User",
};

export default function DnsPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <DNS />
    </div>
  );
}
