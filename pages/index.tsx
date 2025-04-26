import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import ComicCard from '../components/ComicCard';
import Logo from '../components/Logo';

interface HomeProps {
  latestComics: string[];
}

export default function Home({ latestComics }: HomeProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="mb-8 relative">
            <Logo size="large" />
          </div>
          <div className="text-center max-w-2xl">
            <p className="text-lg md:text-xl text-textBody leading-relaxed">
              A comic series about design, dysfunction, and digital delusions.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Comics Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
            {latestComics.length > 0 ? (
              latestComics.map((comic, index) => (
                <div key={comic} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                  <Link href={`/comics/${comic.split('/').pop()?.split('.')[0]}`} className="block">
                    <div className="relative aspect-square">
                      <Image
                        src={comic}
                        alt={`UX Strip Comic ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No comics found. Check back soon!</p>
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/comics"
              className="inline-block text-textDark font-medium hover:underline transition-colors"
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

  // Check if directory exists
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(comicsDirectory);
  } catch (error) {
    console.error('Error reading comics directory:', error);
  }

  // Get the latest comic (or none if there aren't any)
  const latestComics = filenames
    .filter(filename => {
      const extension = filename.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
    })
    .slice(0, 1)
    .map(filename => `/comics/${filename}`);

  return {
    props: {
      latestComics,
    },
  };
};
