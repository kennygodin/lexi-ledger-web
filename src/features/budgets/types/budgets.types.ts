import type { TransactionCategory } from "@/features/transactions/types/transactions.types";

export interface Budget {
  id: string;
  userId: string;
  category: TransactionCategory;
  monthlyLimit: number;
  createdAt: string;
  updatedAt: string;
  spent: number;
  remaining: number;
  percentUsed: number;
}

export interface BudgetUpsertResult {
  id: string;
  userId: string;
  category: TransactionCategory;
  monthlyLimit: number;
  createdAt: string;
  updatedAt: string;
}
