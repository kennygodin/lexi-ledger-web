import { useAuthStore } from "@/features/auth/auth.store";
import { Navigate, Outlet } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { useAuthBootstrap } from "@/features/auth/hooks/use-auth-bootstrap";

export function ProtectedRoute() {
  useAuthBootstrap();

  const status = useAuthStore((state) => state.status);

  if (status === "loading") {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
