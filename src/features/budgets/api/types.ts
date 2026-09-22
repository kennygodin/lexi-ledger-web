export interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  data: T;
}
