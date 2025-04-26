import Image from 'next/image';

interface RandomImageProps {
  src: string;
  className?: string;
  alt?: string;
}

const RandomImage: React.FC<RandomImageProps> = ({
  src,
  className = '',
  alt = 'Random image'
}) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default RandomImage;
