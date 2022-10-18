import { AlertColor } from '@mui/material';
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

export const processResult = (
  result: any,
  successMessage: string,
  openSnack: (severity: AlertColor | undefined, message: string) => void
) => {
  if ('error' in result) {
    let errorMessage: string;
    if (isResponseError(result.error) && result.error.data.message) {
      errorMessage = result.error.data.message;
    } else {
      errorMessage = 'Unknown error';
    }
    openSnack('error', errorMessage);
    return false;
  } else {
    openSnack('success', successMessage);
    return true;
  }
};
