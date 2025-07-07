import { Metadata } from 'next';

export const siteMetadata = {
  title: {
    default: 'Cyber Tool - Free Online Utility Tools',
    template: '%s | Cyber Tool'
  },
  description: 'Free online tools for file conversion, text processing, encoding, hashing, and more. Convert torrent to magnet, remove image backgrounds, generate QR codes, and much more.',
  keywords: [
    'cyber tool',
    'online tools',
    'file converter',
    'text tools',
    'encoding tools',
    'hash generator',
    'QR code generator',
    'password generator',
    'base64 encoder',
    'torrent converter',
    'image background remover',
    'PDF converter',
    'utility tools',
    'web tools',
    'free tools'
  ],
  authors: [{ name: 'Cyber Tool Team' }],
  creator: 'Cyber Tool',
  publisher: 'Cyber Tool',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cyber-tool.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cyber-tool.github.io',
    siteName: 'Cyber Tool',
    title: 'Cyber Tool - Free Online Utility Tools',
    description: 'Free online tools for file conversion, text processing, encoding, hashing, and more. Convert torrent to magnet, remove image backgrounds, generate QR codes, and much more.',
    images: [
      {
        url: '/cyber-tool-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Cyber Tool - Free Online Utility Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Tool - Free Online Utility Tools',
    description: 'Free online tools for file conversion, text processing, encoding, hashing, and more.',
    images: ['/cyber-tool-logo.webp'],
    creator: '@cybertool',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ghVKEJiV908F28Kjsjf3Ipd4TsQ44ZZ33DtOLW3UzYs',
    yahoo: '5CCA6328540B1DC7787D8FEF6D38A268',
  },
  category: 'technology',
  classification: 'utility tools',
  other: {
    'msapplication-TileColor': '#fab505',
    'theme-color': '#fab505',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Cyber Tool',
    'application-name': 'Cyber Tool',
    'mobile-web-app-capable': 'yes',
  },
};

export const generateMetadata = (): Metadata => siteMetadata; 