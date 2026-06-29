import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';

import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

import './_styles/globals.css';
import Header from './_components/Header';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s / The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Italian Domolimites, surrounded by beautiful mountains and dark forests',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-gray-50 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
