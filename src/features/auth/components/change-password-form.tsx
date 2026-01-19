"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
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
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ---------------- Password strength helper ---------------- */

function getPasswordStrength(password: string) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", value: 25, color: "bg-red-500" };
  if (score === 3) return { label: "Fair", value: 50, color: "bg-yellow-500" };
  if (score === 4) return { label: "Good", value: 75, color: "bg-blue-500" };
  return { label: "Strong", value: 100, color: "bg-green-500" };
}

/* ---------------- Schema ---------------- */

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Must contain at least one number.")
  .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character.");

const formSchema = z
  .object({
    otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

/* ---------------- Component ---------------- */

export function ChangePasswordForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = form.watch("password");
  const strength = getPasswordStrength(passwordValue);
  const isStrongEnough = strength.value >= 75;

  async function handleSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      console.log("Submit payload:", data);
      // await api call
      const { otp, password } = data;

      // api call
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/change-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp, password }),
        },
      );

      // data
      const resData = await res.json();

      if (!res.ok) {
        console.error(resData.error);
      }

      form.reset();
      router.push("/login");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto max-w-md rounded-xl border bg-background/95 shadow-sm">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Create new password
        </CardTitle>
        <CardDescription>
          Enter the 6-digit code and choose a new password
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form
          id="change-password"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          {/* OTP */}
          <Controller
            name="otp"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-center">
                  Verification code
                </FieldLabel>
                <div className="flex justify-center">
                  <InputOTP
                    value={field.value}
                    onChange={field.onChange}
                    maxLength={6}
                    autoFocus
                    onComplete={() => form.trigger("otp")}
                    className="justify-center"
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>

                    <InputOTPSeparator className="opacity-40" />

                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Passwords */}
          <div className="space-y-4 rounded-lg border p-4">
            {/* New password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>New password</FieldLabel>
                  <Input {...field} type="password" />

                  {passwordValue && (
                    <div className="space-y-1">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className={`h-2 rounded-full transition-all ${strength.color}`}
                          style={{ width: `${strength.value}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Strength:{" "}
                        <span className="font-medium text-foreground">
                          {strength.label}
                        </span>
                      </p>
                    </div>
                  )}

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Confirm password */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Confirm new password</FieldLabel>
                  <Input {...field} type="password" />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form="change-password"
          size="lg"
          className="w-full cursor-pointer"
          disabled={isSubmitting || !isStrongEnough}
        >
          Reset password
        </Button>
      </CardFooter>
    </Card>
  );
}
