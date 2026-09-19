import { useLocation, useNavigate } from "react-router";
import { useCountdown } from "@/hooks/use-countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/common/error-message";
import { getErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { OtpInput } from "../components/otp-input";
import { useVerifyEmail } from "../hooks/use-verify-email.api";
import { useResendVerifyEmail } from "../hooks/use-resend-verify-email";
import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from "../schemas/verify-email.schema";
import { AuthCard } from "../components/auth-card";
import { toast } from "@/components/ui/toast";

function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

interface VerifyEmailLocationState {
  email?: string;
}

export function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = (location.state as VerifyEmailLocationState | null)?.email;

  const verifyEmail = useVerifyEmail();
  const resendVerification = useResendVerifyEmail();
  const { secondsLeft, restart } = useCountdown(60);

  const { control, handleSubmit } = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { otp: "" },
  });

  const onResend = () => {
    if (!email) return;

    resendVerification.mutate(email, {
      onSuccess: (result) => {
        toast.add({ type: "success", description: result.message });
        restart();
      },
    });
  };

  const onSubmit = handleSubmit((values) => {
    verifyEmail.mutate(values.otp, {
      onSuccess: (result) => {
        toast.add({ type: "success", description: result.message });
        navigate("/login", { replace: true });
      },
    });
  });

  const description = (
    <p className="mt-1 text-sm text-muted-foreground">
      Enter the 6-digit code we sent to{" "}
      {email ? <span className="font-medium">{email}</span> : "your email"}
    </p>
  );

  const form = (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <OtpInput
        control={control}
        name="otp"
        length={6}
        disabled={verifyEmail.isPending || resendVerification.isPending}
      />

      <p className="text-left text-xs text-muted-foreground">
        {secondsLeft > 0 ? (
          <>Resend code in {formatCountdown(secondsLeft)}</>
        ) : (
          <button
            type="button"
            onClick={onResend}
            disabled={resendVerification.isPending}
            className="text-primary hover:underline disabled:pointer-events-none disabled:opacity-50"
          >
            {resendVerification.isPending ? "Resending..." : "Resend code"}
          </button>
        )}
      </p>

      {verifyEmail.isError && (
        <ErrorMessage message={getErrorMessage(verifyEmail.error)} />
      )}
      {resendVerification.isError && (
        <ErrorMessage message={getErrorMessage(resendVerification.error)} />
      )}

      <Button
        type="submit"
        disabled={verifyEmail.isPending}
        className="h-10 w-full"
      >
        {verifyEmail.isPending && <Spinner className="size-4" />}
        {verifyEmail.isPending ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );

  return (
    <AuthCard
      title="Verify your email"
      description={description}
      children={form}
    />
  );
}
