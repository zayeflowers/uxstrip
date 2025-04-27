import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'UX Strip - Comic series about design, dysfunction, and digital delusions',
  description = 'A comic series about design, dysfunction, and digital delusions. UX Strip captures the everyday experiences of UX designers with humor and insight.',
  ogImage = 'https://uxstrip.com/og-image.jpg',
  url = 'https://uxstrip.com',
}) => {
  const fullTitle = title.includes('UX Strip') ? title : `${title} | UX Strip`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Head>
  );
};

export default SEO;
