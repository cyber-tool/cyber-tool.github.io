import React from 'react';
import Footer from './services/Footer'; // Import your Footer component
import Header from './services/Header'; // Optionally, import your Header component

const Layout = ({ children }) => {
  return (
    <>
      {/* Uncomment if you have a Header component */}
      <Header />
      <main>{children}</main>
      <Footer/>
    </>
  );
};

export default Layout;
