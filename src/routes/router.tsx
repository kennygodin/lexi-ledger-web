import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/features/auth/pages/login-page";

export const router = createBrowserRouter([
  {
    children: [{ path: "/login", element: <LoginPage /> }],
  },
]);
