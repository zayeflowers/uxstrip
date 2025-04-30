import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedCard from '../../../components/AnimatedCard';
import SEO from '../../../components/SEO';
import { getAllComicsWithMetadata, ComicData } from '../../../utils/comicUtils';

interface PaginatedComicsPageProps {
  comics: ComicData[];
  currentPage: number;
  totalPages: number;
  totalComics: number;
}

export default function PaginatedComicsPage({ comics, currentPage, totalPages, totalComics }: PaginatedComicsPageProps) {
  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEO
        title={`Comics - Page ${currentPage} | UX Strip`}
        description={`Browse UX Strip comics - Page ${currentPage} of ${totalPages}. A comic series about design, dysfunction, and digital delusions.`}
      />
      <div className="container mx-auto px-4 py-3 md:py-12">
        <h1 className="text-2xl uppercase font-bold tracking-wider text-center mb-4 md:mb-12">
          Comics - Page {currentPage}
        </h1>

        <div className="flex flex-col gap-6 md:gap-20 max-w-4xl mx-auto">
          {comics.length > 0 ? (
            comics.map((comic, index) => {
              return (
                <AnimatedCard key={comic.path} delay={index * 0.1}>
                  <div className="mb-1">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <Link href={`/comics/${comic.id}`} className="block">
                        <div className="relative" style={{ height: '300px', maxHeight: '50vh', minHeight: '200px' }}>
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
                    <div className="mt-1 text-right">
                      <h2 className="text-base font-bold">Issue #{comic.number}</h2>
                      {comic.metadata.publishedDate && (
                        <p className="text-xs text-gray-600">Published: {comic.metadata.publishedDate}</p>
                      )}
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
          <div className="flex justify-center mt-8 md:mt-16 mb-4 md:mb-8">
            <div className="flex items-center space-x-1 md:space-x-2">
              {currentPage > 1 && (
                <Link
                  href={currentPage === 2 ? '/comics' : `/comics/page/${currentPage - 1}`}
                  className="px-3 py-2 md:px-6 md:py-3 text-sm md:text-base bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors"
                >
                  ← Previous
                </Link>
              )}

              <div className="px-2 md:px-4 py-1 md:py-2 text-sm md:text-base font-medium">
                Page {currentPage} of {totalPages}
              </div>

              {currentPage < totalPages && (
                <Link
                  href={`/comics/page/${currentPage + 1}`}
                  className="px-3 py-2 md:px-6 md:py-3 text-sm md:text-base bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors"
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

export const getStaticPaths: GetStaticPaths = async () => {
  const comicsDirectory = path.join(process.cwd(), 'public/comics');
  const COMICS_PER_PAGE = 7;

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

  // Calculate total pages
  const totalPages = Math.ceil(comicFilenames.length / COMICS_PER_PAGE);

  // Generate paths for all pages except page 1 (which is handled by /comics)
  const paths = [];
  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const comicsDirectory = path.join(process.cwd(), 'public/comics');
  const COMICS_PER_PAGE = 7;
  const currentPage = params?.page ? parseInt(params.page as string, 10) : 1;

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
