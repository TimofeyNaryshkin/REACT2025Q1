import ContextProvider from '@/components/ContextProvider';
import Layout from '@/components/Layout';
import type { Metadata } from 'next';
import 'App.css'

export const metadata: Metadata = {
  title: 'Home',
  description: 'SW starships',
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Layout>{children}</Layout>
        </ContextProvider>
      </body>
    </html>
  );
}
