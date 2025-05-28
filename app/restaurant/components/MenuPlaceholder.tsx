"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MenuPlaceholderProps {
  index: number;
  name?: string;
}

/**
 * A stylish placeholder component for menu items when no image is available
 * Uses a 2:3 aspect ratio as specified in the design requirements
 * Designed to look like a sticker/polaroid for an interactive feel
 */
const MenuPlaceholder: React.FC<MenuPlaceholderProps> = ({ index, name = "Featured Dish" }) => {
  // Generate different background patterns and colors for each placeholder
  const patterns = [
    'bg-[radial-gradient(#FFB347_1px,transparent_1px)] bg-[length:20px_20px] bg-amber-50', // Dots
    'bg-[repeating-linear-gradient(45deg,#42A685_0,#42A685_2px,transparent_0,transparent_8px)] bg-emerald-50', // Stripes
    'bg-[repeating-radial-gradient(circle_at_center,#E57373_0,#E57373_1px,transparent_0,transparent_10px)] bg-rose-50', // Circles
  ];

  // Emoji icons for each placeholder
  const icons = ["🍲", "🍝", "🍰"];
  
  // Handwritten-style messages
  const messages = [
    "Chef's choice!",
    "You'll love this!",
    "Must try!"
  ];
  
  const patternIndex = index % patterns.length;
  
  return (
    <div className={`w-full h-full ${patterns[patternIndex]} aspect-[2/3] p-2 flex flex-col justify-center items-center relative`}>
      {/* Polaroid/sticker design */}
      <div className="absolute top-1 right-2 transform rotate-6 text-xs text-[#52371E]/50 font-handwriting">{messages[patternIndex]}</div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-6xl animate-pulse">{icons[patternIndex]}</div>
      </div>
      
      <div className="bg-white p-2 rounded-md w-full text-center mt-auto mb-3 shadow-sm transform -rotate-1">
        <h3 className="font-display text-lg md:text-xl font-medium text-[#52371E] truncate">{name}</h3>
        <p className="text-[#52371E]/70 text-xs mt-1">Tap for more info</p>
      </div>
      
      {/* Tape effect */}
      <div className="absolute -bottom-1 right-4 w-[30px] h-[15px] bg-[#ffffffaa] opacity-60 rounded-sm rotate-12"></div>
    </div>
  );
};

export default MenuPlaceholder;

// Add this to your global CSS or create a font class
// .font-handwriting {
//   font-family: 'Caveat', 'Permanent Marker', cursive;
// }
