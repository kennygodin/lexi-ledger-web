import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../auth.store";
import { useCountdown } from "@/hooks/use-countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/common/error-message";
import { getErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { OtpInput } from "../components/otp-input";
import { useVerifyEmail } from "../api/use-verify-email.api";
import { useResendVerifyEmail } from "../api/use-resend-verify-email";
import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from "../schemas/verify-email.schema";
import { AuthCard } from "../components/auth-card";

function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

interface VerifyTwoFactorLocationState {
  email?: string;
  verificationToken?: string;
}

export function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);

  const locationState = location.state as VerifyTwoFactorLocationState | null;
  const email = locationState?.email;
  const verificationToken = locationState?.verificationToken;

  const verifyEmail = useVerifyEmail();
  const resendOtp = useResendVerifyEmail();
  const { secondsLeft, restart } = useCountdown(60);

  const { control, handleSubmit } = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { otp: "" },
  });

  const onResend = () => {
    if (!verificationToken) return;

    resendOtp.mutate(verificationToken, {
      onSuccess: () => restart(),
    });
  };

  const onSubmit = handleSubmit((values) => {
    if (!verificationToken) return;

    verifyEmail.mutate(
      { ...values, token: verificationToken },
      {
        onSuccess: (session) => {
          setSession(session.user, session.tokens);
          navigate("/", { replace: true });
        },
      },
    );
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
        disabled={verifyEmail.isPending || resendOtp.isPending}
      />

      <p className="text-left text-xs text-muted-foreground">
        {secondsLeft > 0 ? (
          <>Resend code in {formatCountdown(secondsLeft)}</>
        ) : (
          <button
            type="button"
            onClick={onResend}
            disabled={resendOtp.isPending}
            className="text-primary hover:underline disabled:pointer-events-none disabled:opacity-50"
          >
            {resendOtp.isPending ? "Resending..." : "Resend code"}
          </button>
        )}
      </p>

      {verifyEmail.isError && (
        <ErrorMessage message={getErrorMessage(verifyEmail.error)} />
      )}
      {resendOtp.isError && (
        <ErrorMessage message={getErrorMessage(resendOtp.error)} />
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
