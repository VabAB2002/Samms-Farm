'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/sanityClient';
import { HomeTile as HomeTileType } from '@/lib/sanity/types/schema';

type HomeTileProps = {
  tile: HomeTileType;
  className?: string;
};

export default function HomeTile({ tile, className = '' }: HomeTileProps) {
  // Define aspect ratio classes
  const aspectRatioClass = {
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
    widescreen: 'aspect-[16/9]',
  };

  // Define hover effect classes
  const hoverEffectClass = {
    zoom: 'group-hover:scale-110',
    fade: 'group-hover:opacity-80',
    slideUp: 'transform group-hover:-translate-y-2',
    none: '',
  };

  return (
    <Link
      href={tile.ctaHref}
      className={`block relative overflow-hidden transition-all duration-700 ease-in-out group hover:z-10 outline-none border-0 ${
        aspectRatioClass[tile.aspectRatio]
      } ${className}`}
    >
      {/* Background Image or Color */}
      {tile.media?.type === 'image' && tile.media.image ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(tile.media.image).width(1200).quality(90).url()}
            alt={tile.media.alt || tile.title}
            fill
            className={`object-cover transition-transform duration-1000 ease-out ${
              hoverEffectClass[tile.hoverEffect]
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : tile.media?.type === 'video' && tile.media.video ? (
        <div className="absolute inset-0 z-0">
          <video
            src={urlFor(tile.media.video).url()}
            autoPlay
            muted
            loop
            playsInline
            className={`w-full h-full object-cover transition-transform duration-700 ${
              hoverEffectClass[tile.hoverEffect]
            }`}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div
          className={`absolute inset-0 z-0 ${
            tile.backgroundColor || 'bg-moss-500'
          }`}
        ></div>
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-brown-900/70 via-brown-900/30 to-transparent transition-all duration-700 group-hover:opacity-90"></div>
      <div className="absolute inset-0 z-5 bg-grain opacity-10 mix-blend-overlay transition-opacity duration-700"></div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-cream-50">
        <div className={`transform transition-all duration-500 ${tile.hoverEffect === 'slideUp' ? 'group-hover:-translate-y-4' : ''}`}>
          <h2 className="text-2xl font-display font-medium mb-2">{tile.title}</h2>
          
          {tile.tagline && (
            <p className="text-cream-100 text-sm mb-4 opacity-90">{tile.tagline}</p>
          )}
          
          <div className="inline-flex items-center font-medium text-sm">
            <span>{tile.ctaLabel || 'Explore'}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
