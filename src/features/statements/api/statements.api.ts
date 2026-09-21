import { apiClient } from "@/api/client.api";
import type { Statement } from "../types/statements.types";
import type { ApiEnvelope, PaginatedEnvelope } from "./types";

export interface ListStatementsParams {
  page?: number;
  limit?: number;
}

export async function uploadStatement(
  file: File,
  onUploadProgress?: (percent: number) => void,
) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<ApiEnvelope<Statement>>(
    "/statements/upload",
    formData,
    {
      onUploadProgress: (event) => {
        if (!onUploadProgress || !event.total) return;
        onUploadProgress(Math.round((event.loaded / event.total) * 100));
      },
    },
  );

  return data.data;
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
