import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout';
import { ThemeProvider } from '../context/Theme';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          site_name: 'Anthony Oyathelemhi',
          title: 'Anthony Oyathelemhi - Software Developer',
          description: 'Frontend Developer, Typescript and all things React',
          profile: {
            firstName: 'Anthony',
            lastName: 'Oyathelemhi',
            gender: 'male',
          },
          images: [
            {
              url: '/images/opengraph.jpg',
              alt: 'Anthony Oyathelemhi, Software Engineer',
              width: 1200,
              height: 627,
            },
          ],
          locale: 'en_US',
          url: 'https://frontendtony.com/',
        }}
        twitter={{
          handle: '@frontendtony',
          site: '@frontendtony',
          cardType: 'summary_large_image',
        }}
      />
      <ThemeProvider>
        <Head>
          <title>Anthony Oyathelemhi - Software Developer</title>
          <meta name="description" content="Frontend Developer, Typescript and all things React" />

          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
          <meta name="theme-color" content="#ffffff"></meta>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
