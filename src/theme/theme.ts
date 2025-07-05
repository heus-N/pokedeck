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
    }
  },
});

export default theme;
