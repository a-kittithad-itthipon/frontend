import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col w-full">
      <SiteHeader />

      <main className="flex flex-1 flex-col">{children}</main>

      <SiteFooter />
    </div>
  );
}
