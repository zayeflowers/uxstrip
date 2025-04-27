import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import ComicCard from '../components/ComicCard';
import Logo from '../components/Logo';
import RandomImage from '../components/RandomImage';
import AnimatedCard from '../components/AnimatedCard';

interface HomeProps {
  latestComics: string[];
  randomImage: string;
}

export default function Home({ latestComics, randomImage }: HomeProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4">
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
      <div className="relative bg-[#F6F6F6]">
        <div className="absolute left-0 right-0 h-[1px] bg-[#858484]"></div>
        <div className="py-4"></div>
      </div>

      {/* Comics Section */}
      <section className="pt-8 pb-8 bg-[#F6F6F6]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Latest Comics</h2>
          <div className="flex flex-col gap-20 max-w-4xl mx-auto">
            {latestComics.length > 0 ? (
              latestComics.map((comic, index) => (
                <AnimatedCard key={comic} delay={index * 0.1}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <h2 className="text-xl font-bold px-6 pt-6 pb-3 text-center">Comic #{index + 1}</h2>
                    <Link href={`/comics/${comic.split('/').pop()?.split('.')[0]}`} className="block">
                      <div className="relative" style={{ height: '500px' }}>
                        <Image
                          src={comic}
                          alt={`UX Strip Comic ${index + 1}`}
                          fill
                          sizes="100vw"
                          className="object-contain"
                        />
                      </div>
                    </Link>
                  </div>
                </AnimatedCard>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No comics found. Check back soon!</p>
              </div>
            )}
          </div>
          <div className="text-center mt-16 mb-8">
            <Link
              href="/comics"
              className="inline-block px-6 py-3 bg-white text-textDark font-medium border border-textDark rounded-md hover:bg-textDark hover:text-white transition-colors text-lg"
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

  // Get the latest comics (up to 3)
  const latestComics = comicFilenames
    .filter(filename => {
      const extension = filename.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
    })
    // Sort by filename in reverse order (newest first)
    .sort((a, b) => b.localeCompare(a))
    .slice(0, 3)
    .map(filename => `/comics/${filename}`);

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
    },
    // Revalidate every hour to potentially show a different image
    revalidate: 3600,
  };
};
