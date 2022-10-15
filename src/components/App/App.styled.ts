import styled, { createGlobalStyle } from 'styled-components';
import RobotoRegular from '../../assets/fonts/Roboto-Regular.woff2';
import RobotoMedium from '../../assets/fonts/Roboto-Medium.woff2';

const breakpoints = {
  main: 1280,
};

export const theme = {
  breakpoints,
  fonts: {
    bodyMedium: `
      font-size: 14px;
      line-height: 20px;
    `,
    titleLarge: `
      font-size: 22px;
      line-height: 28px;
    `,
    headlineMedium: `
      font-size: 28px;
      line-height: 36px;
    `,
  },
  colors: {
    primary: '#D0BCFF',
    background: '#1C1B1F',
    onBackground: '#E6E1E5',
  },
  misc: {},
};

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: url('${RobotoRegular}') format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-display: block;
    src: url('${RobotoMedium}') format('woff2');
  }


  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    width: ${theme.breakpoints.main}px;
    min-height: 100%;
    margin: 0;
    overflow-x: hidden;
    font-family: Roboto, Arial, sans-serif;
    ${theme.fonts.bodyMedium};
    color: ${theme.colors.onBackground};
    background-color: ${theme.colors.background};
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

  a {
    color: inherit;
    text-decoration: none;
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
