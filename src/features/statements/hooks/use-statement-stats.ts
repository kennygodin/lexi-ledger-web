import { useQuery } from "@tanstack/react-query";
import { getStatementStats } from "../api/statements.api";

export function useStatementStats(id: string) {
  return useQuery({
    queryKey: ["statements", id, "stats"],
    queryFn: () => getStatementStats(id),
    enabled: !!id,
  });
}
