'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/sanityClient';
import { HomeHero } from '@/lib/sanity/types/schema';
import { motion } from 'framer-motion';

type HeroProps = {
  hero: HomeHero;
};

export default function Hero({ hero }: HeroProps) {
  // Generate overlay class based on color and opacity
  const getOverlayClass = () => {
    if (hero.overlayColor === 'none') return '';
    
    const opacityValue = hero.overlayOpacity ? hero.overlayOpacity / 100 : 0.5;
    const opacityClass = `bg-opacity-${Math.round(opacityValue * 100)}`;
    
    switch (hero.overlayColor) {
      case 'dark':
        return `bg-brown-900 ${opacityClass}`;
      case 'light':
        return `bg-cream-50 ${opacityClass}`;
      case 'brown':
        return `bg-brown-700 ${opacityClass}`;
      case 'moss':
        return `bg-moss-700 ${opacityClass}`;
      case 'terracotta':
        return `bg-terracotta-600 ${opacityClass}`;
      default:
        return `bg-brown-900 ${opacityClass}`;
    }
  };

  const buttonClass = {
    primary: 'bg-terracotta-500 hover:bg-terracotta-600 text-cream-50',
    secondary: 'bg-moss-600 hover:bg-moss-700 text-cream-50',
    tertiary: 'border-2 border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-brown-900',
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-[85vh] min-h-[650px] w-full overflow-hidden">
      {/* Hero Background */}
      {hero.heroMedia?.type === 'image' && hero.heroMedia.image && (
        <div className="absolute inset-0 z-0 bg-brown-900/20">
          <Image
            src={urlFor(hero.heroMedia.image).width(1920).url()}
            alt={hero.heroMedia.alt || hero.headline}
            fill
            priority
            quality={90}
            className={`object-cover transition-transform duration-[2.5s] ease-out ${isLoaded ? 'scale-105' : 'scale-100'}`}
            sizes="100vw"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      )}
      
      {/* Video Background */}
      {hero.heroMedia?.type === 'video' && (hero.heroMedia.video || hero.heroMedia.videoUrl) && (
        <div className="absolute inset-0 z-0">
          <video
            src={hero.heroMedia.videoUrl || (hero.heroMedia.video ? urlFor(hero.heroMedia.video).url() : '')}
            autoPlay
            muted
            loop
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoadedData={() => setIsLoaded(true)}
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-brown-900/30"></div>
        </div>
      )}
      
      {/* Overlay */}
      <div className={`absolute inset-0 z-10 ${getOverlayClass()} backdrop-blur-[2px]`}></div>
      <div className="absolute inset-0 z-11 bg-grain opacity-15 mix-blend-overlay"></div>
      <div className="absolute inset-x-0 bottom-0 h-24 z-12 bg-gradient-to-t from-brown-900/50 to-transparent"></div>
      
      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            className="text-5xl md:text-7xl font-farm font-medium text-cream-50 mb-6 leading-tight tracking-wide
              transform -rotate-1 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]">
            <span className="bg-gradient-to-r from-cream-50 to-cream-100 bg-clip-text">{hero.headline}</span>
          </motion.h1>
          
          {hero.subHeadline && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
              className="text-xl md:text-2xl font-sketchy text-cream-100 mb-10 leading-relaxed
                transform rotate-[0.5deg] drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] transition-all duration-300">
              {hero.subHeadline}
            </motion.p>
          )}
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4">
            {hero.ctaButton && (
              <Link
                href={hero.ctaButton.href}
                className={`px-8 py-4 rounded-full transition-all shadow-lg transform hover:translate-y-[-3px] hover:shadow-xl duration-300 font-medium border border-transparent
                  ${buttonClass[hero.ctaButton.style || 'primary']} hover:ring-2 hover:ring-cream-50/30 hover:ring-offset-1 hover:ring-offset-transparent`}
              >
                <span className="relative overflow-hidden inline-block">
                  <span className="relative z-10">{hero.ctaButton.label}</span>
                </span>
              </Link>
            )}
            
            {hero.secondaryCta && (
              <Link
                href={hero.secondaryCta.href}
                className="px-8 py-4 text-cream-50 rounded-full hover:bg-cream-50/10 transition-all border border-cream-50/30 hover:border-cream-50/80"
              >
                <span className="relative group-hover:text-cream-100 transition-colors duration-300">
                  {hero.secondaryCta.label}
                </span>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
