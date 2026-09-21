import { createBrowserRouter } from "react-router";
import { Login } from "@/features/auth/pages/login";
import { VerifyTwoFactor } from "@/features/auth/pages/verify-two-factor";
import { ForgotPassword } from "@/features/auth/pages/forgot-password";
import { ResetPassword } from "@/features/auth/pages/reset-password";
import { Signup } from "@/features/auth/pages/signup";
import { VerifyEmail } from "@/features/auth/pages/verify-email";
import { ProtectedRoute } from "./protected.routes";
import { ProtectedLayout } from "@/components/layouts/protected-layout";
import { Dashboard } from "@/features/dashboard/pages/dashboard";
import { Statements } from "@/features/statements/pages/statements";
import { Transactions } from "@/features/transactions/pages/transactions";
import { Budgets } from "@/features/budgets/pages/budgets";
import { Settings } from "@/features/settings/pages/settings";

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
        children: [
          {
            element: <ProtectedLayout />,
            children: [
              {
                path: "/",
                element: <Dashboard />,
              },
              {
                path: "/statements",
                element: <Statements />,
              },
              {
                path: "/transactions",
                element: <Transactions />,
              },
              {
                path: "/budgets",
                element: <Budgets />,
              },
              {
                path: "/settings",
                element: <Settings />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
