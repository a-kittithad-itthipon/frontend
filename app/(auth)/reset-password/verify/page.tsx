import type { Metadata } from "next";

import { VerifyForm } from "./components/verify-form";

export const metadata: Metadata = {
  title: "Enter verification code",
};

export default function VerifyPage() {
  return (
    <div className="flex flex-col w-full max-w-sm">
      <VerifyForm />
    </div>
  );
}
