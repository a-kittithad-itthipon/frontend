import type { Metadata } from "next";
import { ContactForm } from "./_components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with us for questions, feedback, or support.",
};

export default function ContactPage() {
  return (
    <div className="w-full">
      <ContactForm />
    </div>
  );
}
