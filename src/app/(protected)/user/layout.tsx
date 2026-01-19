import { cookies } from "next/headers";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppSidebarTrigger } from "@/components/layout/app-sidebar-trigger";

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
        <header className="flex sticky top-0 z-30 h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
          <AppSidebarTrigger />
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">
          {children}
          <Toaster richColors position="bottom-right" />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
