import { useQuery } from "@tanstack/react-query";
import { getStatement } from "../api/statements.api";

export function useStatement(id: string) {
  return useQuery({
    queryKey: ["statements", id],
    queryFn: () => getStatement(id),
    enabled: !!id,
  });
}
