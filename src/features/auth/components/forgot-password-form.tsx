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
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function handleForgotUsername(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          form.setError("root", {
            type: "server",
            message: data.error,
          });

          return;
        }
      }

      form.reset();
      router.push("/change-password");
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
        <CardTitle className="text-xl text-center">
          Recover your account
        </CardTitle>
        <CardDescription>
          {/* API ERROR MESSAGE */}
          {form.formState.errors.root?.message && (
            <p className="text-center text-sm text-destructive mt-2">
              {form.formState.errors.root.message}
            </p>
          )}
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
