import type { Metadata } from "next";

import { ResetPasswordForm } from "./components/reset-password-form";

export const metadata: Metadata = {
  title: "Forgot your password",
};

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <ResetPasswordForm />
    </div>
  );
}
