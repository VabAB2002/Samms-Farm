'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/sanityClient';
import { HomeHero } from '@/lib/sanity/types/schema';

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

  return (
    <div className="relative h-[85vh] min-h-[650px] w-full overflow-hidden">
      {/* Hero Background */}
      {hero.heroMedia?.type === 'image' && hero.heroMedia.image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(hero.heroMedia.image).width(1920).url()}
            alt={hero.heroMedia.alt || hero.headline}
            fill
            priority
            quality={90}
            className="object-cover transition-transform duration-2000 ease-out animate-slowZoom"
            sizes="100vw"
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
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      
      {/* Overlay */}
      <div className={`absolute inset-0 z-10 ${getOverlayClass()}`}></div>
      <div className="absolute inset-0 z-11 bg-grain opacity-15 mix-blend-overlay"></div>
      
      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-display font-medium text-cream-50 mb-6 leading-tight">
            {hero.headline}
          </h1>
          
          {hero.subHeadline && (
            <p className="text-xl md:text-2xl text-cream-100 mb-10 leading-relaxed">
              {hero.subHeadline}
            </p>
          )}
          
          <div className="flex flex-wrap justify-center gap-4">
            {hero.ctaButton && (
              <Link
                href={hero.ctaButton.href}
                className={`px-8 py-4 rounded-lg transition-all shadow-rustic transform hover:scale-105 duration-300 font-medium ${
                  buttonClass[hero.ctaButton.style || 'primary']
                }`}
              >
                {hero.ctaButton.label}
              </Link>
            )}
            
            {hero.secondaryCta && (
              <Link
                href={hero.secondaryCta.href}
                className="px-8 py-4 text-cream-50 rounded-lg hover:bg-cream-50/10 transition-all"
              >
                {hero.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
