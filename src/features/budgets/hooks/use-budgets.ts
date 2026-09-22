import { useQuery } from "@tanstack/react-query";
import { listBudgets, type ListBudgetsParams } from "../api/budgets.api";

export function useBudgets(params: ListBudgetsParams = {}) {
  return useQuery({
    queryKey: ["budgets", params],
    queryFn: () => listBudgets(params),
  });
}
