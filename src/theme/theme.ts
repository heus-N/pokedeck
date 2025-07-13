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
      secondary: '#F7F7F7',
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
          color: '#fff',
        },
        popupIndicator: {
          color: '#fff',
        },
        clearIndicator: {
          color: '#fff',
        },
        paper: {
          backgroundColor: '#1e1e1e',
          color: '#fff',
        },
        listbox: {
          backgroundColor: '#1e1e1e',
          color: '#fff',
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
             color: '#ffffff',
            '& fieldset': {
              borderColor: '#ccc',
            },
            '&:hover fieldset': {
              borderColor: '#999',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          },
        },
      },
    },
  },
});

export default theme;
