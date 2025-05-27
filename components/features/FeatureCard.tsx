"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  comingSoon?: boolean;
}

const FeatureCard = ({
  title,
  description,
  imageUrl,
  buttonText,
  buttonLink,
  comingSoon = false
}: FeatureCardProps) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative group h-[600px] md:h-screen transition-all duration-500 overflow-hidden border border-brown-200/30 hover:border-brown-300/40 rounded-md shadow-sm"
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${imageUrl})` }}
        whileHover={{ scale: 1.03, filter: 'brightness(1.05)' }}
        initial={{ scale: 1.05, filter: 'brightness(0.95)' }}
        animate={inView ? { scale: 1, filter: 'brightness(1)' } : { scale: 1.05, filter: 'brightness(0.95)' }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Texture overlay */}
        <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900/70 via-brown-800/30 to-transparent opacity-60 mix-blend-multiply"></div>
        
        {/* Additional vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient opacity-30 mix-blend-multiply"></div>
      </motion.div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-20 md:pt-32 lg:pt-40 p-8 md:p-12 text-center z-10 transform transition-all duration-500 group-hover:translate-y-[-6px]">
        {comingSoon && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="bg-white/80 text-terracotta-600 text-xs md:text-sm font-medium px-5 py-1.5 rounded-md mb-6 border border-terracotta-200 shadow-sm backdrop-blur-sm"
          >
            Coming Soon
          </motion.div>
        )}
        
        {/* Decorative element above title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, width: 0 }}
          animate={inView ? { opacity: 1, scale: 1, width: 64 } : { opacity: 0, scale: 0.8, width: 0 }}
          transition={{ duration: 0.8 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-cream-100 to-transparent mb-4 opacity-70"
        />
        
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.01, textShadow: '0 2px 5px rgba(0,0,0,0.2)' }}
          className="text-2xl md:text-4xl lg:text-5xl font-display font-medium text-white mb-3 tracking-wide drop-shadow-md leading-tight"
        >
          {title}
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, width: 0 }}
          animate={inView ? { opacity: 1, scale: 1, width: 64 } : { opacity: 0, scale: 0.8, width: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-[1px] w-16 bg-terracotta-400 mb-5 opacity-80 mx-auto"
        />
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-white/90 mb-8 max-w-sm font-sans tracking-wide leading-[1.75] drop-shadow-md min-h-[4rem]"
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
          className="btn-light mt-2"
        >
          <span className="text-center">{buttonText}</span>
        </motion.a>
        
        {/* Clean border highlight effect on hover */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-cream-100/20 rounded-md transition-all duration-500 ease-in-out"
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
