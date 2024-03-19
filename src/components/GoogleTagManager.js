// components/GoogleTagManager.js
import Script from 'next/script';

const GoogleTagManager = () => {
 return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-12GJMGDGKQ`}
      />
      <Script strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-12GJMGDGKQ');
        `}
      </Script>
    </>
 );
};

export default GoogleTagManager;
