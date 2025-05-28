// src/theme/theme.ts
'use client'

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // ou 'dark'
    background: {
      default: '#222831',
    },
    text: {
      primary: '#EEEEEE', // Cor primária do texto
      secondary: '#76ABAE', // Cor secundária do texto
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 600 },
    h2: { fontSize: '1.5rem', fontWeight: 500 },
    body1: { fontSize: '1rem' },
    // Adicione mais como quiser
  },
});

export default theme;
