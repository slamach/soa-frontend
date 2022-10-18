import { useContext } from 'react';
import { SnackContext } from '../components/AppBase/AppBase';

export const useSnack = () => {
  const openSnack = useContext(SnackContext);
  return { openSnack };
};
