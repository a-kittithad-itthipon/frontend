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
import { TriangleAlert } from "lucide-react";
import { ApiAlertMsg } from "@/components/api-alert-msg";

const formSchema = z.object({
  username: z.string().min(1, "Please enter username"),
});

type FormValues = z.infer<typeof formSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function handleForgotUsername(values: FormValues) {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        return form.setError("root", { message: data.error });
      }

      // Clean up form before redirect
      form.reset();
      // Redirect to change password page
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
        <CardTitle>Recover your account</CardTitle>

        <CardDescription className="space-y-6">
          <p>Enter your username and we&apos;ll send an OTP to your email</p>

          <ApiAlertMsg form={form} />
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
                <FieldLabel htmlFor={field.name}>Username</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
      </CardContent>

      <CardFooter>
        <Field>
          <Button
            type="submit"
            form="forgot-password"
            disabled={isSubmitting}
            className="w-full cursor-pointer"
          >
            {isSubmitting ? <Spinner /> : "Send"}
          </Button>

          <FieldDescription className="flex justify-center">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:underline"
            >
              Back to Sign In
            </Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
