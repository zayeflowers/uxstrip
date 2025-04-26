import { useState, useEffect } from 'react';
import Image from 'next/image';

interface RotatingImageProps {
  images: string[];
  interval?: number; // in milliseconds
  className?: string;
  alt?: string;
}

const RotatingImage: React.FC<RotatingImageProps> = ({
  images,
  interval = 3000,
  className = '',
  alt = 'Rotating image'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`${alt} ${index + 1}`}
            fill
            className="object-contain"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
};

export default RotatingImage;
