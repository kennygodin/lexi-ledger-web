import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadStatement } from "../api/statements.api";

interface UploadStatementVariables {
  file: File;
  onUploadProgress?: (percent: number) => void;
}

export function useUploadStatement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, onUploadProgress }: UploadStatementVariables) =>
      uploadStatement(file, onUploadProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statements"] });
    },
  });
}
