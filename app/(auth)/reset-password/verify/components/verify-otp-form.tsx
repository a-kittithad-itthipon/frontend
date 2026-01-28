"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { cn } from "@/lib/utils";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ErrorMessage } from "@/components/error-message";
import { RectangleEllipsis } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const FormSchema = z.object({
  otp: z.string().length(6, "OTP is required"),
});

export function VerifyOtpForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  async function handleVerify(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    form.clearErrors("root");

    try {
      const response = await fetch("/api/auth/reset-password/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        form.setError("root", {
          message: result.message,
        });
        return;
      }

      form.reset();
      router.push("/reset-password/new");
    } catch (error) {
      console.error(error);
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
          <RectangleEllipsis className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
        <ErrorMessage form={form} />
      </CardHeader>
      <CardContent>
        <form id="otp" onSubmit={form.handleSubmit(handleVerify)}>
          <FieldGroup>
            <Controller
              name="otp"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="sr-only">
                    Verification code
                  </FieldLabel>

                  <div className="flex items-center justify-center flex-col gap-4">
                    <InputOTP
                      id={field.name}
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      pattern={REGEXP_ONLY_DIGITS}
                      disabled={isSubmitting}
                    >
                      <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                        <InputOTPSlot
                          index={0}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={1}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={2}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={3}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={4}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputOTPSlot
                          index={5}
                          aria-invalid={fieldState.invalid}
                        />
                      </InputOTPGroup>
                    </InputOTP>

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button
            form="otp"
            type="submit"
            className={cn("cursor-pointer")}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Verify"}
          </Button>
          <FieldDescription className="text-center">
            Didn't receive the code?{" "}
            <span className="underline underline-offset-4 cursor-pointer hover:text-primary">
              Resend
            </span>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
