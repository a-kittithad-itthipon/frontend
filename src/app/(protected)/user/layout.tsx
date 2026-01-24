import { cookies } from "next/headers";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { AppSidebarHeader } from "@/components/app-sidebar-header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar role="user" />
      <SidebarInset>
        <AppSidebarHeader />

        <main className="flex flex-1 flex-col gap-4 p-4">
          {children}
          <Toaster richColors position="bottom-right" />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
