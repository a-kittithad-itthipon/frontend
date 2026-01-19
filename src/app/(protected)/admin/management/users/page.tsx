import type { Metadata } from "next";
import { UserTable } from "@/features/admin/components/user-table";

export const metadata: Metadata = {
  title: "User Management - Admin",
};

export default function UserManagement() {
  return (
    <div>
      <h1 className="text-xl md:text-4xl font-bold mb-6">User Management</h1>
      <UserTable />
    </div>
  );
}
