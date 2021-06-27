import { Provider } from 'react-redux';
import store from '../recipes/store';
import Head from 'next/head'

import '../sass/app.scss';

const RecipeFinder = ({ Component, pageProps }) => {

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