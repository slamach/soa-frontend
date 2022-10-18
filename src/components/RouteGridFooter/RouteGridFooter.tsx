import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  GridFooter,
  GridFooterContainer,
  GridFooterContainerProps,
} from '@mui/x-data-grid';

interface RouteGridFooterProps extends GridFooterContainerProps {
  handleClick: () => void;
}

const RouteGridFooter = (props: RouteGridFooterProps) => {
  const { handleClick, ...containerProps } = props;
  return (
    <GridFooterContainer {...containerProps}>
      <Box sx={{ pl: 1 }}>
        <Button onClick={props.handleClick}>Add new route</Button>
      </Box>
      <GridFooter sx={{ border: 'none' }} />
    </GridFooterContainer>
  );
};

export default RouteGridFooter;
