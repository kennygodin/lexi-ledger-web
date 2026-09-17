import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/lib/env";
import { useAuthStore } from "@/features/auth/auth.store";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().tokens?.accessToken;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

const PUBLIC_AUTH_ENDPOINTS = [
  "/auth/login",
  "/auth/verify-otp",
  "/auth/resend-otp",
  "/auth/accept-invitation",
  "/auth/forgot-password",
  "/auth/reset-password",
];

function isPublicAuthEndpoint(url?: string): boolean {
  return !!url && PUBLIC_AUTH_ENDPOINTS.some((path) => url.includes(path));
}

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const { data } = await axios.post<{ data: { accessToken: string } }>(
    "/admin/auth/refresh-token",
    undefined,
    { baseURL: env.apiBaseUrl, withCredentials: true },
  );

  useAuthStore.getState().setTokens({ accessToken: data.data.accessToken });
  return data.data.accessToken;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isPublicAuthEndpoint(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= refreshAccessToken();
      const accessToken = await refreshPromise;
      originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);
      return apiClient(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clear();
      return Promise.reject(refreshError);
    } finally {
      refreshPromise = null;
    }
  },
);
