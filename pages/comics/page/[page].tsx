import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedCard from '../../../components/AnimatedCard';

interface PaginatedComicsPageProps {
  comics: string[];
  currentPage: number;
  totalPages: number;
  totalComics: number;
}

export default function PaginatedComicsPage({ comics, currentPage, totalPages, totalComics }: PaginatedComicsPageProps) {
  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl uppercase font-bold tracking-wider text-center mb-12">
          Comics - Page {currentPage}
        </h1>

        <div className="flex flex-col gap-20 max-w-4xl mx-auto">
          {comics.length > 0 ? (
            comics.map((comic, index) => {
              const comicId = comic.split('/').pop()?.split('.')[0];
              const globalIndex = (currentPage - 1) * 7 + index + 1;

              return (
                <AnimatedCard key={comic} delay={index * 0.1}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <h2 className="text-xl font-bold px-6 pt-6 pb-3 text-center">Issue #{totalComics - ((currentPage - 1) * 7 + index)}</h2>
                    <Link href={`/comics/${comicId}`} className="block">
                      <div className="relative" style={{ height: '500px' }}>
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
          <div className="flex justify-center mt-16 mb-8">
            <div className="flex items-center space-x-2">
              {currentPage > 1 && (
                <Link
                  href={currentPage === 2 ? '/comics' : `/comics/page/${currentPage - 1}`}
                  className="px-6 py-3 bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors"
                >
                  ← Previous
                </Link>
              )}

              <div className="px-4 py-2 font-medium">
                Page {currentPage} of {totalPages}
              </div>

              {currentPage < totalPages && (
                <Link
                  href={`/comics/page/${currentPage + 1}`}
                  className="px-6 py-3 bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors"
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
