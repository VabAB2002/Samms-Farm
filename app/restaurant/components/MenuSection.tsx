"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section as SectionType, MenuItem } from '../types/menu';
import MenuCategory from './MenuCategory';
import MenuPlaceholder from './MenuPlaceholder';
import { useFeaturedMenuItems, SanityMenuItem } from '../hooks/useFeaturedMenuItems';

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6, 
      staggerChildren: 0.15
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({ 
    opacity: 1, 
    scale: 1,
    rotate: i % 2 === 0 ? -3 : 3, // Alternate rotation for sticker effect
    y: 0,
    transition: { duration: 0.5, type: 'spring', stiffness: 200 } 
  }),
  hover: {
    scale: 1.05,
    rotate: 0, // Straighten on hover
    y: -5,
    zIndex: 10,
    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3, type: 'spring', stiffness: 300 }
  }
};

interface MenuSectionProps {
  section: SectionType;
}

const MenuSection = ({ section }: MenuSectionProps) => {
  // Get featured items from Sanity using our custom hook
  const { featuredItems: sanityFeaturedItems, isLoading } = useFeaturedMenuItems();
  
  // Convert Sanity items to the format expected by our component
  const [featuredItems, setFeaturedItems] = useState<(MenuItem | SanityMenuItem)[]>([]);
  
  useEffect(() => {
    // If we have Sanity items, prioritize those
    if (sanityFeaturedItems.length > 0) {
      // Get up to 3 featured items from Sanity
      const items = sanityFeaturedItems.slice(0, 3);
      setFeaturedItems(items);
      return;
    }
    
    // Fallback to looking through section data if no Sanity items
    const items: MenuItem[] = [];
    
    // Loop through categories to find items with images
    if (Array.isArray(section.categories)) {
      for (const category of section.categories) {
        if (Array.isArray(category.items)) {
          for (const item of category.items) {
            // Prioritize popular items with images
            if (item.image && items.length < 3) {
              items.push(item);
            }
            
            // Break once we have 3 items
            if (items.length >= 3) break;
          }
        }
        
        // Break once we have 3 items
        if (items.length >= 3) break;
      }
    }
    
    // If we don't have 3 items with real images, add placeholders
    while (items.length < 3) {
      items.push({
        name: `Featured ${items.length + 1}`,
        // No image will trigger our placeholder component
        image: "",
        price: "",
      });
    }
    
    setFeaturedItems(items);
  }, [section, sanityFeaturedItems]);

  return (
    <motion.div
      className="mb-24 max-w-6xl mx-auto"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      id={`menu-section-${section.section.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <motion.h2 
        className="text-3xl md:text-5xl font-display font-medium uppercase tracking-wider text-[#52371E] mb-6 text-center"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
      >
        {section.section}
      </motion.h2>
      
      {/* Featured items with images as sticker-like elements */}
      <div className="relative h-[340px] md:h-[380px] mb-14 overflow-visible">
        {featuredItems.map((item, idx) => {
          // Generate different positions and rotations for each sticker
          const leftPositions = ['5%', '35%', '65%'];
          const topPositions = ['15%', '5%', '18%'];
          const zIndex = [3, 2, 1];
          
          return (
            <motion.div
              key={idx}
              className="absolute w-[170px] md:w-[220px] rounded-xl bg-white shadow-xl"
              style={{
                left: leftPositions[idx],
                top: topPositions[idx],
                zIndex: zIndex[idx],
                transformOrigin: 'center center',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                border: '6px solid white'
              }}
              drag
              dragConstraints={{
                top: -50,
                left: -50,
                right: 50,
                bottom: 50,
              }}
              dragElastic={0.1}
              variants={imageVariants}
              custom={idx}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap={{ scale: 1.1, rotate: 0, cursor: 'grabbing' }}
            >
              <div className="aspect-[2/3] relative overflow-hidden rounded-md">
                {/* Check if the item has an imageUrl (from Sanity) or image (local) */}
                {(item.imageUrl || item.image) ? (
                  <>
                    {console.log(`Rendering image for ${item.name}:`, item.imageUrl || item.image)}
                    <Image
                      src={item.imageUrl || item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 200px, 220px"
                      className="object-cover"
                      priority={idx === 0}
                      unoptimized={true} // Prevent Next.js from optimizing Sanity images
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                  </>
                ) : (
                  <>
                    {console.log(`No image for ${item.name}, using placeholder`)}
                    <MenuPlaceholder index={idx} name={item.name} />
                  </>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-display text-xl md:text-2xl font-medium mb-1">{item.name}</h3>
                  
                  {item.description && (
                    <p className="text-white/90 text-sm line-clamp-2 mb-2">{item.description}</p>
                  )}
                  
                  {item.price && (
                    <p className="text-white font-medium text-lg">{item.price}</p>
                  )}
                  
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.tags.map((tag, tidx) => (
                        <span key={tidx} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Tape effect for sticker look */}
              <div className="absolute top-[-10px] left-[calc(50%-15px)] w-[30px] h-[20px] bg-[#ffffffaa] opacity-80 rounded-sm rotate-3 shadow-sm"></div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Main menu content */}
      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-md border border-gray-100 relative overflow-hidden mt-24 md:mt-16">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/paper-texture.png')] z-0"></div>
        
        {Array.isArray(section.categories) && section.categories.map((category, index) => (
          <MenuCategory 
            key={index} 
            category={category} 
            index={index} 
            isLastInSection={index === section.categories.length - 1} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default MenuSection;
