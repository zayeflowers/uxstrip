import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedCard from '../components/AnimatedCard';

interface ComicsPageProps {
  comics: string[];
}

export default function ComicsPage({ comics }: ComicsPageProps) {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl uppercase font-bold tracking-wider text-center mb-12">
          Comics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {comics.length > 0 ? (
            comics.map((comic, index) => {
              const comicId = comic.split('/').pop()?.split('.')[0];

              return (
                <AnimatedCard key={comic} delay={index * 0.1}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <Link href={`/comics/${comicId}`} className="block">
                      <div className="relative" style={{ height: '400px' }}>
                        <Image
                          src={comic}
                          alt={`UX Strip Comic ${comicId}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain"
                        />
                      </div>
                    </Link>
                  </div>
                </AnimatedCard>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-12 border border-gray-200 rounded-lg">
              <p className="text-gray-500 text-lg">No comics found. Check back soon!</p>
              <p className="text-gray-400 mt-2">
                Add comic images to the /public/comics folder to see them here.
              </p>
            </div>
          )}
        </div>
      </div>
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

  // Filter for image files only
  const comics = filenames
    .filter(filename => {
      const extension = filename.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
    })
    .map(filename => `/comics/${filename}`);

  return {
    props: {
      comics,
    },
  };
};
