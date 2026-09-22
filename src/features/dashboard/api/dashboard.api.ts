import { apiClient } from "@/api/client.api";
import type { DashboardOverview } from "../types/dashboard.types";
import type { ApiEnvelope } from "./types";

export interface DashboardOverviewParams {
  from?: string;
  to?: string;
}

export async function getDashboardOverview(
  params: DashboardOverviewParams = {},
) {
  const { data } = await apiClient.get<ApiEnvelope<DashboardOverview>>(
    "/dashboard/overview",
    { params },
  );

  return data.data;
}
