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
          overflow: 'unset',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'white',
          // overflow: 'unset',
          color: 'black',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
  },
});
