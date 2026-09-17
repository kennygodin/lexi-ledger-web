import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { signupSchema, type SignupFormValues } from "../schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "../api/use-signup.api";
import { TextInput } from "../components/text-input";
import { ErrorMessage } from "@/components/common/error-message";
import { getErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PasswordStrength } from "../components/password-strength";
import { toast } from "@/components/ui/toast";
import { AuthCard } from "../components/auth-card";

export function Signup() {
  const navigate = useNavigate();
  const register = useSignup();

  const { control, handleSubmit } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const password = useWatch({ control, name: "password" });

  const onSubmit = handleSubmit((values) => {
    register.mutate(values, {
      onSuccess: (result) => {
        toast.add({
          type: "success",
          description: result.message,
        });
        navigate("/verify-email", {
          replace: true,
          state: { email: values.email },
        });
      },
    });
  });

  const form = (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <TextInput
        control={control}
        name="name"
        label="Name"
        type="text"
        placeholder="John Doe"
        disabled={register.isPending}
      />
      <TextInput
        control={control}
        name="email"
        label="Email address"
        type="email"
        placeholder="user@example.com"
        disabled={register.isPending}
      />
      <TextInput
        control={control}
        name="password"
        label="Password"
        type="password"
        disabled={register.isPending}
      />
      <TextInput
        control={control}
        name="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="Re-enter your password"
        disabled={register.isPending}
      />

      <PasswordStrength password={password} />

      {register.isError && (
        <ErrorMessage message={getErrorMessage(register.error)} />
      )}

      <Button
        type="submit"
        disabled={register.isPending}
        className="h-10 w-full"
      >
        {register.isPending && <Spinner className="size-4" />}
        {register.isPending ? "Signing up..." : "Create"}
      </Button>
    </form>
  );

  return (
    <AuthCard
      title="Create an account"
      description="Start tracking your spending in minutes"
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </>
      }
      children={form}
    />
  );
}
