import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  listStatements,
  type ListStatementsParams,
} from "../api/statements.api";

const ACTIVE_POLL_INTERVAL = 3000;

export function useStatements(params: ListStatementsParams) {
  return useQuery({
    queryKey: ["statements", params],
    queryFn: () => listStatements(params),
    placeholderData: keepPreviousData,
    refetchInterval: (query) => {
      const hasActiveUpload = query.state.data?.statements.some(
        (s) => s.status === "pending" || s.status === "processing",
      );
      return hasActiveUpload ? ACTIVE_POLL_INTERVAL : false;
    },
  });
}
