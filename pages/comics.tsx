import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedCard from '../components/AnimatedCard';
import SEO from '../components/SEO';
import { getAllComicsWithMetadata, ComicData } from '../utils/comicUtils';

interface ComicsPageProps {
  comics: ComicData[];
  currentPage: number;
  totalPages: number;
  totalComics: number;
}

export default function ComicsPage({ comics, currentPage, totalPages, totalComics }: ComicsPageProps) {
  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEO
        title="Comics | UX Strip"
        description="Browse all UX Strip comics. A comic series about design, dysfunction, and digital delusions."
      />
      <div className="container mx-auto px-2 py-1 md:py-8">
        <h1 className="text-2xl uppercase font-bold tracking-wider text-center mb-2 md:mb-8">
          Comics
        </h1>

        <div className="flex flex-col gap-4 md:gap-16 max-w-4xl mx-auto">
          {comics.length > 0 ? (
            comics.map((comic, index) => {
              return (
                <AnimatedCard key={comic.path} delay={index * 0.1}>
                  <div className="mb-0.5">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <Link href={`/comics/${comic.id}`} className="block">
                        <div className="relative" style={{ height: '425px', maxHeight: '70vh', minHeight: '305px' }}>
                          <Image
                            src={comic.path}
                            alt={`UX Strip Issue ${comic.number}`}
                            fill
                            sizes="100vw"
                            className="object-contain"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="mt-0.5 text-right">
                      <h2 className="text-base font-bold">Issue #{comic.number}</h2>
                    </div>
                  </div>
                </AnimatedCard>
              );
            })
          ) : (
            <div className="text-center py-12 border border-gray-200 rounded-lg">
              <p className="text-gray-500 text-lg">No comics found. Check back soon!</p>
              <p className="text-gray-400 mt-2">
                Add comic images to the /public/comics folder to see them here.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 md:mt-8 mb-2 md:mb-4">
            <div className="flex items-center space-x-1 md:space-x-2">
              {currentPage > 1 && (
                <Link
                  href={`/comics/page/${currentPage - 1}`}
                  className="px-1.5 py-0.5 md:px-4 md:py-2 text-xs md:text-base bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors"
                >
                  ← Previous
                </Link>
              )}

              <div className="px-1 md:px-3 py-0.5 md:py-1.5 text-xs md:text-sm font-medium">
                Page {currentPage} of {totalPages}
              </div>

              {currentPage < totalPages && (
                <Link
                  href={`/comics/page/${currentPage + 1}`}
                  className="px-1.5 py-0.5 md:px-4 md:py-2 text-xs md:text-base bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors"
                >
                  Next →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const comicsDirectory = path.join(process.cwd(), 'public/comics');
  const COMICS_PER_PAGE = 7;
  const currentPage = 1; // Default to page 1 for the main comics page

  // Check if directory exists
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(comicsDirectory);
  } catch (error) {
    console.error('Error reading comics directory:', error);
  }

  // Filter for image files only and reverse the order (newest first)
  const filteredComics = filenames
    .filter(filename => {
      const extension = filename.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
    })
    // Sort by filename in reverse order (assuming filenames are sortable)
    .sort((a, b) => b.localeCompare(a));

  // Calculate total number of comics
  const totalComics = filteredComics.length;

  // Map to full paths
  const allComicPaths = filteredComics.map(filename => `/comics/${filename}`);

  // Get comics with metadata
  const allComicsWithMetadata = getAllComicsWithMetadata(allComicPaths);

  // Calculate total pages
  const totalPages = Math.ceil(allComicsWithMetadata.length / COMICS_PER_PAGE);

  // Get comics for current page
  const startIndex = (currentPage - 1) * COMICS_PER_PAGE;
  const endIndex = startIndex + COMICS_PER_PAGE;
  const comics = allComicsWithMetadata.slice(startIndex, endIndex);

  return {
    props: {
      comics,
      currentPage,
      totalPages,
      totalComics,
    },
  };
};
