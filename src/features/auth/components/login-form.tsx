"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

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
import { LoginSchema, loginSchema } from "@/lib/validators/login.schema";
import { Spinner } from "@/components/ui/spinner";
import { Rocket, TriangleAlert } from "lucide-react";

export function LoginForm() {
  const router = useRouter();

  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleLogin(values: LoginSchema) {
    const { username, password } = values;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Safely parse JSON
      const data = await res.json();

      if (!res.ok) return;

      // Redirect based on role
      router.push(
        data.role === "admin" ? "/admin/dashboard" : "/user/dashboard",
      );
    } catch (error) {
      setErrorMessage(
        "We’re having trouble signing you in. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Rocket />
          <span>Adocs</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {errorMessage && (
          <div className="flex gap-2 items-center border rounded-md border-destructive py-2 px-3">
            <TriangleAlert className="text-destructive" />
            <span className="text-sm text-destructive">{errorMessage}</span>
          </div>
        )}

        <form id="login-form" onSubmit={loginForm.handleSubmit(handleLogin)}>
          <FieldGroup>
            <Controller
              name="username"
              control={loginForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor={field.name}
                  >
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      field.onChange(e);
                      setErrorMessage(null); // clear error on change
                    }}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={loginForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <Input
                    {...field}
                    type="password"
                    disabled={isSubmitting}
                    onChange={(e) => {
                      field.onChange(e);
                      setErrorMessage(null);
                    }}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
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
            Don&apos;t have an account?{" "}
            <Link href="/register">Create an account</Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
