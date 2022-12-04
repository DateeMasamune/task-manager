import React from 'react';
import { ThemeProvider } from '@mui/material';

import { theme } from './theme';
import { JusticeBoardRoutes } from './components/JusticeBoardRoutes';

import './index.css';
import { JusticeTaskManagerContextProvider } from './components/JusticeTaskManagerContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <JusticeTaskManagerContextProvider>
        <JusticeBoardRoutes />
      </JusticeTaskManagerContextProvider>
    </ThemeProvider>
  );
}

export default App;
