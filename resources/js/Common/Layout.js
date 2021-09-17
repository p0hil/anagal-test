import React from 'react';
import Helmet from 'react-helmet';
import Header from '@/Common/Header';
import Footer from '@/Common/Footer';

export default function Layout({ title, children }) {
  return (
    <div>
      <Helmet titleTemplate="%s | Ping CRM" title={title} />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
