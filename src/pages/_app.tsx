import { DefaultSeo } from 'next-seo';
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
        <DefaultSeo
          openGraph={{
            type: 'website',
            title: 'Frontend Issues',
            description: 'Articles on all things frontend development',
            profile: {
              firstName: 'Anthony',
              lastName: 'Oyathelemhi',
              gender: 'male'
            },
            locale: 'en_US',
            url: 'https://blog.oghie.dev/'
          }}
          twitter={{
            handle: '@frontendtony'
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
