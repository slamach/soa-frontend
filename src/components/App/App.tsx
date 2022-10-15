import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './App.styled';
import RoutesPage from '../../pages/Routes/Routes';
import NavigatorPage from '../../pages/Navigator/Navigator';
import AppBase from '../../pages/AppBase/AppBase';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
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
