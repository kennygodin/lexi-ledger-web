import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransactionCategory } from "../api/transactions.api";
import type { TransactionCategory } from "../types/transactions.types";

export function useUpdateTransactionCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      category,
    }: {
      id: string;
      category: TransactionCategory;
    }) => updateTransactionCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
