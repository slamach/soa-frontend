import { Box } from '@mui/material';
import Header from '../Header/Header';

interface AppBaseProps {
  children: JSX.Element;
}

const AppBase = (props: AppBaseProps) => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {props.children}
      </Box>
    </>
  );
};

export default AppBase;
