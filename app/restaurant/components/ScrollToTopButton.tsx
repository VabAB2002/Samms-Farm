"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';

interface ScrollToTopButtonProps {
  isVisible?: boolean; // Optional prop to control visibility externally
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ isVisible: externalVisibility }) => {
  // Internal state for visibility if not controlled externally
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Determine button visibility from either external prop or internal state
  const shouldShow = externalVisibility !== undefined ? externalVisibility : isScrolled;

  useEffect(() => {
    // Only track scrolling if we're using internal visibility state
    if (externalVisibility === undefined) {
      const handleScroll = () => {
        // Show button after scrolling down 300px
        setIsScrolled(window.scrollY > 300);
      };

      window.addEventListener('scroll', handleScroll);
      
      // Check initial scroll position
      handleScroll();
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [externalVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          className="fixed bottom-6 right-6 p-3 rounded-full bg-[#8C9A77] text-white shadow-lg z-50 hover:bg-[#52371E] transition-colors duration-300"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <FaChevronUp className="text-lg" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
