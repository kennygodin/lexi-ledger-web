import { apiClient } from "@/api/client.api";
import type { Statement } from "../types/statements.types";
import type { ApiEnvelope, PaginatedEnvelope } from "./types";

export interface ListStatementsParams {
  page?: number;
  limit?: number;
}

export async function listStatements(params: ListStatementsParams = {}) {
  const { data } = await apiClient.get<PaginatedEnvelope<Statement>>(
    "/statements",
    { params },
  );

  return { statements: data.data, meta: data.meta };
}

export async function getStatement(id: string) {
  const { data } = await apiClient.get<ApiEnvelope<Statement>>(
    `/statements/${id}`,
  );
  return data.data;
}
