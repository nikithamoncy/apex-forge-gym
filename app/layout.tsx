import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Apex Forge Fitness | Elite Training Facility',
  description: 'Voted #1 Elite Facility. Stop exercising. Start training.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${oswald.variable} font-sans bg-[#050505] text-[#F3F4F6] antialiased overflow-x-hidden`}
      >
        {/* Subtle noise texture overlay representing the tactile, raw feel */}
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        {children}
      </body>
    </html>
  );
}
