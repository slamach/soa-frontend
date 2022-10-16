import { createTheme, css } from '@mui/material/styles';
import RobotoLight from '../../assets/fonts/Roboto-Light.woff2';
import RobotoRegular from '../../assets/fonts/Roboto-Regular.woff2';
import RobotoMedium from '../../assets/fonts/Roboto-Medium.woff2';
import RobotoBold from '../../assets/fonts/Roboto-Bold.woff2';

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const globalStyles = css`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-display: block;
    src: url('${RobotoLight}') format('woff2');
  }

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

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: block;
    src: url('${RobotoBold}') format('woff2');
  }

  html,
  body,
  #root {
    height: 100%;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    width: 1280px;
    margin-left: auto;
    margin-right: auto;
    overflow-x: hidden;
  }

  img,
  svg {
    max-width: 100%;
    height: auto;
  }
`;
