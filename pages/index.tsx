import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import ComicCard from '../components/ComicCard';

interface HomeProps {
  latestComics: string[];
}

export default function Home({ latestComics }: HomeProps) {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-comic font-bold text-primary mb-6 animate-fadeIn">
            Welcome to UX Strip
          </h1>
          <p className="text-lg md:text-xl text-textBody max-w-2xl mx-auto mb-10 leading-relaxed">
            A comic archive dedicated to the absurd, funny, and very real world of UX.
            Browse our collection of UX-related comics and enjoy!
          </p>
          <Link
            href="/comics"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Browse All Comics
          </Link>
        </div>
      </section>

      {/* Latest Comics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-comic font-bold text-primary text-center mb-12">
            Latest Comics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestComics.length > 0 ? (
              latestComics.map((comic, index) => (
                <ComicCard
                  key={comic}
                  src={comic}
                  title={`Comic ${index + 1}`}
                  alt={`UX Strip Comic ${index + 1}`}
                />
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
              className="inline-block text-primary font-medium hover:underline transition-colors"
            >
              View All Comics →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center">
            <h2 className="text-3xl font-comic font-bold text-primary mb-6">
              Submit Your Comic
            </h2>
            <p className="text-textBody max-w-2xl mx-auto mb-8 leading-relaxed">
              Are you a UX designer with a knack for comics? Submit your own UX-related
              comic and share it with our community!
            </p>
            <Link
              href="/submit"
              className="inline-block bg-secondary hover:bg-secondary/90 text-textDark font-medium py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Submit a Comic
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

  // Get the latest 3 comics (or fewer if there aren't 3)
  const latestComics = filenames
    .filter(filename => {
      const extension = filename.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
    })
    .slice(0, 3)
    .map(filename => `/comics/${filename}`);

  return {
    props: {
      latestComics,
    },
  };
};
