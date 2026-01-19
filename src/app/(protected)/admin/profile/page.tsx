import type { Metadata } from "next";

import { Profile } from "@/features/admin/components/profile";

export const metadata: Metadata = {
  title: "Profile - Admin",
};

export default function ProfilePage() {
  return (
    <div className="h-full flex items-center justify-center">
      <Profile />
    </div>
  );
}
