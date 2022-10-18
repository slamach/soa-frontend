import { useCallback, useContext } from 'react';
import { SnackContext } from '../components/AppBase/AppBase';
import { isResponseError } from '../utils/errorHandling';

export const useProcessResult = () => {
  const openSnack = useContext(SnackContext);

  const processResult = useCallback(
    (result: any, successMessage: string) => {
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
    },
    [openSnack]
  );

  return { processResult };
};
