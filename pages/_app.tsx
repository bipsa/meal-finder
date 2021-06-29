import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../recipes/store';
import Head from 'next/head'

import '../sass/app.scss';

const RecipeFinder = ({ Component, pageProps }) => {

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    }
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>Recipe finder</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default RecipeFinder;