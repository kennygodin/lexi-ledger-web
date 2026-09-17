import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import { useLogin } from "../api/use-login.api";
import { useAuthStore } from "../auth.store";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TextInput } from "../components/text-input";
import { ErrorMessage } from "@/components/common/error-message";
import { getErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { HugeiconsIcon } from "@hugeicons/react";
import { Invoice03Icon } from "@hugeicons/core-free-icons";

export function Login() {
  const navigate = useNavigate();
  const login = useLogin();
  const setSession = useAuthStore((state) => state.setSession);

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, {
      onSuccess: (result) => {
        if (result.twoFactorRequired) {
          navigate("/verify-two-factor", {
            state: {
              email: values.email,
              verificationToken: result.verificationToken,
            },
          });
          return;
        }

        setSession(result.session.user, result.session.tokens);
        navigate("/", { replace: true });
      },
    });
  });

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <CardHeader className="flex flex-col gap-6 p-0">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center bg-primary">
              <HugeiconsIcon icon={Invoice03Icon} className="size-6" />
            </div>
            <div>
              <p className="text-base font-semibold">LexiLedger</p>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold">Sign in to your account</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your credentials to continue
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0 pt-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <TextInput
              control={control}
              name="email"
              label="Email address"
              type="email"
              placeholder="user@example.com"
              disabled={login.isPending}
            />
            <TextInput
              control={control}
              name="password"
              label="Password"
              type="password"
              disabled={login.isPending}
            />

            <Link
              to="/forgot-password"
              className="-mt-2 text-xs text-muted-foreground hover:underline"
            >
              Forgot password?
            </Link>

            {login.isError && (
              <ErrorMessage message={getErrorMessage(login.error)} />
            )}

            <Button
              type="submit"
              disabled={login.isPending}
              className="h-10 w-full"
            >
              {login.isPending && <Spinner className="size-4" />}
              {login.isPending ? "Logging in…" : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
