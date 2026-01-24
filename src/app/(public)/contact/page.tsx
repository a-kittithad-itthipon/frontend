import { ContactForm } from "@/components/features/contact-form";

export default function ContactPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <ContactForm />
      </div>
    </div>
  );
}
