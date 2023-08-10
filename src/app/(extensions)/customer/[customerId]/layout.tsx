import { Source_Sans_3 } from 'next/font/google';
import { type Metadata } from 'next/types';
import StyledComponentsRegistry from '~/lib/registry';
import ThemeProvider from '~/app/theme-provider';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
});

export const metadata: Metadata = { title: 'Ecommerce Copilot AI' };

export default function CustomerExtensionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
