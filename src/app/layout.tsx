'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from './theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import  GoogleTagManager  from '../components/GoogleTagManager';
import SnackbarProvider from '../components/SnackbarProvider';
import { useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cyber Tool",
  description: "Cyber Tool By Joseph Rasanjana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mode, setMode] = useState('light');
  const theme = getTheme(mode);
  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  return (
    <html lang="en">
      <body className={inter.className}>
      <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
            <header>
              <GoogleTagManager />
              <Header/>
              <button onClick={toggleMode} style={{position:'absolute',top:10,right:10,zIndex:9999,background:'none',border:'none',cursor:'pointer',color:theme.palette.primary.main,fontSize:24}} aria-label="Toggle dark mode">
                {mode === 'light' ? '🌙' : '☀️'}
              </button>
            </header>
              {children}
            <footer>
              <Footer/>
            </footer>
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
