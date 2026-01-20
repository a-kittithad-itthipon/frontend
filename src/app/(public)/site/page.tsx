import type { Metadata } from "next";

import { ActiveSite } from "@/features/public/components/active-site";

export const metadata: Metadata = {
  title: "Site Lists",
};

export default function ActiveSitePage() {
  return (
    <div>
      <ActiveSite />
    </div>
  );
}
