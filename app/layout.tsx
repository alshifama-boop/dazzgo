import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DAZZGO | Technology that moves your business forward',
  description: 'Explore DAZZGO web and app development, IT consulting, AI automation, software products, and digital marketing services.',
  openGraph: {
    title: 'DAZZGO | Technology that moves your business forward',
    description: 'Practical digital solutions for ambitious businesses.',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
