import type { Metadata } from "next";
import { ContactForm } from "@/features/public/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with us for questions, feedback, or support.",
};

export default function ContactPage() {
  return (
    <div className="flex md:items-center justify-center bg-accent">
      <div className="w-full max-w-6xl">
        <ContactForm />
      </div>
    </div>
  );
}
