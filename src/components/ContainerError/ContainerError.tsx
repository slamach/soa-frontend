import { Box, Typography } from '@mui/material';

interface ContainerErrorProps {
  errorMessage: string;
}

const ContainerError = (props: ContainerErrorProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Typography variant="h6" component="p">
        {props.errorMessage}
      </Typography>
    </Box>
  );
};

export default ContainerError;
