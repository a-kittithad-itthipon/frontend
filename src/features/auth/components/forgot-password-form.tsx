"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  username: z.string().min(1, "Please enter username"),
});

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function handleForgotUsername(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "Request failed");
      }

      form.reset();
      router.push("/change-password");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Recover your account
        </CardTitle>
        <CardDescription>
          Please enter your username and we&apos;ll send OTP to your email
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="forgot-password"
          onSubmit={form.handleSubmit(handleForgotUsername)}
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
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                {/* api error */}
                {errorMessage && (
                  <p className="text-sm text-destructive">{errorMessage}</p>
                )}
              </Field>
            )}
          />
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <Field>
          <Button
            type="submit"
            form="forgot-password"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Submit"}
          </Button>

          <Link
            href="/login"
            className="text-center text-sm text-muted-foreground hover:underline"
          >
            Back to Sign In
          </Link>
        </Field>
      </CardFooter>
    </Card>
  );
}
