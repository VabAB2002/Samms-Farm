"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaCalendarAlt } from 'react-icons/fa';
import SanityImage from '@/components/media/SanityImage';
import SanityVideo from '@/components/media/SanityVideo';
import { MediaAsset } from '@/lib/sanity/api/media';

interface HeroSectionProps {
  heroVideo: MediaAsset | undefined;
  heroImage: MediaAsset | undefined;
}

export default function HeroSection({
  heroVideo,
  heroImage
}: HeroSectionProps) {
  return (
    <div className="relative h-[70vh] mb-20 rounded-lg overflow-hidden shadow-rustic-lg">
      {heroVideo ? (
        <div className="absolute inset-0 w-full h-full">
          <SanityVideo 
            video={heroVideo.video}
            videoUrl={heroVideo.videoUrl}
            title={heroVideo.title || "Farm to table experience"}
            poster={heroVideo.image}
            autoPlay={true}
            loop={true}
            muted={true}
            controls={false}
            className="w-full h-full object-cover"
          />
        </div>
      ) : heroImage ? (
        <SanityImage 
          image={heroImage.image} 
          alt={heroImage.altText || "Farm to table experience"} 
          fill
          className="w-full h-full object-cover"
        />
      ) : (
        <video 
          src="/videos/restaurant-bg.mp4" 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brown-800/70 to-transparent flex flex-col justify-end p-8 md:p-12">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-display font-medium text-cream-50 mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Healing the Land,
            </motion.span>
            <br />
            <motion.span 
              className="text-terracotta-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Nourishing People
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-xl text-cream-100 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            A farm-to-table journey of family, happiness, and connection
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.a 
              href="#menu" 
              className="px-6 py-3 bg-terracotta-500 text-cream-50 rounded-lg hover:bg-terracotta-600 transition-all shadow-rustic transform hover:scale-105 duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: "#c4462e" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUtensils /> Explore Our Menu
            </motion.a>
            <motion.a 
              href="#reservation" 
              className="px-6 py-3 border-2 border-moss-500 text-cream-50 rounded-lg hover:bg-moss-500/20 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 138, 86, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCalendarAlt /> Reserve a Table
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
