import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedCard from '../components/AnimatedCard';
import SEO from '../components/SEO';

interface ComicsPageProps {
  comics: string[];
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
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-2xl uppercase font-bold tracking-wider text-center mb-6 md:mb-12">
          Comics
        </h1>

        <div className="flex flex-col gap-10 md:gap-20 max-w-4xl mx-auto">
          {comics.length > 0 ? (
            comics.map((comic, index) => {
              const comicId = comic.split('/').pop()?.split('.')[0];

              return (
                <AnimatedCard key={comic} delay={index * 0.1}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <h2 className="text-xl font-bold px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3 text-center">Issue #{totalComics - ((currentPage - 1) * 7 + index)}</h2>
                    <Link href={`/comics/${comicId}`} className="block">
                      <div className="relative" style={{ height: '350px', maxHeight: '60vh', minHeight: '250px' }}>
                        <Image
                          src={comic}
                          alt={`UX Strip Issue ${totalComics - ((currentPage - 1) * 7 + index)}`}
                          fill
                          sizes="100vw"
                          className="object-contain"
                        />
                      </div>
                    </Link>
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
                  href={`/comics/page/${currentPage - 1}`}
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
  const allComics = filteredComics.map(filename => `/comics/${filename}`);

  // Calculate total pages
  const totalPages = Math.ceil(allComics.length / COMICS_PER_PAGE);

  // Get comics for current page
  const startIndex = (currentPage - 1) * COMICS_PER_PAGE;
  const endIndex = startIndex + COMICS_PER_PAGE;
  const comics = allComics.slice(startIndex, endIndex);

  return {
    props: {
      comics,
      currentPage,
      totalPages,
      totalComics,
    },
  };
};
