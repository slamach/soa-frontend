import styled, { createGlobalStyle } from 'styled-components';

const breakpoints = {
  large: 1280,
  medium: 768,
  small: 360,
};

export const theme = {
  breakpoints,
  media: {
    largeOnly: `screen and (min-width: ${breakpoints.large}px)`,
    medium: `screen and (max-width: ${breakpoints.large - 1}px)`,
    small: `screen and (max-width: ${breakpoints.medium - 1}px)`,
  },
  fonts: {},
  colors: {},
  misc: {},
};

export const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    min-width: ${theme.breakpoints.small}px;
    min-height: 100%;
    margin: 0;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  #root {
    height: 100%;
    overflow-x: hidden;
  }

  img,
  svg {
    max-width: 100%;
    height: auto;
  }
`;

export const VisuallyHidden = styled.p`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip: rect(0 0 0 0);
`;
