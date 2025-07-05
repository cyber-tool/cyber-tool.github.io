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
import { useState, createContext, useContext, useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

// Create theme context
const ThemeContext = createContext({
  mode: 'light',
  toggleMode: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

// Enhanced theme with dark mode support
const createAppTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
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
      default: mode === 'light' ? '#fafafa' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    text: {
      primary: mode === 'light' ? '#2c3e50' : '#ffffff',
      secondary: mode === 'light' ? '#7f8c8d' : '#b0b0b0',
    },
    divider: mode === 'light' ? '#e0e0e0' : '#333333',
    action: {
      hover: mode === 'light' ? 'rgba(250, 181, 5, 0.08)' : 'rgba(250, 181, 5, 0.16)',
      selected: mode === 'light' ? 'rgba(250, 181, 5, 0.12)' : 'rgba(250, 181, 5, 0.24)',
    },
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
          boxShadow: mode === 'light' 
            ? '0 2px 8px rgba(250, 181, 5, 0.3)' 
            : '0 2px 8px rgba(250, 181, 5, 0.2)',
          '&:hover': {
            boxShadow: mode === 'light' 
              ? '0 4px 12px rgba(250, 181, 5, 0.4)' 
              : '0 4px 12px rgba(250, 181, 5, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light' 
            ? '0 2px 8px rgba(0, 0, 0, 0.08)' 
            : '0 2px 8px rgba(0, 0, 0, 0.3)',
          border: mode === 'light' 
            ? '1px solid rgba(0, 0, 0, 0.06)' 
            : '1px solid rgba(255, 255, 255, 0.08)',
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
          boxShadow: mode === 'light' 
            ? '0 1px 3px rgba(0, 0, 0, 0.1)' 
            : '0 1px 3px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
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
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as 'light' | 'dark' | null;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  const theme = createAppTheme(mode);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContext.Provider value={{ mode, toggleMode }}>
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
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
