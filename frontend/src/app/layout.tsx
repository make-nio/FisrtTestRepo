import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'La Pizzería',
  description: 'Nuestra carta',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-stone-50 text-stone-800 font-serif">{children}</body>
    </html>
  );
}
