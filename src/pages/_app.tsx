import 'bootstrap/dist/css/bootstrap.min.css';

import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '@lib/db';

export default function App({ Component, pageProps }: AppProps) {
  // Leveraging useEffect to load bootstrap JS
  useEffect(() => {
    // eslint-disable-next-line global-require
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return <ApolloProvider client={client}><Component {...pageProps} /></ApolloProvider>;
}
