"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ApiAlertMsg } from "@/components/api-alert-msg";

const FormSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Must contain at least one number.")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character."),
  cPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Must contain at least one number.")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character."),
});

export function NewPasswordForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      cPassword: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    form.clearErrors("root");

    // check password and confirm password
    if (values.password !== values.cPassword) {
      return form.setError("root", { message: "Passwords do not match" });
    }

    try {
      const response = await fetch("/api/auth/reset-password/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        form.setError("root", {
          message: result.message,
        });
        return;
      }

      // if success
      form.reset();
      router.push("/login");
    } catch (e) {
      console.error(e);

      form.setError("root", {
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create new password</CardTitle>
        <CardDescription></CardDescription>
        <ApiAlertMsg form={form} />
      </CardHeader>
    </Card>
  );
}
