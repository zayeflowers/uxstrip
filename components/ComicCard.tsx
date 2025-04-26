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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-102 transform">
      <Link href={`/comics/${comicId}`} className="block h-full">
        <div className="relative aspect-video">
          <Image
            src={src}
            alt={alt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg font-comic text-textDark">{title}</h3>
          {date && <p className="text-gray-500 text-sm mt-1">{date}</p>}
        </div>
      </Link>
    </div>
  );
};

export default ComicCard;
