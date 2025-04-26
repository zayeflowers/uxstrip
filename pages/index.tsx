import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';

interface HomeProps {
  latestComics: string[];
}

export default function Home({ latestComics }: HomeProps) {
  return (
    <div className="container py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-comic text-primary mb-4">
          Welcome to UX Strip
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A comic archive dedicated to the funny side of user experience design.
          Browse our collection of UX-related comics and enjoy!
        </p>
        <div className="mt-8">
          <Link href="/comics" className="btn btn-primary">
            Browse All Comics
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-comic text-center mb-8">Latest Comics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestComics.map((comic, index) => (
            <div key={comic} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link href={`/comics/${comic.split('/').pop()?.split('.')[0]}`}>
                <div className="relative aspect-video">
                  <Image
                    src={comic}
                    alt={`Comic ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Comic {index + 1}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/comics" className="text-primary hover:underline">
            View All Comics →
          </Link>
        </div>
      </section>

      <section className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-comic mb-4">Submit Your Comic</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Are you a UX designer with a knack for comics? Submit your own UX-related
          comic and share it with our community!
        </p>
        <Link href="/submit" className="btn btn-primary">
          Submit a Comic
        </Link>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const comicsDirectory = path.join(process.cwd(), 'public/comics');
  const filenames = fs.readdirSync(comicsDirectory);
  
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
