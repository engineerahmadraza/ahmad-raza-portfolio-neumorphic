import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Ahmad Raza | Mechatronics & Control Systems Engineer',
  description:
    'Portfolio of Ahmad Raza — Mechatronics Engineer specializing in Industrial Automation, Embedded Systems, AI/ML, Robotics, and Beverage Line Engineering (KHS, Krones, Tetra Pak). Available for freelance & full-time opportunities.',
  keywords: [
    'Mechatronics Engineer', 'Industrial Automation', 'PLC HMI', 'Embedded Systems',
    'Arduino', 'MATLAB', 'SolidWorks', 'AI ML', 'Pakistan Engineer', 'Freelance Engineer',
  ],
  authors: [{ name: 'Ahmad Raza', url: 'https://www.linkedin.com/in/engineerahmadraza' }],
  openGraph: {
    title: 'Ahmad Raza | Mechatronics Engineer',
    description: 'Beverage Lines • Industrial Automation • Embedded Systems • AI/ML',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-soft)',
                color: 'var(--ink)',
                borderRadius: '14px',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
