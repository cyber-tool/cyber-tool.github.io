import Head from 'next/head';

export default function CustomHead() {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>Cyber Tool - Free Online Utility Tools</title>
      <meta name="description" content="Free online tools for file conversion, text processing, encoding, hashing, and more. Convert torrent to magnet, remove image backgrounds, generate QR codes, and much more." />
      <meta name="keywords" content="cyber tool, online tools, file converter, text tools, encoding tools, hash generator, QR code generator, password generator, base64 encoder, torrent converter, image background remover, PDF converter, utility tools, web tools, free tools" />
      <meta name="author" content="Cyber Tool Team" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Cyber Tool - Free Online Utility Tools" />
      <meta property="og:description" content="Free online tools for file conversion, text processing, encoding, hashing, and more. Convert torrent to magnet, remove image backgrounds, generate QR codes, and much more." />
      <meta property="og:url" content="https://cyber-tool.github.io" />
      <meta property="og:site_name" content="Cyber Tool" />
      <meta property="og:image" content="https://cyber-tool.github.io/cyber-tool-logo.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Cyber Tool - Free Online Utility Tools" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Cyber Tool - Free Online Utility Tools" />
      <meta name="twitter:description" content="Free online tools for file conversion, text processing, encoding, hashing, and more." />
      <meta name="twitter:image" content="https://cyber-tool.github.io/cyber-tool-logo.webp" />
      <meta name="twitter:creator" content="@cybertool" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#fab505" />
      <meta name="msapplication-TileColor" content="#fab505" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Cyber Tool" />
      <meta name="application-name" content="Cyber Tool" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://cyber-tool.github.io" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Favicon and app icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/cyber-tool-logo.webp" />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Cyber Tool",
            "description": "Free online tools for file conversion, text processing, encoding, hashing, and more.",
            "url": "https://cyber-tool.github.io",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "Cyber Tool Team"
            },
            "creator": {
              "@type": "Organization",
              "name": "Cyber Tool"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Cyber Tool"
            },
            "featureList": [
              "File conversion tools",
              "Text processing utilities",
              "Encoding and decoding tools",
              "Hash generation",
              "QR code generation",
              "Password generation",
              "Image background removal",
              "PDF conversion tools"
            ]
          })
        }}
      />
      
      {/* Google Site Verification - Replace with your actual verification code */}
      <meta name="google-site-verification" content="ghVKEJiV908F28Kjsjf3Ipd4TsQ44ZZ33DtOLW3UzYs" />
      
      {/* Yahoo Verification - Replace with your actual verification code */}
      <meta name="msvalidate.01" content="5CCA6328540B1DC7787D8FEF6D38A268" />
    </Head>
  );
} 