import React from 'react';
import { ThemeProvider } from '@mui/material';

import { JusticeBoard } from './components/JusticeBoard';
import { theme } from './theme';
import { JusticeDrawer } from './components/JusticeDrawer';

import './index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <JusticeDrawer>
        <JusticeBoard />
      </JusticeDrawer>
    </ThemeProvider>
  );
}

export default App;
