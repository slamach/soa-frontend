import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import NavButton from '../NavButton/NavButton';

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              mr: 4,
              letterSpacing: '.3rem',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            SOA
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ m: 0, p: 0, listStyle: 'none' }}
          >
            <li>
              <NavButton to="/routes">Routes</NavButton>
            </li>
            <li>
              <NavButton to="/navigator">Navigator</NavButton>
            </li>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
