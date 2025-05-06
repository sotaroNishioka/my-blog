import React from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
  siteTitle?: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, siteTitle }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header siteTitle={siteTitle} />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
