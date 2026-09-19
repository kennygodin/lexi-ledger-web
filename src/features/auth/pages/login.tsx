import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import { useLogin } from "../hooks/use-login.api";
import { useAuthStore } from "../auth.store";
import { TextInput } from "../components/text-input";
import { ErrorMessage } from "@/components/common/error-message";
import { getErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AuthCard } from "../components/auth-card";

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
        if (result.status === "EMAIL_NOT_VERIFIED") {
          navigate("/verify-email", { state: { email: values.email } });
          return;
        }

        setSession(result.user, result.accessToken);
        navigate("/", { replace: true });
      },
    });
  });

  const form = (
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
        className="-mt-2 text-xs text-primary hover:underline"
      >
        Forgot password?
      </Link>

      {login.isError && <ErrorMessage message={getErrorMessage(login.error)} />}

      <Button type="submit" disabled={login.isPending} className="h-10 w-full">
        {login.isPending && <Spinner className="size-4" />}
        {login.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );

  return (
    <AuthCard
      title="Sign in to your account"
      description="Enter your credentials to continue"
      footer={
        <>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </>
      }
      children={form}
    />
  );
}
