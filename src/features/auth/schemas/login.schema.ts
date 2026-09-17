import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string("Enter valid password"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
