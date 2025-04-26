import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

interface ComicPageProps {
  comic: string;
  prevComic: string | null;
  nextComic: string | null;
}

export default function ComicPage({ comic, prevComic, nextComic }: ComicPageProps) {
  const comicId = comic.split('/').pop()?.split('.')[0];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Comic Display */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md mb-8">
            <div className="relative" style={{ height: '800px' }}>
              <Image
                src={comic}
                alt={`UX Strip Comic ${comicId}`}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            {prevComic ? (
              <Link
                href={`/comics/${prevComic.split('/').pop()?.split('.')[0]}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                ← Previous
              </Link>
            ) : (
              <div className="px-4 py-2 text-gray-400 cursor-not-allowed">
                ← Previous
              </div>
            )}

            <Link
              href="/comics"
              className="px-4 py-2 text-textDark hover:underline"
            >
              All Comics
            </Link>

            {nextComic ? (
              <Link
                href={`/comics/${nextComic.split('/').pop()?.split('.')[0]}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Next →
              </Link>
            ) : (
              <div className="px-4 py-2 text-gray-400 cursor-not-allowed">
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
  
  // Filter for image files only
  const comicFilenames = filenames.filter(filename => {
    const extension = filename.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
  });
  
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
  
  // Get previous and next comics
  const prevComic = currentIndex > 0 
    ? `/comics/${comicFilenames[currentIndex - 1]}` 
    : null;
    
  const nextComic = currentIndex < comicFilenames.length - 1 
    ? `/comics/${comicFilenames[currentIndex + 1]}` 
    : null;
  
  return {
    props: {
      comic: `/comics/${currentComicFilename}`,
      prevComic,
      nextComic,
    },
  };
};
