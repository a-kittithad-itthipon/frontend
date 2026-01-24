"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DynamicTooltip } from "@/components/dynamic-tooltip";
import { ApiAlertMsg } from "@/components/api-alert-msg";

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Must contain at least one number.")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character."),
  database: z.boolean(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      database: false,
    },
  });

  async function handleSubmitRegister(values: RegisterFormValues) {
    setIsSubmitting(true);
    form.clearErrors("root");

    // Call API
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        return form.setError("root", {
          message:
            data.error?.message || "Something went wrong. Try again later.",
        });
      }

      form.reset();
      router.push("/login");
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription className="space-y-6">
          <p>Enter your information below to create your account</p>
          <ApiAlertMsg form={form} />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="register-form"
          onSubmit={form.handleSubmit(handleSubmitRegister)}
          className="space-y-6"
        >
          {/* Username */}
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  Username
                </FieldLabel>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Create database */}
          <Controller
            name="database"
            control={form.control}
            render={({ field }) => (
              <Field orientation="horizontal">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                  className="cursor-pointer"
                />
                <div className="flex items-center gap-2">
                  <FieldLabel>Create Database</FieldLabel>
                  <DynamicTooltip
                    className="w-40 text-center"
                    title="Create Database"
                  >
                    สร้าง Account สำหรับใช้เข้าสู่ระบบ Dozzle โดยใช้
                    Username/Password (หากใช้ Log Monitor)
                  </DynamicTooltip>
                </div>
              </Field>
            )}
          />
        </form>
      </CardContent>

      <CardFooter>
        <Field className="w-full">
          <Button
            type="submit"
            form="register-form"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Submit"}
          </Button>

          <FieldDescription className="text-center">
            Already have an account? <Link href="/login">Log in</Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
