import Image from 'next/image';
import Link from 'next/link';

interface ComicCardProps {
  src: string;
  title: string;
  date?: string;
  alt?: string;
  issueNumber?: number;
}

const ComicCard = ({ src, title, date, alt, issueNumber }: ComicCardProps) => {
  // Extract the comic ID from the src path
  const comicId = src.split('/').pop()?.split('.')[0];

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3 text-center">
        <h2 className="text-xl font-bold">{title || `Issue #${issueNumber}`}</h2>
        {date && <p className="text-sm text-gray-600 mt-1">Published: {date}</p>}
      </div>
      <Link href={`/comics/${comicId}`} className="block">
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
