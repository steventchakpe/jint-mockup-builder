import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'Jint Builder',
  description: 'Générateur de démos SharePoint pour les équipes Sales & CSM',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <head>
        {/* Police Geist — chrome d'application (dashboard + barre d'édition, charte Jint). */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.0.3/dist/fonts/geist-sans/style.css" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
