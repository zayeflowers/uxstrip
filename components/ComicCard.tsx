import Image from 'next/image';
import Link from 'next/link';

interface ComicCardProps {
  src: string;
  title: string;
  alt?: string;
  issueNumber?: number;
}

const ComicCard = ({ src, title, alt, issueNumber }: ComicCardProps) => {
  // Extract the comic ID from the src path
  const comicId = src.split('/').pop()?.split('.')[0];

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="px-2 md:px-4 pt-2 md:pt-4 pb-1 md:pb-2 text-center">
        <h2 className="text-lg font-bold">{title || `Issue #${issueNumber}`}</h2>
      </div>
      <Link href={`/comics/${comicId}`} className="block">
        <div className="relative" style={{ height: '510px' }}>
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
