import { Link } from "react-router";
import { getInitials } from "@/lib/initials";
import { useAuthStore } from "@/features/auth/auth.store";

export function NavigateUser() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <Link
      to="/profile"
      className="flex items-center gap-3 px-2 py-1 transition-colors hover:bg-muted"
      aria-label="Open your profile"
    >
      <div className="flex size-7 shrink-0 items-center justify-center bg-muted text-xs font-medium">
        {getInitials(user.name)}
      </div>

      <div className="hidden leading-tight sm:block">
        <p className="text-sm font-medium">{user.name}</p>
      </div>
    </Link>
  );
}
