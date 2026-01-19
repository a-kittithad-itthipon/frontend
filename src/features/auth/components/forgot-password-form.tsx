"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
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
import { Label } from "@/components/ui/label";

import { UserCheck, UserX } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(1, "Please enter username"),
});

export function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const forgotUsername = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsOpen(true);
    setIsSuccess(null);
    setMessage("Loading...");

    try {
      const res = await fetch("/api/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsSuccess(false);
        setMessage(data.error || "Something went wrong");
        return;
      }

      setIsSuccess(true);
      setMessage(data.message);

      setTimeout(() => {
        setIsOpen(false);
        redirect("/change-password");
      }, 1000);
    } catch {
      setIsSuccess(false);
      setMessage("Server Error");
    }
  };

  function handleForgotUsername(data: z.infer<typeof formSchema>) {
    console.log(data);
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
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
              <div className="h-[30%] w-[22%] bg-white rounded-3xl flex flex-col justify-center items-center p-4 gap-4">
                {isSuccess === null && (
                  <>
                    <i className="bx bx-loader-alt bx-spin text-5xl" />
                    <p>{message}</p>
                  </>
                )}

                {isSuccess === true && (
                  <>
                    <UserCheck size={40} className="text-green-600" />
                    <p>{message}</p>
                  </>
                )}

                {isSuccess === false && (
                  <>
                    <UserX size={40} className="text-red-600" />
                    <p>{message}</p>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-800 text-white w-[70%] h-11.25 rounded-full hover:bg-sky-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <Field>
          <Button
            type="submit"
            form="forgot-password"
            className="cursor-pointer"
          >
            Send
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
