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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DynamicTooltip } from "@/components/dynamic-tooltip";
import { ErrorMessage } from "@/components/error-message";
import { UserPlus } from "lucide-react";

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
  cPassword: z
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
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      cPassword: "",
      database: false,
    },
  });

  async function handleSubmitRegister(values: RegisterFormValues) {
    setIsSubmitting(true);
    form.clearErrors("root");

    if (values.password !== values.cPassword) {
      return form.setError("root", { message: "Passwords do not match" });
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok) {
        return form.setError("root", {
          message: result.message,
        });
      }

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
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <UserPlus className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>

        <ErrorMessage form={form} />
      </CardHeader>

      <CardContent>
        <form
          id="register-form"
          onSubmit={form.handleSubmit(handleSubmitRegister)}
        >
          <FieldGroup>
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
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <div className="grid md:grid-cols-2 gap-4">
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
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="cPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      aria-invalid={fieldState.invalid}
                    >
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

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
                      className="w-64 text-center"
                      title="Create Database"
                    >
                      สร้างบัญชีเพื่อใช้จัดการฐานข้อมูล โดยใช้ phpMyAdmin
                      (หากมีการใช้งานฐานข้อมูล)
                    </DynamicTooltip>
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
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
            {isSubmitting ? <Spinner /> : "Create Account"}
          </Button>

          <FieldDescription className="text-center">
            Already have an account? <Link href="/login">Log in</Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
