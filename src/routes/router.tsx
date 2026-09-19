import { createBrowserRouter } from "react-router";
import { Login } from "@/features/auth/pages/login";
import { VerifyTwoFactor } from "@/features/auth/pages/verify-two-factor";
import { ForgotPassword } from "@/features/auth/pages/forgot-password";
import { ResetPassword } from "@/features/auth/pages/reset-password";
import { Signup } from "@/features/auth/pages/signup";
import { VerifyEmail } from "@/features/auth/pages/verify-email";
import { Home } from "@/features/home/pages/home";
import { ProtectedRoute } from "./protected.routes";

export const router = createBrowserRouter([
  {
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Signup /> },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/verify-two-factor", element: <VerifyTwoFactor /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },

      {
        element: <ProtectedRoute />,
        children: [{ path: "/", element: <Home /> }],
      },
    ],
  },
]);
