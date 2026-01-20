"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";

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
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                         Password strength helper                            */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

const passwordSchema = z
  .string()
  .min(8, "At least 8 characters")
  .regex(/[A-Z]/, "One uppercase letter")
  .regex(/[a-z]/, "One lowercase letter")
  .regex(/[0-9]/, "One number")
  .regex(/[^a-zA-Z0-9]/, "One special character");

const formSchema = z
  .object({
    otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
    password: passwordSchema.optional(),
    confirmPassword: passwordSchema.optional(),
  })
  .refine(
    (data) =>
      !data.password ||
      !data.confirmPassword ||
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

type FormValues = z.infer<typeof formSchema>;

/* -------------------------------------------------------------------------- */
/*                                Component                                   */
/* -------------------------------------------------------------------------- */

export function ChangePasswordForm() {
  const router = useRouter();

  const [step, setStep] = React.useState<"otp" | "password">("otp");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password") ?? "";
  const strength = getPasswordStrength(password);
  const isStrongEnough = strength.value >= 75;

  /* ---------------- Step 1: Verify OTP (mock) ---------------- */

  async function handleVerifyOtp() {
    const valid = await form.trigger("otp");
    if (!valid) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    await new Promise((r) => setTimeout(r, 800));

    if (form.getValues("otp") !== "123456") {
      setErrorMessage("Invalid verification code");
      setIsSubmitting(false);
      return;
    }

    setStep("password");
    setIsSubmitting(false);
  }

  /* ---------------- Step 2: Submit new password (mock) ---------------- */

  async function handleSubmit() {
    setIsSubmitting(true);
    setErrorMessage(null);

    await new Promise((r) => setTimeout(r, 1000));
    router.push("/login");
  }

  /* -------------------------------------------------------------------------- */

  const rules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Lowercase letter", valid: /[a-z]/.test(password) },
    { label: "Number", valid: /[0-9]/.test(password) },
    { label: "Special character", valid: /[^a-zA-Z0-9]/.test(password) },
  ];

  return (
    <Card className="mx-auto max-w-md rounded-xl border bg-background shadow-sm">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl">
          {step === "otp" ? "Verify code" : "Create new password"}
        </CardTitle>
        <CardDescription>
          {step === "otp"
            ? "Enter the verification code we sent to your email address"
            : "Choose a strong new password"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="change-password" onSubmit={form.handleSubmit(handleSubmit)}>
          {/* OTP STEP */}
          {step === "otp" && (
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
                      {...field}
                      maxLength={6}
                      autoFocus
                      pattern={REGEXP_ONLY_DIGITS}
                      disabled={isSubmitting}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}

          {/* PASSWORD STEP */}
          {step === "password" && (
            <div className="space-y-4">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>New password</FieldLabel>
                    <Input type="password" {...field} />

                    {password && (
                      <div className="space-y-1">
                        <div className="h-2 bg-muted rounded-full">
                          <div
                            className={cn(
                              "h-2 rounded-full transition-all",
                              strength.color,
                            )}
                            style={{ width: `${strength.value}%` }}
                          />
                        </div>
                        <p className="text-xs">
                          Strength: <b>{strength.label}</b>
                        </p>
                      </div>
                    )}

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Confirm password</FieldLabel>
                    <Input type="password" {...field} />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password requirements */}
              <div className="rounded-md border p-3 space-y-1">
                {rules.map((rule) => (
                  <p
                    key={rule.label}
                    className={cn(
                      "text-sm",
                      rule.valid ? "text-green-600" : "text-muted-foreground",
                    )}
                  >
                    • {rule.label}
                  </p>
                ))}
              </div>
            </div>
          )}

          {errorMessage && (
            <p className="mt-4 text-center text-sm text-destructive">
              {errorMessage}
            </p>
          )}
        </form>
      </CardContent>

      <CardFooter>
        {step === "otp" ? (
          <Button
            className="w-full"
            onClick={handleVerifyOtp}
            disabled={isSubmitting}
          >
            Verify
          </Button>
        ) : (
          <Button
            type="submit"
            form="change-password"
            className="w-full"
            disabled={isSubmitting || !isStrongEnough}
          >
            Reset password
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
