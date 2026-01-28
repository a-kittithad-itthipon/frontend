"use client";

import { useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    form.clearErrors("root");

    try {
      const response = await fetch("/api/auth/reset-password/request", {
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
      router.push("/reset-password/verify");
    } catch (err) {
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
          <Mail className="h-6 w-6 text-primary" />
        </div>

        <CardTitle className="text-2xl">Forgot your password?</CardTitle>

        <CardDescription>
          Enter your username and we’ll send a one-time code to your email.
        </CardDescription>

        <ApiAlertMsg form={form} />
      </CardHeader>

      <CardContent>
        <form id="forgot-password" onSubmit={form.handleSubmit(onSubmit)}>
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

      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          form="forgot-password"
          disabled={isSubmitting}
          className="w-full cursor-pointer"
        >
          {isSubmitting ? <Spinner /> : "Send reset code"}
        </Button>

        <FieldDescription className="flex items-center justify-center text-sm">
          <Link href="/login" className="hover:underline text-muted-foreground">
            Back to sign in
          </Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
}
