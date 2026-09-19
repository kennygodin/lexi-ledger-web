import { useForm } from "react-hook-form";
import { useForgotPassword } from "../hooks/use-forgot-password.api";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { TextInput } from "../components/text-input";
import { ErrorMessage } from "@/components/common/error-message";
import { getErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { AuthCard } from "../components/auth-card";

export function ForgotPassword() {
  const navigate = useNavigate();
  const requestReset = useForgotPassword();

  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit((values) => {
    requestReset.mutate(values, {
      onSuccess: (result) => {
        toast.add({
          type: "success",
          description:
            result.message ??
            "If an account exist for that email, we've sent you a code to reset your password",
        });
        navigate("/reset-password");
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
        disabled={requestReset.isPending}
      />

      {requestReset.isError && (
        <ErrorMessage message={getErrorMessage(requestReset.error)} />
      )}

      <Button
        type="submit"
        disabled={requestReset.isPending}
        className="h-10 w-full"
      >
        {requestReset.isPending && <Spinner className="size-4 animate-spin" />}
        {requestReset.isPending ? "Sending..." : "Send code"}
      </Button>
    </form>
  );

  return (
    <AuthCard
      title="Reset your password"
      description="Enter your email and we'll send you a code to reset your password"
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
