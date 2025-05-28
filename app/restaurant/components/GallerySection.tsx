"use client";

import React from 'react';
import { motion } from 'framer-motion';
import MediaGallery from '@/components/media/MediaGallery';
import Gallery from '@/components/Gallery';
import { MediaAsset } from '@/lib/sanity/api/media';

interface GallerySectionProps {
  restaurantGalleryImages: any[];
  galleryImages: MediaAsset[];
}

export default function GallerySection({
  restaurantGalleryImages,
  galleryImages
}: GallerySectionProps) {
  return (
    <motion.div 
      className="mb-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-display font-medium text-brown-800 text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Our Restaurant <span className="text-terracotta-500">Gallery</span>
      </motion.h2>
      
      <div className="relative">
        {restaurantGalleryImages && restaurantGalleryImages.length > 0 ? (
          <Gallery photos={restaurantGalleryImages} />
        ) : galleryImages && galleryImages.length > 0 ? (
          <MediaGallery mediaAssets={galleryImages} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-natural overflow-hidden aspect-square">
              <img src="/images/gallery-1.jpg" alt="Restaurant" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-natural overflow-hidden aspect-square">
              <img src="/images/gallery-2.jpg" alt="Farm produce" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-natural overflow-hidden aspect-square">
              <img src="/images/gallery-3.jpg" alt="Farm-to-table meal" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
