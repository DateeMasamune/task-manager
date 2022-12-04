import React from 'react';
import { ThemeProvider } from '@mui/material';

import { theme } from './theme';
import { JusticeBoardRoutes } from './components/JusticeBoardRoutes';

import './index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <JusticeBoardRoutes />
    </ThemeProvider>
  );
}

export default App;
