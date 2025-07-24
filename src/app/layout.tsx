// src/app/layout.tsx
import "./../styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./../theme/theme";
import React from "react";
import Providers from "@/components/Providers";
import PokeballAnimation from "@/components/PokeballAnimation";

export const metadata: Metadata = {
  title: "Pokedeck",
  description: "A pack of Pokemon cards",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale} dir='ltr'>
      <head>
        <link rel="icon" type="image/svg+xml" href="/utils/pokeball.svg" />
      </head>
      <body>
        <PokeballAnimation />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
