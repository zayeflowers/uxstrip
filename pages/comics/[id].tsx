import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '../../components/SEO';

interface ComicPageProps {
  comic: string;
  prevComic: string | null;
  nextComic: string | null;
  comicNumber: number;
}

export default function ComicPage({ comic, prevComic, nextComic, comicNumber }: ComicPageProps) {
  const comicId = comic.split('/').pop()?.split('.')[0];

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEO
        title={`Issue #${comicNumber} | UX Strip`}
        description={`View UX Strip Issue #${comicNumber}. A comic series about design, dysfunction, and digital delusions.`}
        ogImage={`https://uxstrip.com${comic}`}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8">Issue #{comicNumber}</h1>
          {/* Comic Display */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
            <div className="relative" style={{ height: '800px' }}>
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

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            {prevComic ? (
              <Link
                href={`/comics/${prevComic.split('/').pop()?.split('.')[0]}`}
                className="px-6 py-3 bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors"
              >
                ← Previous
              </Link>
            ) : (
              <div className="px-6 py-3 bg-white text-gray-400 font-medium border border-gray-300 rounded-md cursor-not-allowed">
                ← Previous
              </div>
            )}

            <Link
              href="/comics"
              className="px-6 py-3 bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors"
            >
              All Comics
            </Link>

            {nextComic ? (
              <Link
                href={`/comics/${nextComic.split('/').pop()?.split('.')[0]}`}
                className="px-6 py-3 bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors"
              >
                Next →
              </Link>
            ) : (
              <div className="px-6 py-3 bg-white text-gray-400 font-medium border border-gray-300 rounded-md cursor-not-allowed">
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

  // Calculate the comic number (1-based index)
  const comicNumber = currentIndex + 1;

  // Get previous and next comics (reversed because we sorted newest first)
  const nextComic = currentIndex > 0
    ? `/comics/${comicFilenames[currentIndex - 1]}`
    : null;

  const prevComic = currentIndex < comicFilenames.length - 1
    ? `/comics/${comicFilenames[currentIndex + 1]}`
    : null;

  return {
    props: {
      comic: `/comics/${currentComicFilename}`,
      prevComic,
      nextComic,
      comicNumber,
    },
  };
};
