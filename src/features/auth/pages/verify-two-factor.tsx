import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../auth.store";
import { useVerifyTwoFactor } from "../api/use-verify-two-factor.api";
import { useResendTwoFactor } from "../api/use-resend-two-factor.api";
import { useCountdown } from "@/hooks/use-countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  verifyTwoFactorSchema,
  type VerifyTwoFactorFormValues,
} from "../schemas/verify-two-factor.schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ErrorMessage } from "@/components/common/error-message";
import { getErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { OtpInput } from "../components/otp-input";
import { HugeiconsIcon } from "@hugeicons/react";
import { Invoice03Icon } from "@hugeicons/core-free-icons";

function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

interface VerifyTwoFactorLocationState {
  email?: string;
  verificationToken?: string;
}

export function VerifyTwoFactor() {
  const location = useLocation();
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);

  const locationState = location.state as VerifyTwoFactorLocationState | null;
  const email = locationState?.email;
  const verificationToken = locationState?.verificationToken;

  const verifyTwoFactor = useVerifyTwoFactor();
  const resendOtp = useResendTwoFactor();
  const { secondsLeft, restart } = useCountdown(60);

  const { control, handleSubmit } = useForm<VerifyTwoFactorFormValues>({
    resolver: zodResolver(verifyTwoFactorSchema),
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

    verifyTwoFactor.mutate(
      { ...values, token: verificationToken },
      {
        onSuccess: (session) => {
          setSession(session.user, session.tokens);
          navigate("/", { replace: true });
        },
      },
    );
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
            <p className="text-2xl font-bold">Verify your email</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the 6-digit code we sent to{" "}
              {email ? (
                <span className="font-medium">{email}</span>
              ) : (
                "your email"
              )}
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-6">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <OtpInput
              control={control}
              name="otp"
              length={6}
              disabled={verifyTwoFactor.isPending || resendOtp.isPending}
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
                  {resendOtp.isPending ? "Resending…" : "Resend code"}
                </button>
              )}
            </p>

            {verifyTwoFactor.isError && (
              <ErrorMessage message={getErrorMessage(verifyTwoFactor.error)} />
            )}
            {resendOtp.isError && (
              <ErrorMessage message={getErrorMessage(resendOtp.error)} />
            )}

            <Button
              type="submit"
              disabled={verifyTwoFactor.isPending}
              className="h-10 w-full"
            >
              {verifyTwoFactor.isPending && <Spinner className="size-4" />}
              {verifyTwoFactor.isPending ? "Verifying…" : "Verify"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
