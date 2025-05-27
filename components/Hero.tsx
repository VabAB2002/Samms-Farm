"use client";

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity/client';

interface HeroProps {
  title?: string;
  subtitle?: string;
  image?: any;
}

const Hero = ({ title = "Samm's Farm", subtitle = "Kitchen & Brewery", image }: HeroProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-32 md:py-48 overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video 
          className="absolute inset-0 object-cover w-full h-full" 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="/images/farm-hero-bg.jpg" // Fallback image if video doesn't load
        >
          <source src="/videos/farm-life.mp4" type="video/mp4" />
          {/* If video fails, the poster image will show */}
          {/* If a custom image is provided from Sanity, it will override the video */}
        </video>
        
        {/* Overlay gradients for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brown-900/40 via-brown-800/20 to-brown-700/40"></div>
        <div className="absolute inset-0 bg-grain opacity-30 mix-blend-overlay"></div>
      </div>
      
      {/* Decorative wheat illustrations */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20 hidden md:block">
        <svg width="120" height="300" viewBox="0 0 120 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 0V300M40 30C50 40 70 40 80 30M30 60C45 75 75 75 90 60M20 90C40 110 80 110 100 90M10 120C35 145 85 145 110 120M5 150C35 180 85 180 115 150M10 180C35 205 85 205 110 180M20 210C40 230 80 230 100 210M30 240C45 255 75 255 90 240M40 270C50 280 70 280 80 270" stroke="#6A593C" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 hidden md:block">
        <svg width="120" height="300" viewBox="0 0 120 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 0V300M40 30C50 40 70 40 80 30M30 60C45 75 75 75 90 60M20 90C40 110 80 110 100 90M10 120C35 145 85 145 110 120M5 150C35 180 85 180 115 150M10 180C35 205 85 205 110 180M20 210C40 230 80 230 100 210M30 240C45 255 75 255 90 240M40 270C50 280 70 280 80 270" stroke="#6A593C" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      
      {/* Main content */}
      <motion.div 
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Decorative separator */}
        <motion.div 
          className="w-24 h-[3px] bg-terracotta-600 mx-auto mb-8" 
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        />
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-display font-medium text-white mb-4 text-center tracking-wide drop-shadow-lg"
        >
          {title}
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-3xl text-cream-100 tracking-wide text-center font-serif mb-6 drop-shadow-md"
        >
          {subtitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-xl mx-auto text-base md:text-lg text-cream-50/90 mb-10 font-sans drop-shadow text-shadow"
        >
          A movement rooted in healing the land, building human connection, and sharing happiness through food and community.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a href="#about" className="btn-accent gap-2">
            <span>Our Philosophy</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
        
        {/* Decorative separator */}
        <motion.div 
          className="w-24 h-[3px] bg-terracotta-600 mx-auto mt-12" 
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        />
      </motion.div>
      
      {/* Decorative corners */}
      <div className="absolute top-12 left-12 w-16 h-16 border-t-2 border-l-2 border-brown-400 opacity-40 hidden md:block"></div>
      <div className="absolute top-12 right-12 w-16 h-16 border-t-2 border-r-2 border-brown-400 opacity-40 hidden md:block"></div>
      <div className="absolute bottom-12 left-12 w-16 h-16 border-b-2 border-l-2 border-brown-400 opacity-40 hidden md:block"></div>
      <div className="absolute bottom-12 right-12 w-16 h-16 border-b-2 border-r-2 border-brown-400 opacity-40 hidden md:block"></div>
    </div>
  );
};

export default Hero;
