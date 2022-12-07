import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
  // eslint-disable-next-line no-unused-vars
  interface ButtonPropsVariantOverrides {
    black: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
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
          overflow: 'unset',
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
    MuiButton: {
      variants: [
        {
          props: { variant: 'black' },
          style: {
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#01074f',
            },
          },
        },
      ],
    },
  },
});
