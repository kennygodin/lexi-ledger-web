import { apiClient } from "@/api/client.api";
import type {
  Transaction,
  TransactionCategory,
} from "../types/transactions.types";
import type { ApiEnvelope, PaginatedEnvelope } from "./types";

export interface ListTransactionsParams {
  page?: number;
  limit?: number;
}

export async function listTransactions(params: ListTransactionsParams = {}) {
  const { data } = await apiClient.get<PaginatedEnvelope<Transaction>>(
    "/transactions",
    { params },
  );

  return { transactions: data.data, meta: data.meta };
}

export async function updateTransactionCategory(
  id: string,
  category: TransactionCategory,
) {
  const { data } = await apiClient.patch<ApiEnvelope<Transaction>>(
    `/transactions/${id}/category`,
    { category },
  );

  return data.data;
}
