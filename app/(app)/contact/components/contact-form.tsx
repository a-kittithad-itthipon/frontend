"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function ContactForm() {
  return (
    <main className="flex-1 bg-background">
      <section className="mx-auto max-w-xl px-4 py-16 md:py-24">
        <Card>
          <CardContent className="space-y-6 pt-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold">Contact us</h1>
              <p className="text-sm text-muted-foreground">
                Have a question or need help? Fill out the form and we’ll get
                back to you.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4">
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help..."
                  rows={5}
                />
              </Field>

              <Button type="submit" size="lg" className="w-full">
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
