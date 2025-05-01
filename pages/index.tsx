import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import ComicCard from '../components/ComicCard';
import Logo from '../components/Logo';
import RandomImage from '../components/RandomImage';
import AnimatedCard from '../components/AnimatedCard';
import SEO from '../components/SEO';
import { getAllComicsWithMetadata, ComicData } from '../utils/comicUtils';

interface HomeProps {
  latestComics: ComicData[];
  randomImage: string;
  totalComics: number;
}

export default function Home({ latestComics, randomImage, totalComics }: HomeProps) {
  return (
    <div className="min-h-screen">
      <SEO
        title="UX Strip - Comic series about design, dysfunction, and digital delusions"
        description="A comic series about design, dysfunction, and digital delusions. UX Strip captures the everyday experiences of UX designers with humor and insight."
      />
      {/* Hero Section */}
      <section className="py-6 md:py-8 bg-white w-full">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
            {randomImage && (
              <div className="w-full md:w-5/12">
                <RandomImage
                  src={randomImage}
                  className="aspect-square w-full h-auto max-w-sm mx-auto"
                  alt="UX Strip Image"
                />
              </div>
            )}

            <div className="w-full md:w-7/12 flex items-center">
              <p className="font-montserrat max-w-xl"
                 style={{
                   fontSize: 'clamp(24px, 5vw, 48px)',
                   lineHeight: 'clamp(32px, 6vw, 65px)',
                   letterSpacing: '-0.04em',
                   fontWeight: 275,
                   color: '#000000'
                 }}>
                A comic series about design, dysfunction, and digital delusions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal divider line */}
      <div className="relative bg-[#F6F6F6] overflow-hidden">
        <div className="absolute left-0 right-0 w-screen h-[1px] bg-[#858484]"></div>
        <div className="py-4"></div>
      </div>

      {/* Comics Section */}
      <section className="pt-1 md:pt-6 pb-1 md:pb-6 bg-[#F6F6F6] w-full">
        <div className="container mx-auto px-2 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-2 md:mb-8">Latest Comics</h2>
          <div className="flex flex-col gap-4 md:gap-16 max-w-4xl mx-auto">
            {latestComics.length > 0 ? (
              latestComics.map((comic, index) => (
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
                      {comic.metadata.publishedDate && (
                        <p className="text-xs text-gray-600">Published: {comic.metadata.publishedDate}</p>
                      )}
                    </div>
                  </div>
                </AnimatedCard>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No comics found. Check back soon!</p>
              </div>
            )}
          </div>
          <div className="text-center mt-4 md:mt-8 mb-2 md:mb-4">
            <Link
              href="/comics"
              className="inline-block px-2 py-1 md:px-4 md:py-2 bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors text-sm md:text-base"
            >
              View All Comics →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const comicsDirectory = path.join(process.cwd(), 'public/comics');
  const rotateDirectory = path.join(process.cwd(), 'public/rotate');

  // Check if comics directory exists
  let comicFilenames: string[] = [];
  try {
    comicFilenames = fs.readdirSync(comicsDirectory);
  } catch (error) {
    console.error('Error reading comics directory:', error);
  }

  // Filter for image files only
  const allComics = comicFilenames
    .filter(filename => {
      const extension = filename.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
    })
    // Sort by filename in reverse order (newest first)
    .sort((a, b) => b.localeCompare(a));

  // Get the total number of comics
  const totalComics = allComics.length;

  // Get the latest comics (up to 7) with paths
  const latestComicPaths = allComics
    .slice(0, 7)
    .map(filename => `/comics/${filename}`);

  // Get comics with metadata
  const latestComics = getAllComicsWithMetadata(latestComicPaths);

  // Get rotating images
  let rotateFilenames: string[] = [];
  try {
    rotateFilenames = fs.readdirSync(rotateDirectory);
  } catch (error) {
    console.error('Error reading rotate directory:', error);
  }

  // Filter for image files only
  const imageFilenames = rotateFilenames
    .filter(filename => {
      const extension = filename.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
    });

  // Select a random image from the rotate directory
  let randomImage = '';
  if (imageFilenames.length > 0) {
    const randomIndex = Math.floor(Math.random() * imageFilenames.length);
    randomImage = `/rotate/${imageFilenames[randomIndex]}`;
  }

  return {
    props: {
      latestComics,
      randomImage,
      totalComics,
    },
    // Revalidate every hour to potentially show a different image
    revalidate: 3600,
  };
};
