import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "@/api/query-client.api";
import { Toaster } from "@/components/ui/toast";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
