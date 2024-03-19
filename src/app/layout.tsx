import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import  GoogleTagManager  from '../components/GoogleTagManager';

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
  return (
    <html lang="en">
      <body className={inter.className}>
      <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <header>
              <GoogleTagManager />
              <Header/>
            </header>
              {children}
            <footer>
              <Footer/>
            </footer>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
