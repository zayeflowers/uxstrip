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
        <title>UX Strip - Comic series about design, dysfunction, and digital delusions</title>
        <meta name="description" content="A comic series about design, dysfunction, and digital delusions. UX Strip captures the everyday experiences of UX designers with humor and insight." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://uxstrip.com/" />
        <meta property="og:title" content="UX Strip - Comic series about design, dysfunction, and digital delusions" />
        <meta property="og:description" content="A comic series about design, dysfunction, and digital delusions. UX Strip captures the everyday experiences of UX designers with humor and insight." />
        <meta property="og:image" content="https://uxstrip.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://uxstrip.com/" />
        <meta property="twitter:title" content="UX Strip - Comic series about design, dysfunction, and digital delusions" />
        <meta property="twitter:description" content="A comic series about design, dysfunction, and digital delusions. UX Strip captures the everyday experiences of UX designers with humor and insight." />
        <meta property="twitter:image" content="https://uxstrip.com/og-image.jpg" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;275;300;400;500;600;700&family=Montserrat+Subrayada&family=Montserrat:wght@200;275;300;400&family=Comic+Neue:wght@300;400;700&family=Baloo+2:wght@400;500;600;700&family=Fredoka:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <Header />
        <main className="flex-grow bg-[#F6F6F6] w-full">
          <PageTransition>
            <Component {...pageProps} />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </>
  );
}
