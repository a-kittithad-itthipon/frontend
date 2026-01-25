"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  otp: z.string().max(6, "OTP is required"),
});

export function VerifyOtpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function submitVerify(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  return (
    <form onSubmit={form.handleSubmit(submitVerify)}>
      <FieldGroup>
        <Controller
          name="otp"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                aria-invalid={fieldState.invalid}
              >
                Verification code
              </FieldLabel>
              <Input {...field} aria-invalid={fieldState.invalid} />
            </Field>
          )}
        />

        <Field>
          <Button type="submit">Verify</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
