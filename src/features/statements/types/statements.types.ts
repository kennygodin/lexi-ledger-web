export type StatementStatus = "pending" | "processing" | "parsed" | "failed";

export interface Statement {
  id: string;
  userId: string;
  filename: string;
  contentHash: string;
  storagePath: string;
  status: StatementStatus;
  failureReason: string | null;
  uploadedAt: string;
}

export interface StatementStats {
  totalTransactions: number;
  totalCredit: number;
  totalDebit: number;
  net: number;
}
