import type { Metadata } from "next";

import { ContactForm } from "@/features/public/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div>
      <ContactForm />
    </div>
  );
}
