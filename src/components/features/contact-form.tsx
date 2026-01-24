"use client";

import * as React from "react";
import { Send, Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="w-full shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <CardTitle>Contact us</CardTitle>
        </div>
        <CardDescription>
          Have a question, feedback, or need support? Send us a message and
          we’ll get back to you shortly.
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.open(sendLink, "_blank");
        }}
      >
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What’s this about?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your message here..."
              rows={5}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!subject || !content}
          >
            <Send className="mr-2 h-4 w-4" />
            Send message
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
