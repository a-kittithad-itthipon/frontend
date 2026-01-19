import type { Metadata } from "next";

import { Profile } from "@/components/admin/profile";

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
