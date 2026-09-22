import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  listTransactions,
  type ListTransactionsParams,
} from "../api/transactions.api";

export function useTransactions(params: ListTransactionsParams) {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => listTransactions(params),
    placeholderData: keepPreviousData,
  });
}
