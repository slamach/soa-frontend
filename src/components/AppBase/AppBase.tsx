import { Alert, AlertColor, Box, Snackbar } from '@mui/material';
import React, { createContext, useCallback, useState } from 'react';
import Header from '../Header/Header';

const Memo = React.memo((props: { children: JSX.Element }) => {
  return <>{props.children}</>;
});

export const SnackContext = createContext<
  (severity: AlertColor | undefined, message: string) => void
>(() => {});

interface AppBaseProps {
  children: JSX.Element;
}

const AppBase = (props: AppBaseProps) => {
  const [snackState, setSnackState] = useState<{
    open: boolean;
    severity: AlertColor | undefined;
    message: string;
  }>({
    open: false,
    severity: undefined,
    message: '',
  });

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const openSnack = useCallback(
    (severity: AlertColor | undefined, message: string) => {
      setSnackState((prevState) => ({
        open: true,
        severity,
        message,
      }));
    },
    []
  );

  return (
    <>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <SnackContext.Provider value={openSnack}>
          <Memo>{props.children}</Memo>
        </SnackContext.Provider>
      </Box>
      <Snackbar
        open={snackState.open}
        onClose={handleSnackClose}
        autoHideDuration={5000}
      >
        <Alert
          severity={snackState.severity}
          onClose={handleSnackClose}
          elevation={6}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackState.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AppBase;
