import type { Metadata } from "next";

import { Site } from "@/components/features/site";

export const metadata: Metadata = {
  title: "Site Lists",
};

export default function SitePage() {
  return (
    <div>
      <Site />
    </div>
  );
}
