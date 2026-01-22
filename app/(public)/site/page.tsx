import type { Metadata } from "next";

import { Site } from "./_components/site";

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
