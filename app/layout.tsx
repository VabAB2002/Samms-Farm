import type { Metadata } from 'next';
import './globals.css';
import Providers from './Providers';
import { Caveat, Architects_Daughter } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
});

const architectsDaughter = Architects_Daughter({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-architects-daughter',
});

export const metadata: Metadata = {
  title: "Samm's Farm",
  description: 'A rustic farm experience with sustainable practices and authentic experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${caveat.variable} ${architectsDaughter.variable}`}>
      <body className="min-h-screen">
        <Providers>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
