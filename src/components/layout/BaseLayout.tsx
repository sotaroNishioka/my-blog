import React from 'react';
import Header from './Header';
import Footer from './Footer';

type BaseLayoutProps = {
  children: React.ReactNode;
  siteTitle?: string; // Header に渡すため
};

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children, siteTitle }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header siteTitle={siteTitle} />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
