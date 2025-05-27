'use client';

import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

type SanityImageProps = {
  image: any;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  quality?: number;
  onClick?: () => void;
};

export default function SanityImage({
  image,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
  style,
  quality = 80,
  onClick
}: SanityImageProps) {
  // Handle case where no image is provided
  if (!image) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`} 
        style={{ width, height, ...style }}
      >
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }
  
  // Convert Sanity image to URL
  const imageUrl = urlFor(image).quality(quality).url();
  
  // Add rustic styling classes based on the farm aesthetic memory
  const rusticClasses = 'rounded-lg shadow-md border border-amber-100';
  const combinedClasses = `${rusticClasses} ${className}`;
  
  return (
    <div className="relative" onClick={onClick}>
      {fill ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={combinedClasses}
          style={style}
        />
      ) : (
        <Image
          src={imageUrl}
          alt={alt}
          width={width || 400}
          height={height || 300}
          priority={priority}
          className={combinedClasses}
          style={style}
        />
      )}
    </div>
  );
}
