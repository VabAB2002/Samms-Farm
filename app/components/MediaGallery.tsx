'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/sanityClient';

// Types for our media assets
export type MediaAsset = {
  _id: string;
  title: string;
  altText?: string;
  mediaType: 'heroImage' | 'galleryImage' | 'backgroundImage' | 'productImage' | 'video' | 'icon';
  category?: string;
  image?: any;
  video?: any;
  videoUrl?: string;
  caption?: string;
  tags?: string[];
};

type MediaGalleryProps = {
  assets: MediaAsset[];
  className?: string;
  layout?: 'grid' | 'masonry' | 'carousel';
  showCaptions?: boolean;
  imageSize?: 'small' | 'medium' | 'large' | 'full';
};

const MediaGallery: React.FC<MediaGalleryProps> = ({
  assets,
  className = '',
  layout = 'grid',
  showCaptions = true,
  imageSize = 'medium',
}) => {
  const [activeAsset, setActiveAsset] = useState<MediaAsset | null>(null);
  
  // Handle opening the lightbox view
  const openLightbox = (asset: MediaAsset) => {
    setActiveAsset(asset);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };
  
  // Handle closing the lightbox view
  const closeLightbox = () => {
    setActiveAsset(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Get image size based on the imageSize prop
  const getImageDimensions = () => {
    switch (imageSize) {
      case 'small':
        return { width: 320, height: 240 };
      case 'medium':
        return { width: 640, height: 480 };
      case 'large':
        return { width: 1024, height: 768 };
      case 'full':
        return { width: 1920, height: 1080 };
      default:
        return { width: 640, height: 480 };
    }
  };

  // Determine grid column classes based on layout
  const getGridClasses = () => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
      case 'masonry':
        return 'columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4';
      case 'carousel':
        return 'flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
    }
  };

  // Handle rendering different media types
  const renderMedia = (asset: MediaAsset, inLightbox = false) => {
    const { width, height } = getImageDimensions();
    
    if (asset.mediaType === 'video') {
      if (asset.videoUrl) {
        // External video from YouTube, Vimeo, etc.
        return (
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            <iframe
              src={asset.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      } else if (asset.video) {
        // Uploaded video file
        return (
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            <video
              src={asset.video.asset.url}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        );
      }
    }
    
    // Image assets
    if (asset.image) {
      const imgProps = {
        src: urlFor(asset.image).url(),
        alt: asset.altText || asset.title || '',
        width: inLightbox ? 1920 : width,
        height: inLightbox ? 1080 : height,
        className: `w-full h-full ${inLightbox ? 'object-contain' : 'object-cover'} rounded-lg transition-all duration-300`,
      };
      
      return (
        <Image
          {...imgProps}
          priority={inLightbox}
        />
      );
    }
    
    // Fallback for missing media
    return (
      <div className="bg-gray-200 rounded-lg flex items-center justify-center p-4 aspect-video">
        <p className="text-gray-500">Media not available</p>
      </div>
    );
  };
  
  // Render gallery items
  const renderGalleryItems = () => {
    if (!assets || assets.length === 0) {
      return <p className="text-gray-500">No media available</p>;
    }
    
    return assets.map((asset) => (
      <div
        key={asset._id}
        className={`relative overflow-hidden group ${
          layout === 'carousel' ? 'snap-center min-w-[280px] w-80' : ''
        } ${layout === 'masonry' ? 'break-inside-avoid mb-4' : ''}`}
        onClick={() => openLightbox(asset)}
      >
        <div className="cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
          {renderMedia(asset)}
          
          {/* Hover overlay with title */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <span className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 text-center">
              {asset.title}
            </span>
          </div>
        </div>
        
        {/* Caption */}
        {showCaptions && asset.caption && (
          <p className="mt-2 text-sm text-gray-600">{asset.caption}</p>
        )}
      </div>
    ));
  };

  return (
    <>
      <div className={`media-gallery ${getGridClasses()} ${className}`}>
        {renderGalleryItems()}
      </div>
      
      {/* Lightbox */}
      {activeAsset && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          
          <div className="relative max-w-7xl max-h-[90vh] overflow-hidden">
            {renderMedia(activeAsset, true)}
            
            {/* Caption in lightbox */}
            {showCaptions && activeAsset.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                <h3 className="text-lg font-medium">{activeAsset.title}</h3>
                <p className="text-sm opacity-90">{activeAsset.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MediaGallery;
