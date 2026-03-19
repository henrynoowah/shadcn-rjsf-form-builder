import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'shadcn RJSF Form Builder',
  description: 'shadcn registry for react-jsonschema-form components',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
