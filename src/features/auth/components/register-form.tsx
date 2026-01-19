"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
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
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { UserCheck, UserX, Loader2, CircleQuestionMark } from "lucide-react";

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
  database: z.boolean().optional(),
});

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createDb, setCreateDb] = useState(false);
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      database: false,
    },
  });

  // --- Input Validations (UNCHANGED) ---
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";

    if (value.includes(" ")) {
      setAlert(false);
      setModalOpen(true);
      setMsg("Username: Spaces are not allowed");
      return;
    }
    if (value !== value.toLowerCase()) {
      setAlert(false);
      setModalOpen(true);
      setMsg("Username: Uppercase letters are not allowed");
      return;
    }
    if (value.length > 25) {
      setAlert(false);
      setModalOpen(true);
      setMsg("Username: Maximum length is 25 characters");
      return;
    }
    for (const ch of value) {
      if (!allowed.includes(ch)) {
        setAlert(false);
        setModalOpen(true);
        setMsg("Username: Special characters are not allowed");
        return;
      }
    }
    setUsername(value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789@.";

    if (value !== value.toLowerCase()) {
      setAlert(false);
      setModalOpen(true);
      setMsg("Email: Uppercase letters are not allowed");
      return;
    }
    for (const ch of value) {
      if (!allowed.includes(ch)) {
        setAlert(false);
        setModalOpen(true);
        setMsg("Email: Invalid character detected");
        return;
      }
    }
    setEmail(value);
  };

  const handleEmailKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      setAlert(false);
      setModalOpen(true);
      setMsg("Email: Spaces are not allowed");
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(" ")) {
      setAlert(false);
      setModalOpen(true);
      setMsg("Password: Spaces are not allowed");
      return;
    }
    setPassword(value);
  };

  // --- Register API (UNCHANGED) ---
  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("Loading...");
    setModalOpen(true);

    try {
      const res = await fetch("/api/regis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          create_db: createDb,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert(false);
        setMsg(data.error);
        return;
      }

      setAlert(true);
      setMsg("Registration successful!");

      setTimeout(() => {
        setAlert(false);
        setModalOpen(false);
        setUsername("");
        setEmail("");
        setPassword("");
        setCreateDb(false);
      }, 800);

      redirect("/login");
    } catch {
      setAlert(false);
      setMsg("Server error");
    }
  };

  function handleSubmitRegister(data: z.infer<typeof registerSchema>) {
    console.log(data);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="register-form"
          onSubmit={form.handleSubmit(handleSubmitRegister)}
          className="space-y-6"
        >
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
                <Input {...field} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  Email
                </FieldLabel>
                <Input {...field} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  type="password"
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
        <Field className="w-full">
          {/* Submit */}
          <Button type="submit" form="register-form" className="cursor-pointer">
            Submit
          </Button>

          <FieldDescription className="text-center">
            Already have an account? <Link href="/login">Log in</Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
