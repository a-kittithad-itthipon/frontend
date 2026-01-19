import type { Metadata } from "next";

import { Upload } from "@/features/admin/components/upload";

export const metadata: Metadata = {
  title: "Upload - Admin",
};

export default function UploadPage() {
  return (
    <div>
      <h1 className="text-xl md:text-4xl font-bold mb-6">
        Upload & Deploy Project
      </h1>
      <Upload />
    </div>
  );
}
