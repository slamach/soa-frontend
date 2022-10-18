import { components } from '../types/api/routes';

export function isResponseError(
  error: unknown
): error is { status: number; data: components['schemas']['Response'] } {
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
