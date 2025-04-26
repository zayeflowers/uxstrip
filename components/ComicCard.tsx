import Image from 'next/image';
import Link from 'next/link';

interface ComicCardProps {
  src: string;
  title: string;
  date?: string;
  alt?: string;
}

const ComicCard = ({ src, title, date, alt }: ComicCardProps) => {
  // Extract the comic ID from the src path
  const comicId = src.split('/').pop()?.split('.')[0];

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/comics/${comicId}`} className="block h-full">
        <div className="relative" style={{ height: '400px' }}>
          <Image
            src={src}
            alt={alt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
      </Link>
    </div>
  );
};

export default ComicCard;
