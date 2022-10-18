import { BasicErrorResponse } from '../types/api';

export function isResponseError(
  error: unknown
): error is { status: number; data: BasicErrorResponse } {
  return (
    typeof error === 'object' &&
    error != null &&
    'status' in error &&
    typeof (error as any).status === 'number' &&
    'data' in error &&
    typeof (error as any).data === 'object' &&
    'message' in (error as any).data &&
    typeof ((error as any).data as any).message === 'string'
  );
}
