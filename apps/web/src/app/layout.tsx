import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stock Management System',
  description: 'Textile manufacturing and trading management system',
  icons: {
    icon: '/img/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Google Fonts - Poppins (must load before other CSS) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        {/* Geex Template CSS */}
        <link rel="stylesheet" href="/css/style.css" />
        {/* Unicons (Icon Library used by Geex) */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/@iconscout/unicons@4.0.8/css/line.min.css" 
        />
      </head>
      <body className="geex-dashboard">
        {children}
      </body>
    </html>
  );
}
