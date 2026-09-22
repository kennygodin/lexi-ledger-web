import { useQuery } from "@tanstack/react-query";
import { getTransactionCorrections } from "../api/transactions.api";

export function useTransactionCorrections(id: string, enabled: boolean) {
  return useQuery({
    queryKey: ["transactions", id, "corrections"],
    queryFn: () => getTransactionCorrections(id),
    enabled,
  });
}
