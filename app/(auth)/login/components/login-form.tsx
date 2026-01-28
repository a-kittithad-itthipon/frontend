"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Lock, ScanFace } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ApiAlertMsg } from "@/components/api-alert-msg";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleLogin(values: FormSchema) {
    setIsSubmitting(true);
    form.clearErrors("root");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      // if response is not ok display error message to client
      if (!response.ok) {
        return form.setError("root", {
          message: result.message,
        });
      }

      router.replace("/login");
    } catch {
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
          <ScanFace className="h-6 w-6 text-primary" />
        </div>

        <CardTitle className="text-2xl">Sign in to your account</CardTitle>

        <ApiAlertMsg form={form} />
      </CardHeader>

      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(handleLogin)}>
          <FieldGroup>
            {/* USERNAME */}
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* PASSWORD */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col">
                  <Field data-invalid={fieldState.invalid}>
                    {/* Label + Forgot password on same line */}
                    <div className="flex items-center">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                      <Link
                        href="/reset-password/request"
                        className="ml-auto text-sm text-primary underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>

                    <Input
                      {...field}
                      type="password"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                </div>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field className="w-full">
          <Button
            type="submit"
            form="login-form"
            className="w-full cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Log in"}
          </Button>

          <FieldDescription className="text-center">
            Don’t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Create one
            </Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
