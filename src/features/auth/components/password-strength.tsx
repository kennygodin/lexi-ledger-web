import { passwordRequirements } from "@/features/auth/components/password-requirements";
import { cn } from "@/lib/utils";
import { CheckLineIcon, Close } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  return (
    <ul className="grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-1">
      {passwordRequirements.map((requirement) => {
        const met = requirement.test(password);

        return (
          <li
            key={requirement.label}
            className={cn(
              "flex items-center gap-1.5 text-xs",
              met ? "text-primary" : "text-muted-foreground",
            )}
          >
            {met ? (
              <HugeiconsIcon icon={CheckLineIcon} className="size-3.5" />
            ) : (
              <HugeiconsIcon icon={Close} className="size-3.5" />
            )}
            {requirement.label}
          </li>
        );
      })}
    </ul>
  );
}
