import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import ComicCard from '../components/ComicCard';
import Logo from '../components/Logo';
import RotatingImage from '../components/RotatingImage';

interface HomeProps {
  latestComics: string[];
  rotatingImages: string[];
}

export default function Home({ latestComics, rotatingImages }: HomeProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
            {rotatingImages.length > 0 && (
              <div className="w-full md:w-5/12">
                <RotatingImage
                  images={rotatingImages}
                  interval={5000}
                  className="aspect-square w-full h-auto max-w-md mx-auto"
                  alt="UX Strip Rotating Image"
                />
              </div>
            )}

            <div className="w-full md:w-7/12 flex items-center">
              <p className="font-montserrat text-3xl md:text-5xl text-black tracking-tighter max-w-xl font-[275]"
                 style={{
                   lineHeight: '65px',
                   letterSpacing: '-0.04em'
                 }}>
                A comic series about design, dysfunction, and digital delusions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Comics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Latest Comics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {latestComics.length > 0 ? (
              latestComics.map((comic, index) => (
                <div key={comic} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
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
