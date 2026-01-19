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
import { Spinner } from "@/components/ui/spinner";
import { Rocket } from "lucide-react";
import z from "zod";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password length must be 8 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm() {
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleLogin(values: FormSchema) {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data?.message || "Login failed.");
        return;
      }

      // ✅ Let middleware handle role-based redirect
      router.replace("/login");
    } catch {
      setErrorMessage("Authentication service is unavailable.");
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
        <CardDescription>
          {/* API ERROR MESSAGE */}
          {errorMessage && (
            <p className="text-center text-sm text-destructive mt-2">
              {errorMessage}
            </p>
          )}
        </CardDescription>
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
                    onChange={(e) => {
                      field.onChange(e);
                      setErrorMessage(null);
                    }}
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
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => {
                      field.onChange(e);
                      setErrorMessage(null);
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex items-center justify-end mt-2">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Field className="w-full">
          <Button
            type="submit"
            form="login-form"
            className="w-full"
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
