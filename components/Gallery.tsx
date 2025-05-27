"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { RestaurantGalleryImage } from '@/lib/sanity/api/restaurant';
import { urlFor } from '@/lib/sanity/client';

interface GalleryProps {
  photos: RestaurantGalleryImage[];
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Create lightbox slides array
  const slides = photos.map((photo) => ({
    src: urlFor(photo.image).width(1200).url(),
    alt: photo.alt,
    caption: photo.caption || photo.alt,
  }));

  return (
    <div className="gallery">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => {
          // Generate the image URL
          const imageUrl = urlFor(photo.image).width(800).height(800).url();
          
          return (
            <div 
              key={photo._id} 
              className="gallery-item cursor-pointer transition-opacity hover:opacity-90"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={imageUrl}
                  alt={photo.alt}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover w-full h-full rounded-xl"
                  priority={index < 6} // Priority loading for the first 6 images
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={slides}
          index={photoIndex}
          carousel={{ finite: photos.length <= 1 }}
          controller={{ closeOnBackdropClick: true }}
          render={{
            buttonPrev: photos.length <= 1 ? () => null : undefined,
            buttonNext: photos.length <= 1 ? () => null : undefined,
          }}
        />
      )}
    </div>
  );
};

export default Gallery;
