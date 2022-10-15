import { NavLink } from 'react-router-dom';
import { Logo, StyledHeader } from './Header.styles';

const Header = () => {
  return (
    <StyledHeader>
      <nav>
        <Logo to="/">SOA Web UI</Logo>
        <ul>
          <li>
            <NavLink to="/routes">Routes</NavLink>
          </li>
          <li>
            <NavLink to="/navigator">Navigator</NavLink>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
