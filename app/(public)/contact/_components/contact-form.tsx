"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const [subject, setSubject] = React.useState("");
  const [content, setContent] = React.useState("");

  const email = "a.kittithad.ittipon@gmail.com";

  const sendLink = React.useMemo(() => {
    return (
      "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      email +
      "&su=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(content)
    );
  }, [email, subject, content]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* ================= LEFT : FORM ================= */}
      <div className="bg-background px-6 py-10 md:px-12 md:py-14 space-y-8">
        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-md">
            Have a question or feedback? Drop us a message and we’ll get back to
            you shortly.
          </p>
        </header>

        {/* Form */}
        <div className="space-y-6">
          {/* Subject */}
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What’s this about?"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your message here..."
              className="min-h-40 max-h-56 resize-none overflow-y-auto"
            />
          </div>

          {/* CTA */}
          <Button
            size="lg"
            className="w-full rounded-full text-base font-semibold gap-2 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </div>
      </div>

      {/* ================= RIGHT : IMAGE (DESKTOP ONLY) ================= */}
      <div className="relative hidden md:block">
        <div className="absolute inset-0 bg-[url(/img/w08.jpg)] bg-cover bg-center" />
      </div>
    </div>
  );
}
