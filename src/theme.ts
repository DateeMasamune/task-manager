import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'cursive',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'black',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'black',
          color: 'white',
        },
      },
    },
  },
});
