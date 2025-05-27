"use client";

import React from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SecondaryFeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  imageOnRight?: boolean;
}

const SecondaryFeatureCard = ({
  title,
  description,
  imageUrl,
  buttonText,
  buttonLink,
  imageOnRight = false
}: SecondaryFeatureCardProps) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <div className="relative overflow-hidden bg-cream-50 m-0 p-0 rounded-md shadow-sm border border-cream-200/50 hover:border-cream-300/60 transition-all duration-300">  
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`flex flex-col md:flex-row ${imageOnRight ? 'md:flex-row-reverse' : ''} min-h-[500px] md:min-h-0 transition-all duration-500 ease-in-out m-0 p-0`}
      >
        {/* Image side */}
        <div className="relative w-full md:w-1/2 h-[350px] md:h-[600px] overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: `url(${imageUrl})` }}
            whileHover={{ scale: 1.05, filter: 'brightness(1.08)' }}
            initial={{ scale: 1.05, filter: 'brightness(0.95)' }}
            animate={inView ? { scale: 1, filter: 'brightness(1)' } : { scale: 1.05, filter: 'brightness(0.95)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Texture overlay */}
            <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay"></div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brown-800/40 to-transparent opacity-40 mix-blend-multiply"></div>
          </motion.div>
          
          {/* Clean highlight border on hover */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none border-[3px] border-transparent group-hover:border-cream-200/30 z-10 transition-all duration-500 ease-in-out"
          ></motion.div>
        </div>
        
        {/* Content side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-16 bg-cream-50 relative overflow-hidden">
          {/* Subtle background texture */}
          <div className="absolute inset-0 bg-grain opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-cream-50/20 to-white mix-blend-multiply"></div>
          
          {/* Content container */}
          <div className="relative z-10 max-w-lg mx-auto text-center md:text-left">
            {/* Decorative wheat icon */}
            <motion.div 
              className="mb-5 text-terracotta-500 mx-auto md:mx-0"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2V22M8 6C9 7 11 7 12 6M6 10C8 12 12 12 14 10M4 14C7 17 13 17 16 14M3 18C7 22 15 22 19 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
              className="text-xl md:text-3xl lg:text-4xl font-display font-medium text-brown-800 mb-3 tracking-wide leading-tight"
            >
              {title}
            </motion.h3>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={inView ? { width: '40px' } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-[1px] bg-terracotta-400 mb-4 mx-auto md:mx-0 rounded-full"
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base md:text-base text-brown-600 mb-8 font-sans leading-[1.75] tracking-normal min-h-[4rem]"
            >
              {description}
            </motion.p>
            
            <motion.a 
              href={buttonLink}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="btn-secondary mx-auto md:mx-0 gap-2"
            >
              <span className="text-center">{buttonText}</span>
              <motion.svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.8 }}
              >
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </motion.a>
          </div>
        </div>
      </motion.div>
      
      {/* Removed decorative separator line */}
    </div>
  );
};

export default SecondaryFeatureCard;
