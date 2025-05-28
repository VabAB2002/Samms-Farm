"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MediaAsset } from '@/lib/sanity/api/media';

// Import modular components
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import GallerySection from './components/GallerySection';
import RestaurantMenu from './components/RestaurantMenu';
import ReservationSection from './components/ReservationSection';

interface RestaurantContentProps {
  mediaAssets: MediaAsset[];
  restaurantGalleryImages: any[];
  heroVideo: MediaAsset | undefined;
  heroImage: MediaAsset | undefined;
  interiorImage: MediaAsset | undefined;
  exteriorImage: MediaAsset | undefined;
  galleryImages: MediaAsset[];
}

export default function RestaurantContent({
  mediaAssets,
  restaurantGalleryImages,
  heroVideo,
  heroImage,
  interiorImage,
  exteriorImage,
  galleryImages
}: RestaurantContentProps) {
  return (
    <div className="min-h-screen bg-cream-50 bg-grain">
      <Header />
      <main className="py-12 md:py-20">
        <section className="container mx-auto px-4">
          {/* Hero section */}
          <HeroSection 
            heroVideo={heroVideo}
            heroImage={heroImage}
          />
          
          {/* Philosophy section */}
          <PhilosophySection 
            interiorImage={interiorImage}
          />
          
          {/* Gallery Section */}
          <GallerySection 
            restaurantGalleryImages={restaurantGalleryImages}
            galleryImages={galleryImages}
          />

          {/* Menu Section */}
          <RestaurantMenu />

          {/* Reservation Section */}
          <ReservationSection 
            exteriorImage={exteriorImage}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
