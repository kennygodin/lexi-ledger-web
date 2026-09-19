import { useForm, useWatch } from "react-hook-form";
import { useResetPassword } from "../hooks/use-reset-password.api";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/reset-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { TextInput } from "../components/text-input";
import { OtpInput } from "../components/otp-input";
import { PasswordStrength } from "../components/password-strength";
import { ErrorMessage } from "@/components/common/error-message";
import { getErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AuthCard } from "../components/auth-card";
import { toast } from "@/components/ui/toast";

export function ResetPassword() {
  const navigate = useNavigate();

  const reset = useResetPassword();

  const { control, handleSubmit } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token: "", password: "", confirmPassword: "" },
  });

  const password = useWatch({ control, name: "password" });

  const onSubmit = handleSubmit((values) => {
    reset.mutate(
      {
        token: values.token,
        newPassword: values.password,
      },
      {
        onSuccess: (result) => {
          toast.add({ type: "success", description: result.message });
          navigate("/login", { replace: true });
        },
      },
    );
  });

  const form = (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <OtpInput
        control={control}
        name="token"
        length={6}
        disabled={reset.isPending}
      />

      <TextInput
        control={control}
        name="password"
        label="New password"
        type="password"
        placeholder="Enter new password"
        disabled={reset.isPending}
      />

      <TextInput
        control={control}
        name="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="Re-enter new password"
        disabled={reset.isPending}
      />

      <PasswordStrength password={password} />

      {reset.isError && <ErrorMessage message={getErrorMessage(reset.error)} />}

      <Button type="submit" disabled={reset.isPending} className="h-10 w-full">
        {reset.isPending && <Spinner className="size-4 animate-spin" />}
        {reset.isPending ? "Saving..." : "Save and continue"}
      </Button>
    </form>
  );

  return (
    <AuthCard
      title="Set a new password"
      description="Choose a strong password for your account"
      footer={
        <>
          Remembered your password?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Back to login
          </Link>
        </>
      }
      children={form}
    />
  );
}
