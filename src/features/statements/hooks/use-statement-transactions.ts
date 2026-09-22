import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getStatementTransactions,
  type ListStatementTransactionsParams,
} from "../api/statements.api";

export function useStatementTransactions(
  id: string,
  params: ListStatementTransactionsParams,
) {
  return useQuery({
    queryKey: ["statements", id, "transactions", params],
    queryFn: () => getStatementTransactions(id, params),
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
}
