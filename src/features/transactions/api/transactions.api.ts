import { apiClient } from "@/api/client.api";
import type {
  CategoryCorrection,
  Transaction,
  TransactionCategory,
} from "../types/transactions.types";
import type { ApiEnvelope, PaginatedEnvelope } from "./types";

export async function getTransactionCorrections(id: string) {
  const { data } = await apiClient.get<ApiEnvelope<CategoryCorrection[]>>(
    `/transactions/${id}/corrections`,
  );
  return data.data;
}

export interface ListTransactionsParams {
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
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
