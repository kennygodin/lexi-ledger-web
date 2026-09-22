import { apiClient } from "@/api/client.api";
import type { ApiEnvelope } from "./types";
import type { Budget, BudgetUpsertResult } from "../types/budgets.types";
import type { TransactionCategory } from "@/features/transactions/types/transactions.types";

export interface ListBudgetsParams {
  month?: string; // YYYY-MM
}

export async function listBudgets(params: ListBudgetsParams = {}) {
  const { data } = await apiClient.get<ApiEnvelope<Budget[]>>("/budgets", {
    params,
  });
  return data.data;
}

export async function upsertBudget(
  category: TransactionCategory,
  monthlyLimit: number,
) {
  const { data } = await apiClient.put<ApiEnvelope<BudgetUpsertResult>>(
    `/budgets/${category}`,
    { monthlyLimit },
  );
  return data.data;
}

export async function deleteBudget(category: TransactionCategory) {
  const { data } = await apiClient.delete<ApiEnvelope<BudgetUpsertResult>>(
    `/budgets/${category}`,
  );
  return data.data;
}
