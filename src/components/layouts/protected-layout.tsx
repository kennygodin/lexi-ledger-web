import { Outlet } from "react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { NavigateUser } from "@/components/layouts/navigate-user";
import { ModeToggle } from "@/components/common/mode-toggle";

export function ProtectedLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border py-4 px-4">
          <SidebarTrigger />
          <div className="flex items-center gap-1">
            <ModeToggle />
            <NavigateUser />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
