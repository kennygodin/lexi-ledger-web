export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  emailVerifiedAt: string | null;
}

export interface AuthTokens {
  accessToken: string;
}
