import axios from "axios"

export interface ApiEnvelope {
  status: boolean
  message: string
  data: unknown
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Partial<ApiEnvelope> | undefined
    if (data?.message) return data.message
    return error.message
  }

  if (error instanceof Error) return error.message

  return "Something went wrong. Please try again."
}
