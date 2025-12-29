import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600'],
  variable: '--font-heading'
});

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'MENTA - Productos Naturales',
  description: 'Descubre productos naturales de Natura y NovaVenta. Cuidado personal y bienestar con ingredientes naturales.',
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
      </body>
    </html>
  );
}
