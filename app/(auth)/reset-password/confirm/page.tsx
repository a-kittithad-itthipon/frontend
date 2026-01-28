import type { Metadata } from "next";

import { ConfirmForm } from "./components/confirm-form";

export const metadata: Metadata = {
  title: "Set new password",
};

export default function NewPage() {
  return (
    <div className="w-full max-w-md">
      <ConfirmForm />
    </div>
  );
}
