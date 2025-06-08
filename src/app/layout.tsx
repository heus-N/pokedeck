// src/app/layout.tsx
import "../styles/globals.css"; // ajuste o caminho se necessário
import type { Metadata } from "next";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme/theme"; // ajuste o caminho se necessário
import React from "react";

export const metadata: Metadata = {
  title: "Pokedeck",
  description: "A pack of Pokemon cards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
