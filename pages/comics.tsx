import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import ComicCard from '../components/ComicCard';

interface ComicsPageProps {
  comics: string[];
}

export default function ComicsPage({ comics }: ComicsPageProps) {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-comic text-primary text-center mb-8">
        Comics Archive
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {comics.length > 0 ? (
          comics.map((comic, index) => {
            const comicName = comic.split('/').pop()?.split('.')[0];
            const title = `Comic ${comicName}`;
            
            return (
              <ComicCard
                key={comic}
                src={comic}
                title={title}
                alt={`UX Strip Comic ${comicName}`}
              />
            );
          })
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500 text-lg">No comics found. Check back soon!</p>
          </div>
        )}
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
