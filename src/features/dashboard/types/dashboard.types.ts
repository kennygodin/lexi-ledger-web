import type { TransactionCategory } from "@/features/transactions/types/transactions.types";

export interface CategoryBreakdown {
  category: TransactionCategory;
  total: number;
  count: number;
}

export interface DashboardOverview {
  totalTransactions: number;
  totalCredit: number;
  totalDebit: number;
  net: number;
  categoryBreakdown: CategoryBreakdown[];
}
