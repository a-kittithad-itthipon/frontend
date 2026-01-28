import type { Metadata } from "next";
import { Site } from "./components/site";

export const metadata: Metadata = {
  title: "Sites",
};

export default function SitePage() {
  return (
    <div>
      <Site />
    </div>
  );
}
