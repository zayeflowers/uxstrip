import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  // Size mapping
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <Image
        src="/logo.svg"
        alt="UX Strip Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default Logo;
