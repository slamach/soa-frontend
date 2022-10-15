import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Logo = styled(Link)`
  ${({ theme }) => theme.fonts.headlineMedium};
  user-select: none;
`;

export const StyledHeader = styled.header`
  padding: 15px 20px;

  nav {
    display: flex;
    align-items: center;
  }

  ${Logo} {
    margin-right: 40px;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 15px;
    ${({ theme }) => theme.fonts.titleLarge};
    list-style: none;
  }

  a.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
