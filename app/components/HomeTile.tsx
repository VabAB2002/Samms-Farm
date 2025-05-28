'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/sanityClient';
import { HomeTile as HomeTileType } from '@/lib/sanity/types/schema';
import { motion } from 'framer-motion';

type HomeTileProps = {
  tile: HomeTileType;
  className?: string;
};

export default function HomeTile({ tile, className = '' }: HomeTileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Define aspect ratio classes
  const aspectRatioClass = {
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
    widescreen: 'aspect-[16/9]',
  };

  // Define hover effect classes
  const hoverEffectClass = {
    zoom: 'scale-[1.03] group-hover:scale-110',
    fade: 'group-hover:opacity-90',
    slideUp: 'transform group-hover:-translate-y-2',
    none: '',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative">
      <Link
        href={tile.ctaHref}
        className={`block relative overflow-hidden transition-all duration-500 ease-in-out group hover:z-10 outline-none border-0 ${
          aspectRatioClass[tile.aspectRatio]
        } ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Background Image or Color */}
      {tile.media?.type === 'image' && tile.media.image ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={urlFor(tile.media.image).width(1200).quality(90).url()}
            alt={tile.media.alt || tile.title}
            fill
            className={`object-cover transition-all duration-700 ease-out ${
              hoverEffectClass[tile.hoverEffect]
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setIsLoaded(true)}
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.15 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-cream-50 mix-blend-overlay z-1"
          />
        </div>
      ) : tile.media?.type === 'video' && tile.media.video ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            src={`https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mfp8ghll'}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${tile.media.video.asset._ref.replace('file-', '').replace('-mp4', '.mp4')}`}
            autoPlay
            muted
            loop
            playsInline
            className={`w-full h-full object-cover transition-all duration-700 ${
              hoverEffectClass[tile.hoverEffect]
            }`}
            onLoadedData={() => setIsLoaded(true)}
          >
            Your browser does not support the video tag.
          </video>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.15 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-cream-50 mix-blend-overlay z-1"
          />
        </div>
      ) : (
        <div
          className={`absolute inset-0 z-0 ${
            tile.backgroundColor || 'bg-moss-500'
          }`}
        ></div>
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-brown-900/80 via-brown-900/40 to-transparent transition-all duration-500 group-hover:opacity-95"></div>
      <motion.div 
        animate={{ opacity: isHovered ? 0.15 : 0.1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 z-5 bg-grain mix-blend-overlay transition-opacity duration-500"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-6 border-2 border-cream-50/20"
      ></motion.div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-cream-50">
        <motion.div 
          animate={{ y: isHovered && tile.hoverEffect === 'slideUp' ? -16 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="transform transition-all duration-500">
          <h2 className="text-2xl font-farm font-medium mb-2 tracking-wide transform -rotate-[0.5deg] drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            <span className="relative inline-block">
              <motion.span 
                animate={{ 
                  backgroundSize: isHovered ? "100% 2px" : "0% 2px",
                  backgroundPosition: isHovered ? "left bottom" : "right bottom"
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-gradient-to-r from-cream-50 to-cream-50 bg-no-repeat bg-left-bottom pb-1">
                {tile.title}
              </motion.span>
            </span>
          </h2>
          
          {tile.tagline && (
            <motion.p 
              animate={{ opacity: isHovered ? 1 : 0.9 }}
              transition={{ duration: 0.4 }}
              className="text-cream-100 text-sm mb-4 font-sketchy transition-all duration-300">
              {tile.tagline}
            </motion.p>
          )}
          
          <motion.div 
            animate={{ 
              x: isHovered ? 5 : 0,
              opacity: isHovered ? 1 : 0.9
            }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center font-medium text-sm">
            <span>{tile.ctaLabel || 'Explore'}</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transition-all duration-300"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
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
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    </Link>
    </motion.div>
  );
}
