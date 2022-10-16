import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link component={NavLink} to="/routes">
            Routes
          </Link>
        </li>
        <li>
          <Link component={NavLink} to="/navigator">
            Navigator
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
