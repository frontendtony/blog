import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout';
import { ThemeProvider } from '../context/Theme';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <title>FrontendTony</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
