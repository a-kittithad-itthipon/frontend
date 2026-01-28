import type { Metadata } from "next";

import { RegisterForm } from "./components/register-form";

export const metadata: Metadata = {
  title: "Create your account",
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-lg">
      <RegisterForm />
    </div>
  );
}
