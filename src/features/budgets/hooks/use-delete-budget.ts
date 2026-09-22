import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudget } from "../api/budgets.api";
import type { TransactionCategory } from "@/features/transactions/types/transactions.types";

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: TransactionCategory) => deleteBudget(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}
