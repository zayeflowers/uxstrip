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
    <div className="min-h-screen bg-[#F6F6F6]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl uppercase font-bold tracking-wider text-center mb-12">
          Comics
        </h1>

        <div className="flex flex-col gap-20 max-w-4xl mx-auto">
          {comics.length > 0 ? (
            comics.map((comic, index) => {
              const comicId = comic.split('/').pop()?.split('.')[0];

              return (
                <AnimatedCard key={comic} delay={index * 0.1}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <h2 className="text-xl font-bold px-6 pt-6 pb-3 text-center">Comic #{index + 1}</h2>
                    <Link href={`/comics/${comicId}`} className="block">
                      <div className="relative" style={{ height: '500px' }}>
                        <Image
                          src={comic}
                          alt={`UX Strip Comic ${comicId}`}
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
