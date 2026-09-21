import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Invoice03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface AuthCardProps {
  title: string;
  description: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <CardHeader className="flex flex-col gap-6 p-0">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center bg-primary text-primary-foreground">
              <HugeiconsIcon icon={Invoice03Icon} className="size-6" />
            </div>
            <div>
              <p className="text-base font-semibold">LexiLedger</p>
            </div>
          </div>

          <div>
            <p className="text-2xl font-semibold">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-6">
          {children}
          {footer && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {footer}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
