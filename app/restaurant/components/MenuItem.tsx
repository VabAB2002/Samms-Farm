"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MenuItem as MenuItemType } from '../types/menu';

interface MenuItemProps {
  item: MenuItemType;
  showImage?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, showImage = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden h-full border border-cream-200 group"
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.2 }
      }}
      id={`menu-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Image Section */}
      {showImage && item.image ? (
        <div className="relative w-full h-48 overflow-hidden">
          <Image 
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
          
          {/* Badges on the image */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
            {item.soldOut && 
              <span className="text-xs font-semibold text-white bg-rose-600 px-2 py-0.5 rounded-full shadow-sm">
                Sold Out
              </span>
            }
            {item.popular && 
              <span className="text-xs font-semibold text-white bg-amber-500 px-2 py-0.5 rounded-full shadow-sm">
                Popular
              </span>
            }
          </div>
        </div>
      ) : (
        <div className="h-8"></div> // Spacer when no image
      )}
      
      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-medium text-brown-800 group-hover:text-terracotta-600 transition-colors">
            {item.name}
            
            {/* Show badges here if no image */}
            {!item.image && (
              <div className="flex items-center gap-2 mt-1">
                {item.soldOut && <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100 shadow-sm">Sold Out</span>}
                {item.popular && <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 shadow-sm">Popular</span>}
              </div>
            )}
          </h4>
          
          {item.price && <span className="text-terracotta-600 font-medium ml-2 bg-terracotta-50 px-3 py-1 rounded-full">{item.price}</span>}
        </div>
        
        {item.description && (
          <p className="text-brown-600 text-sm leading-relaxed mb-3">{item.description}</p>
        )}
        
        {item.variants && item.variants.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.variants.map((variant, idx) => (
              <span key={idx} className="text-xs inline-block bg-cream-100 text-brown-700 px-2.5 py-1 rounded-full shadow-sm border border-cream-200">
                {variant.name}: {variant.price}
              </span>
            ))}
          </div>
        )}
        
        {item.tags && item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag, idx) => (
              <span key={idx} className="text-xs inline-block bg-moss-50 text-moss-700 px-2 py-0.5 rounded-full border border-moss-100">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Share/Link button (fixed position at bottom right) */}
      <motion.button
        className="absolute right-3 bottom-3 bg-cream-100 text-brown-700 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity border border-cream-200 shadow-sm z-20"
        initial={{ opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => {
          // Create shareable link with item ID
          const url = new URL(window.location.href);
          url.hash = `menu-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`;
          
          // Copy to clipboard
          navigator.clipboard.writeText(url.toString());
          
          // You could add a toast notification here
          alert('Link copied to clipboard!');
        }}
        title="Copy link to this item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default MenuItem;
