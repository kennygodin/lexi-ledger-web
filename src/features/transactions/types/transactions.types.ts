export type TransactionType = "debit" | "credit";

export type TransactionCategory =
  | "food"
  | "transport"
  | "rent"
  | "utilities"
  | "subscriptions"
  | "shopping"
  | "entertainment"
  | "income"
  | "other";

export interface Transaction {
  id: string;
  userId: string;
  statementId: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  confidence: number;
  createdAt: string;
}

export interface CategoryCorrection {
  id: string;
  transactionId: string;
  userId: string;
  previousCategory: TransactionCategory;
  newCategory: TransactionCategory;
  correctedAt: string;
}
