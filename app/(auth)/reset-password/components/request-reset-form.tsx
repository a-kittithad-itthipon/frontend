"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { ApiAlertMsg } from "@/components/api-alert-msg";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function RequestResetForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        form.setError("root", {
          message:
            data?.error?.message ||
            "We couldn’t process your request. Please try again.",
        });
        return;
      }

      form.reset();
      router.push("/reset-password/verify");
    } catch (err) {
      form.setError("root", {
        message:
          err instanceof Error
            ? err.message
            : "Unexpected error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>

        <CardTitle className="text-2xl">Forgot your password?</CardTitle>

        <CardDescription>
          Enter your username and we’ll send a one-time code to your email.
        </CardDescription>

        <ApiAlertMsg form={form} />
      </CardHeader>

      <CardContent>
        <form
          id="forgot-password"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Username</FieldLabel>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    {...field}
                    id={field.name}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    placeholder="your.username"
                    className="pl-9"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          form="forgot-password"
          disabled={isSubmitting}
          className="w-full cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Sending code…
            </>
          ) : (
            "Send reset code"
          )}
        </Button>

        <FieldDescription className="flex items-center justify-center gap-1 text-sm">
          <ArrowLeft className="h-4 w-4" />
          <Link href="/login" className="hover:underline text-muted-foreground">
            Back to sign in
          </Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
}
