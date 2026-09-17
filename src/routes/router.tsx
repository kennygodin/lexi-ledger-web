import { createBrowserRouter } from "react-router";
import { Login } from "@/features/auth/pages/login";
import { VerifyTwoFactor } from "@/features/auth/pages/verify-two-factor";

export const router = createBrowserRouter([
  {
    children: [
      { path: "/login", element: <Login /> },
      { path: "/verify-two-factor", element: <VerifyTwoFactor /> },
    ],
  },
]);
