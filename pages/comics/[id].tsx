import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SEO from '../../components/SEO';
import ShareButtons from '../../components/ShareButtons';
import FloatingShareButton from '../../components/FloatingShareButton';
import { getComicMetadata, ComicMetadata } from '../../utils/comicUtils';

interface ComicPageProps {
  comic: string;
  prevComic: string | null;
  nextComic: string | null;
  comicNumber: number;
  metadata: ComicMetadata;
}

export default function ComicPage({ comic, prevComic, nextComic, comicNumber, metadata }: ComicPageProps) {
  const comicId = comic.split('/').pop()?.split('.')[0];
  const [shareUrl, setShareUrl] = useState<string>('');

  useEffect(() => {
    // Set the share URL once the component is mounted
    setShareUrl(`${window.location.origin}/comics/${comicId}`);
  }, [comicId]);

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEO
        title={`Issue #${comicNumber} | UX Strip`}
        description={`View UX Strip Issue #${comicNumber}. A comic series about design, dysfunction, and digital delusions.`}
        ogImage={`https://uxstrip.com${comic}`}
      />
      {shareUrl && (
        <FloatingShareButton
          url={shareUrl}
          title={`UX Strip - Issue #${comicNumber}`}
          description={metadata.description || `A comic series about design, dysfunction, and digital delusions.`}
        />
      )}
      <div className="container mx-auto px-2 py-0 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Comic Display */}
          <div className="mb-1 md:mb-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative" style={{ height: '790px', maxHeight: '85vh', minHeight: '405px' }}>
                <Image
                  src={comic}
                  alt={`UX Strip Issue ${comicNumber}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="mt-0.5 text-right">
              <h2 className="text-base font-bold">Issue #{comicNumber}</h2>
              {metadata.publishedDate && (
                <p className="text-xs text-gray-600">Published: {metadata.publishedDate}</p>
              )}
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mb-2 md:mb-4 bg-white p-1.5 rounded-lg shadow-sm">
            <h3 className="text-sm font-bold mb-0.5">Share this comic</h3>
            {shareUrl && (
              <ShareButtons
                url={shareUrl}
                title={`UX Strip - Issue #${comicNumber}`}
                description={metadata.description || `A comic series about design, dysfunction, and digital delusions.`}
                iconSize={28}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-2 md:mt-6 mb-1">
            {prevComic ? (
              <Link
                href={`/comics/${prevComic.split('/').pop()?.split('.')[0]}`}
                className="px-1.5 py-0.5 md:px-4 md:py-2 text-xs md:text-base bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors"
              >
                ← Previous
              </Link>
            ) : (
              <div className="px-1.5 py-0.5 md:px-4 md:py-2 text-xs md:text-base bg-white text-gray-400 font-medium border border-gray-300 rounded-md cursor-not-allowed">
                ← Previous
              </div>
            )}

            <Link
              href="/comics"
              className="px-1.5 py-0.5 md:px-4 md:py-2 text-xs md:text-base bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors"
            >
              All Comics
            </Link>

            {nextComic ? (
              <Link
                href={`/comics/${nextComic.split('/').pop()?.split('.')[0]}`}
                className="px-1.5 py-0.5 md:px-4 md:py-2 text-xs md:text-base bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors"
              >
                Next →
              </Link>
            ) : (
              <div className="px-1.5 py-0.5 md:px-4 md:py-2 text-xs md:text-base bg-white text-gray-400 font-medium border border-gray-300 rounded-md cursor-not-allowed">
                Next →
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const comicsDirectory = path.join(process.cwd(), 'public/comics');

  // Check if directory exists
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(comicsDirectory);
  } catch (error) {
    console.error('Error reading comics directory:', error);
  }

  // Filter for image files only
  const comicFilenames = filenames.filter(filename => {
    const extension = filename.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
  });

  // Create paths for each comic
  const paths = comicFilenames.map(filename => ({
    params: { id: filename.split('.')[0] },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const comicsDirectory = path.join(process.cwd(), 'public/comics');

  // Check if directory exists
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(comicsDirectory);
  } catch (error) {
    console.error('Error reading comics directory:', error);
  }

  // Filter for image files only and sort in reverse order (newest first)
  const comicFilenames = filenames
    .filter(filename => {
      const extension = filename.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
    })
    .sort((a, b) => b.localeCompare(a));

  // Find the current comic
  const currentComicFilename = comicFilenames.find(
    filename => filename.split('.')[0] === params?.id
  );

  if (!currentComicFilename) {
    return {
      notFound: true,
    };
  }

  // Find the index of the current comic
  const currentIndex = comicFilenames.indexOf(currentComicFilename);

  // Calculate the comic number (total comics - index)
  // Since we sorted newest first, the first comic (index 0) should be the highest number
  const comicNumber = comicFilenames.length - currentIndex;

  // Get previous and next comics (reversed because we sorted newest first)
  const nextComic = currentIndex > 0
    ? `/comics/${comicFilenames[currentIndex - 1]}`
    : null;

  const prevComic = currentIndex < comicFilenames.length - 1
    ? `/comics/${comicFilenames[currentIndex + 1]}`
    : null;

  // Get comic metadata
  const comicId = currentComicFilename.split('.')[0];
  const metadata = getComicMetadata(comicId);

  return {
    props: {
      comic: `/comics/${currentComicFilename}`,
      prevComic,
      nextComic,
      comicNumber,
      metadata,
    },
  };
};
