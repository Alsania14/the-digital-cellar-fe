import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';
import { Notifications } from '@mantine/notifications';
import NextAdapterPages from 'next-query-params/pages';
import { QueryParamProvider } from 'use-query-params';
import { theme } from '../theme';
import { SignatureContainerProvider } from '@/src/core/ioc/signature-container-context.ioc';
import { SignatureContainer } from '@/src/core/ioc/signature.ioc';
import '@mantine/notifications/styles.css';

const queryClient = new QueryClient();
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <QueryParamProvider adapter={NextAdapterPages}>
        <SignatureContainerProvider container={SignatureContainer}>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <Head>
              <title>THE DIGITAL CELLAR FE</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
              />
              <link rel="shortcut icon" href="/favicon.svg" />
            </Head>
            {getLayout(<Component {...pageProps} />)}
            <Notifications position="top-right" />
          </MantineProvider>
        </SignatureContainerProvider>
      </QueryParamProvider>
    </QueryClientProvider>
  );
}
