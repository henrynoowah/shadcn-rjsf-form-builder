import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'shadcn RJSF Form Builder',
  description: 'shadcn registry for react-jsonschema-form components',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
