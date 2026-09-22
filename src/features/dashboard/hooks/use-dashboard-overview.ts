import { useQuery } from "@tanstack/react-query";
import {
  getDashboardOverview,
  type DashboardOverviewParams,
} from "../api/dashboard.api";

export function useDashboardOverview(params: DashboardOverviewParams = {}) {
  return useQuery({
    queryKey: ["dashboard", "overview", params],
    queryFn: () => getDashboardOverview(params),
  });
}
