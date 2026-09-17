import { z } from "zod";

export const verifyTwoFactorSchema = z.object({
  otp: z.string().length(6, "Enter the 6-digit code"),
});

export type VerifyTwoFactorFormValues = z.infer<typeof verifyTwoFactorSchema>;
