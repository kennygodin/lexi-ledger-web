import { useEffect, useState } from "react";
import { useCurrentUser } from "../hooks/use-current-user";
import { useUpdateProfile } from "../hooks/use-update-profile";
import { PageHeader } from "@/components/layouts/page-header";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorMessage } from "@/components/common/error-message";
import { getErrorMessage } from "@/lib/errors";
import { toast } from "@/components/ui/toast";
import { getInitials } from "@/lib/initials";

export function Profile() {
  const { data: user, isLoading, isError, error } = useCurrentUser();
  const updateProfile = useUpdateProfile();
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  const handleSave = () => {
    if (!name.trim() || name === user?.name) return;

    updateProfile.mutate(name.trim(), {
      onSuccess: () => {
        toast.add({ type: "success", description: "Profile updated." });
      },
    });
  };

  return (
    <div>
      <PageHeader title="Profile" description="Manage your account details" />

      {isError ? (
        <ErrorMessage message={getErrorMessage(error)} />
      ) : isLoading || !user ? (
        <div className="flex items-center gap-4 border border-border p-6">
          <Skeleton className="size-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      ) : (
        <div className="max-w-md border border-border p-6">
          <div className="flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
              {getInitials(...user.name.split(" "))}
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {user.name}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex items-center bg-muted px-2 py-0.5 text-xs font-medium text-foreground capitalize">
                  {user.role}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${
                    user.emailVerifiedAt
                      ? "bg-primary/10 text-primary"
                      : "bg-amber-500/10 text-amber-600"
                  }`}
                >
                  {user.emailVerifiedAt ? "Verified" : "Not verified"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={updateProfile.isPending}
              />
            </Field>

            {updateProfile.isError && (
              <ErrorMessage message={getErrorMessage(updateProfile.error)} />
            )}

            <Button
              size="sm"
              className="self-start"
              onClick={handleSave}
              disabled={
                updateProfile.isPending || !name.trim() || name === user.name
              }
            >
              {updateProfile.isPending ? (
                <span className="flex items-center gap-2">
                  <Spinner className="size-3.5" /> Saving…
                </span>
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
