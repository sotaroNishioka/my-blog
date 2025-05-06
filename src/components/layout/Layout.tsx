import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, DEFAULT_OG_IMAGE_URL } from '@/lib/constants';

type LayoutProps = {
  children: React.ReactNode;
  siteTitle?: string;
  pageTitle?: string;
  description?: string;
  ogImageUrl?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article';
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  siteTitle = SITE_TITLE,
  pageTitle,
  description,
  ogImageUrl,
  ogUrl,
  ogType = 'website',
}) => {
  const displayTitle = pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE;
  const currentDescription = description || SITE_DESCRIPTION;
  const currentOgImageUrl = ogImageUrl || DEFAULT_OG_IMAGE_URL;
  const currentOgUrl = ogUrl || SITE_URL;

  return (
    <>
      <Head>
        <title>{displayTitle}</title>
        <meta name="description" content={currentDescription} />
        <meta property="og:site_name" content={SITE_TITLE} />
        <meta property="og:title" content={pageTitle || SITE_TITLE} />
        <meta property="og:description" content={currentDescription} />
        <meta property="og:url" content={currentOgUrl} />
        <meta property="og:type" content={ogType} />
        <meta property="og:image" content={currentOgImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle || SITE_TITLE} />
        <meta name="twitter:description" content={currentDescription} />
        <meta name="twitter:image" content={currentOgImageUrl} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header siteTitle={siteTitle} />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
