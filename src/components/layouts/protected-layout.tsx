import { Outlet, useMatches } from "react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { NavigateUser } from "@/components/layouts/navigate-user";
import { ModeToggle } from "@/components/common/mode-toggle";

interface RouteHandle {
  title?: string;
  description?: string;
}

export function ProtectedLayout() {
  const matches = useMatches();
  const handle = matches
    .map((match) => match.handle as RouteHandle | undefined)
    .findLast((h) => h?.title);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex shrink-0 items-center justify-between gap-2 py-4 px-4">
          <div>
            <p className="text-xl leading-none">{handle?.title}</p>
            {handle?.description && (
              <p className="mt-0.5 text-sm text-muted-foreground">
                {handle.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <ModeToggle />
            <NavigateUser />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto px-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
