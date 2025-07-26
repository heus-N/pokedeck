// src/theme/theme.ts
'use client'
import { createTheme } from '@mui/material/styles';
import { Russo_One } from 'next/font/google';

const russoOne = Russo_One({
  subsets: ['latin'],
  weight: '400',
});


const theme = createTheme({
  palette: {
    mode: 'dark', // ou 'dark'
    background: {
      default: '#222831',
    },

    text: {
      primary: '#000000',
      secondary: '#f7f7f7',
    }
  },
  typography: {
    fontFamily: `${russoOne.style.fontFamily}, Roboto, sans-serif`,
    h1: { fontSize: '2rem', fontWeight: 600 },
    h2: { fontSize: '1.5rem', fontWeight: 500 },
    h3: { fontSize: '1.25rem', fontWeight: 400 },
    h4: { fontSize: '0.875rem', fontWeight: 400 },
    body1: { fontSize: '1rem' },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.5))',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          pointerEvents: 'none',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          color: '#f7f7f7',
        },
        popupIndicator: {
          color: '#f7f7f7',
        },
        clearIndicator: {
          color: '#f7f7f7',
        },
        paper: {
          backgroundColor: '#1e1e1e',
          color: '#f7f7f7',
        },
        listbox: {
          backgroundColor: '#1e1e1e',
          color: '#f7f7f7',
        },
        option: {
          '&[aria-selected="true"]': {
            backgroundColor: '#333',
          },
          '&:hover': {
            backgroundColor: '#444',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          borderRadius: '12px',
          '& .MuiOutlinedInput-root': {
              color: '#f7f7f7',
            '& fieldset': {
              borderColor: '#f7f7f7',
              transition: 'all 0.5s ease',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(33, 150, 243, 1)',
              boxShadow: '0px 0px 5px rgba(33, 150, 243, 1)'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(33, 150, 243, 1)',
              boxShadow: '0px 0px 5px rgba(33, 150, 243, 1)'
            },
          },
        },
      },
    },
  },
});

export default theme;
