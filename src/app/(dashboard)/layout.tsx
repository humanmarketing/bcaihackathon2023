import { Source_Sans_3 } from 'next/font/google';
import { type Metadata } from 'next/types';
import Header from '~/components/Header';
import StyledComponentsRegistry from '~/lib/registry';
import ThemeProvider from '~/app/theme-provider';
// import { Provider } from '~/context/GlobalContext';


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

  const test = {foo: 'bar'};

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
          <StyledComponentsRegistry>
            <ThemeProvider>
              {/* <Provider value={{ test }}> */}
                <Header minHeight="100px" />
                <main className={sourceSans.className}>{children}</main>
              {/* </Provider> */}
            </ThemeProvider>
          </StyledComponentsRegistry>
      </body>
    </html>
  );
}



// TODO: Wrap theme provider with context
// ADD useGlobal() function
// SEE Brda-next 