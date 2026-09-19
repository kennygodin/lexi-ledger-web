import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={(event) =>
        setTheme(theme === "dark" ? "light" : "dark", {
          x: event.clientX,
          y: event.clientY,
        })
      }
    >
      {theme === "dark" ? (
        <HugeiconsIcon icon={Moon02Icon} className="size-4.5" />
      ) : (
        <HugeiconsIcon icon={Sun03Icon} className="size-4.5" />
      )}
    </Button>
  );
}
