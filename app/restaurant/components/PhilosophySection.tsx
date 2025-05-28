"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { IoLeaf } from 'react-icons/io5';
import SanityImage from '@/components/media/SanityImage';
import { MediaAsset } from '@/lib/sanity/api/media';

interface PhilosophySectionProps {
  interiorImage: MediaAsset | undefined;
}

export default function PhilosophySection({
  interiorImage
}: PhilosophySectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
      {/* Left column (50%): Restaurant interior image */}
      <motion.div 
        className="rounded-natural overflow-hidden h-[600px] shadow-rustic border-4 border-cream-200"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ scale: 1.03, rotate: 1 }}
        whileTap={{ scale: 0.98 }}
      >
        {interiorImage ? (
          <SanityImage 
            image={interiorImage.image} 
            alt={interiorImage.altText || "Samm's Restaurant interior"}
            fill
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src="/images/restaurant-interior.jpg" 
            alt="Samm's Restaurant interior"
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Floating accents */}
        <motion.div 
          className="absolute -top-5 -right-5 w-20 h-20 bg-moss-100 rounded-full z-10 opacity-70"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 5, 0] 
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute -bottom-6 -left-6 w-24 h-24 bg-terracotta-100 rounded-full z-10 opacity-70"
          animate={{ 
            y: [0, 8, 0],
            rotate: [0, -5, 0] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </motion.div>
      
      {/* Right column (50%): Farm-to-table philosophy */}
      <motion.div 
        className="flex flex-col justify-center"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-display font-medium text-brown-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Our Farm-to-Table <span className="text-terracotta-500">Philosophy</span>
        </motion.h2>
        <motion.p 
          className="text-lg text-brown-700 mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          At Samm's Farm Kitchen & Brewery, we believe that food should be a direct connection to the land. Our commitment to sustainable farming practices and seasonal ingredients means that each dish tells a story of care, quality, and environmental stewardship.
        </motion.p>
        <motion.p 
          className="text-lg text-brown-700 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          Our restaurant serves as a living showcase of our farm's bounty, with a menu that changes with the seasons and celebrates the natural rhythms of growth and harvest.
        </motion.p>
        <motion.div
          className="flex gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="/philosophy" 
            className="px-6 py-3 bg-moss-500 text-cream-50 rounded-lg hover:bg-moss-600 transition-all shadow-rustic transform hover:scale-105 duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoLeaf /> Learn More About Our Philosophy
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}
