export interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  twoFactorEnabled: boolean;
  role: "user";
}

export interface AuthTokens {
  accessToken: string;
}
