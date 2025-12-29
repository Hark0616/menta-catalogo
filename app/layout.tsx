import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600'],
  variable: '--font-heading',
  display: 'swap', // Mejora FOUT (Flash of Unstyled Text)
  preload: true,
});

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'MENTA - Productos Naturales',
    template: '%s | MENTA',
  },
  description: 'Descubre productos naturales de Natura y NovaVenta. Cuidado personal y bienestar con ingredientes naturales.',
  keywords: ['productos naturales', 'Natura', 'NovaVenta', 'cuidado personal', 'belleza natural'],
  authors: [{ name: 'MENTA' }],
  creator: 'MENTA',
  publisher: 'MENTA',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://menta-catalogo.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://menta-catalogo.vercel.app',
    title: 'MENTA - Productos Naturales',
    description: 'Descubre productos naturales de Natura y NovaVenta. Cuidado personal y bienestar con ingredientes naturales.',
    siteName: 'MENTA',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
