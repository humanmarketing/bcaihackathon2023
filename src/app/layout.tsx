import { Source_Sans_3 } from 'next/font/google';
import { type Metadata } from 'next/types';
import Header from '~/components/Header';
import StyledComponentsRegistry from '~/lib/registry';
import ThemeProvider from './theme-provider';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
});

export const metadata: Metadata = { title: 'Ecommerce Copilot AI' };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <Header minHeight="150px" />
            <main className={sourceSans.className}>{children}</main>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
