import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertBudget } from "../api/budgets.api";
import type { TransactionCategory } from "@/features/transactions/types/transactions.types";

export function useUpsertBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      category,
      monthlyLimit,
    }: {
      category: TransactionCategory;
      monthlyLimit: number;
    }) => upsertBudget(category, monthlyLimit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}
