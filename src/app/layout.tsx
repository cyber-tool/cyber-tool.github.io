'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import  GoogleTagManager  from '../components/GoogleTagManager';
import SnackbarProvider from '../components/SnackbarProvider';
import { useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

// Enhanced theme with better colors and typography
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fab505',
      light: '#ffd54f',
      dark: '#f57f17',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6b35',
      light: '#ff8a65',
      dark: '#d84315',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0 2px 8px rgba(250, 181, 5, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(250, 181, 5, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mode, setMode] = useState('light');
  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouterCacheProvider>
            <SnackbarProvider>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                  backgroundColor: 'background.default',
                }}
              >
                <Header />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    py: 3,
                    px: { xs: 2, sm: 3 },
                    backgroundColor: 'background.default',
                  }}
                >
                  {children}
                </Box>
                <Footer />
              </Box>
            </SnackbarProvider>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
