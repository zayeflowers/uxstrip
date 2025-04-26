import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>UX Strip - Comics for UX Designers</title>
        <meta name="description" content="A comic archive for UX-related comics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
