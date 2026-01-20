import type { Metadata } from "next";

import { AdminProfile } from "@/features/admin/components/admin-profile";

export const metadata: Metadata = {
  title: "Profile - Admin",
};

export default function ProfilePage() {
  return (
    <div className="h-full flex items-center justify-center">
      <AdminProfile />
    </div>
  );
}
