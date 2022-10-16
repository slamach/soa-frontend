import { Routes, Route, Navigate } from 'react-router-dom';
import { globalStyles, theme } from './App.styled';
import RoutesPage from '../../pages/Routes/Routes';
import NavigatorPage from '../../pages/Navigator/Navigator';
import AppBase from '../AppBase/AppBase';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { CssBaseline } from '@mui/material';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <AppBase>
        <Routes>
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/navigator" element={<NavigatorPage />} />
          <Route path="*" element={<Navigate to="/routes" />} />
        </Routes>
      </AppBase>
    </ThemeProvider>
  );
};

export default App;
