import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import ComicCard from '../components/ComicCard';
import Logo from '../components/Logo';
import RotatingImage from '../components/RotatingImage';
import AnimatedCard from '../components/AnimatedCard';

interface HomeProps {
  latestComics: string[];
  rotatingImages: string[];
}

export default function Home({ latestComics, rotatingImages }: HomeProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
            {rotatingImages.length > 0 && (
              <div className="w-full md:w-5/12">
                <RotatingImage
                  images={rotatingImages}
                  interval={5000}
                  className="aspect-square w-full h-auto max-w-sm mx-auto"
                  alt="UX Strip Rotating Image"
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
      <div className="relative">
        <div className="absolute left-0 right-0 h-[1px] bg-[#858484]"></div>
        <div className="py-4"></div>
      </div>

      {/* Comics Section */}
      <section className="pt-4 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {latestComics.length > 0 ? (
              latestComics.map((comic, index) => (
                <AnimatedCard key={comic} delay={index * 0.1}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <Link href={`/comics/${comic.split('/').pop()?.split('.')[0]}`} className="block">
                      <div className="relative" style={{ height: '300px' }}>
                        <Image
                          src={comic}
                          alt={`UX Strip Comic ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain"
                        />
                      </div>
                    </Link>
                  </div>
                </AnimatedCard>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">No comics found. Check back soon!</p>
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/comics"
              className="inline-block text-textDark font-medium hover:underline transition-colors text-lg"
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
    .slice(0, 3)
    .map(filename => `/comics/${filename}`);

  // Get rotating images
  let rotateFilenames: string[] = [];
  try {
    rotateFilenames = fs.readdirSync(rotateDirectory);
  } catch (error) {
    console.error('Error reading rotate directory:', error);
  }

  // Filter for image files only and create full paths
  const rotatingImages = rotateFilenames
    .filter(filename => {
      const extension = filename.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
    })
    .map(filename => `/rotate/${filename}`);

  return {
    props: {
      latestComics,
      rotatingImages,
    },
  };
};
