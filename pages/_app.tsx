import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>UX Strip - Comics for UX Designers</title>
        <meta name="description" content="A comic archive for UX-related comics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;275;300;400;500;600;700&family=Montserrat+Subrayada&family=Montserrat:wght@200;275;300;400&family=Comic+Neue:wght@300;400;700&family=Baloo+2:wght@400;500;600;700&family=Fredoka:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <PageTransition>
            <Component {...pageProps} />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </>
  );
}
