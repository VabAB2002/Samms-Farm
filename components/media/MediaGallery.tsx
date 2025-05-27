'use client';

import React, { useState } from 'react';
import SanityImage from './SanityImage';
import SanityVideo from './SanityVideo';
import { MediaAsset, formatMediaAsset } from '@/lib/sanity/api/media';

type MediaGalleryProps = {
  mediaAssets: MediaAsset[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'small' | 'medium' | 'large';
  aspectRatio?: '1:1' | '4:3' | '16:9';
  showCaptions?: boolean;
  onClick?: (asset: MediaAsset) => void;
};

export default function MediaGallery({
  mediaAssets,
  className = '',
  columns = 3,
  gap = 'medium',
  aspectRatio = '4:3',
  showCaptions = false,
  onClick
}: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  if (!mediaAssets || mediaAssets.length === 0) {
    return (
      <div className="bg-cream-50 p-6 rounded-lg text-center">
        <p className="text-brown-700">No media items to display.</p>
      </div>
    );
  }
  
  // Determine gap class
  const gapClass = gap === 'small' ? 'gap-2' : gap === 'medium' ? 'gap-4' : 'gap-8';
  
  // Determine grid columns class
  const columnsClass = columns === 1 ? 'grid-cols-1' : 
                       columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                       columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 
                       'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
  
  // Get aspect ratio class
  const aspectRatioClass = aspectRatio === '1:1' ? 'aspect-square' : 
                           aspectRatio === '4:3' ? 'aspect-[4/3]' : 
                           'aspect-video';
  
  // Rustic styling based on the farm aesthetic
  const rusticClasses = 'bg-cream-50 rounded-lg p-2';
  
  return (
    <div className={`${rusticClasses} ${className}`}>
      <div className={`grid ${columnsClass} ${gapClass}`}>
        {mediaAssets.map((asset, index) => {
          const formattedAsset = formatMediaAsset(asset);
          
          return (
            <div 
              key={asset._id} 
              className="relative overflow-hidden rounded-lg group hover:shadow-lg transition-shadow duration-300"
              onClick={() => {
                setActiveIndex(index);
                onClick?.(asset);
              }}
            >
              <div className={`${aspectRatioClass} overflow-hidden`}>
                {asset.mediaType === 'video' ? (
                  <SanityVideo
                    video={asset.video}
                    videoUrl={asset.videoUrl}
                    title={asset.title}
                    poster={asset.image}
                    controls={true}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <SanityImage
                    image={asset.image}
                    alt={asset.altText || asset.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              
              {showCaptions && (asset.caption || asset.title) && (
                <div className="absolute bottom-0 left-0 right-0 bg-brown-900/70 text-white p-2 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{asset.caption || asset.title}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Modal for fullscreen view (can be expanded upon) */}
      {activeIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setActiveIndex(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setActiveIndex(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="max-w-5xl max-h-[90vh] overflow-hidden">
            {mediaAssets[activeIndex].mediaType === 'video' ? (
              <SanityVideo
                video={mediaAssets[activeIndex].video}
                videoUrl={mediaAssets[activeIndex].videoUrl}
                title={mediaAssets[activeIndex].title}
                width="100%"
                height="auto"
                controls
              />
            ) : (
              <SanityImage
                image={mediaAssets[activeIndex].image}
                alt={mediaAssets[activeIndex].altText || mediaAssets[activeIndex].title}
                className="max-h-[85vh] w-auto mx-auto object-contain"
                width={1200}
                height={800}
              />
            )}
            
            {(mediaAssets[activeIndex].caption || mediaAssets[activeIndex].title) && (
              <div className="bg-brown-900/70 text-white p-4 mt-2">
                <p className="text-center">{mediaAssets[activeIndex].caption || mediaAssets[activeIndex].title}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
