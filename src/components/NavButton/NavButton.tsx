import { Button, ButtonProps } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavButton = (props: ButtonProps<typeof NavLink>) => {
  return (
    <Button
      {...props}
      component={NavLink}
      sx={{
        '&:not(.active)': {
          color: 'inherit',
        },
      }}
    >
      {props.children}
    </Button>
  );
};

export default NavButton;
