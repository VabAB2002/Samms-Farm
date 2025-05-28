"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GiCoffeeCup, GiWineGlass, GiCupcake } from 'react-icons/gi';
import { FaUtensils, FaGlassMartiniAlt } from 'react-icons/fa';
import { Category, MenuItem as MenuItemType } from '../types/menu';
import CategoryOptions from './CategoryOptions';

// Animation variants
const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

interface MenuCategoryProps {
  category: Category;
  index: number;
  isLastInSection?: boolean;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ category, index, isLastInSection }) => {
  // Safety check - if category doesn't have items array, initialize it
  if (!category || !category.items) {
    console.warn('Category missing items:', category);
    return null;
  }
  
  // Get appropriate icon based on category title
  const getCategoryIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('coffee')) return <GiCoffeeCup />;
    if (lowerTitle.includes('cocktail') || lowerTitle.includes('drink') || lowerTitle.includes('mocktail')) return <FaGlassMartiniAlt />;
    if (lowerTitle.includes('wine')) return <GiWineGlass />;
    if (lowerTitle.includes('dessert') || lowerTitle.includes('sweet')) return <GiCupcake />;
    return <FaUtensils />;
  };

  return (
    <motion.div
      className={`mb-16 relative ${!isLastInSection ? 'border-b border-dashed border-[#8C9A77]/30 pb-12' : ''}`}
      variants={categoryVariants}
      id={`menu-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 relative z-10">
        {/* Left Column - Category Info */}
        <div className="md:col-span-3 md:pr-6 relative">
          <motion.h3 
            className="text-2xl font-display font-medium text-[#52371E] uppercase tracking-wide flex items-center gap-3"
            variants={categoryVariants}
          >
            <span className="w-10 h-10 bg-[#8C9A77]/20 rounded-full flex items-center justify-center text-[#8C9A77] shadow-sm">
              {getCategoryIcon(category.title)}
            </span>
            {category.title}
          </motion.h3>
          
          {category.description && (
            <motion.p 
              className="text-[#52371E]/80 mt-4 text-sm leading-relaxed font-sans"
              variants={categoryVariants}
            >
              {category.description}
            </motion.p>
          )}

          {/* Base price if available */}
          {category.basePrice && (
            <motion.p className="text-[#52371E] mt-4 font-medium">
              Base price: {category.basePrice}
            </motion.p>
          )}
          
          {/* Vertical Divider Line (visible on desktop) */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#8C9A77]/0 via-[#8C9A77]/40 to-[#8C9A77]/0"></div>
        </div>
        
        {/* Right Column - Menu Items */}
        <div className="md:col-span-9 relative z-10">
          <motion.div 
            className="space-y-5" 
            variants={categoryVariants}
          >
            {Array.isArray(category.items) && category.items.map((item, idx) => (
              <MenuItemRow key={idx} item={item} idx={idx} />
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Options/Add-ons if available */}
      {category.options && (
        <div className="mt-8">
          <CategoryOptions options={category.options} />
        </div>
      )}
      
      {/* Promotional images removed */}
    </motion.div>
  );
};

// Menu Item Row Component with dot leaders
const MenuItemRow: React.FC<{ item: MenuItemType; idx: number }> = ({ item, idx }) => {
  return (
    <motion.div 
      className="relative"
      variants={itemVariants}
      id={`menu-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
      custom={idx}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-baseline gap-2 w-full group">
        {/* Item Name */}
        <h4 className="text-lg font-medium text-[#52371E] group-hover:text-[#8C9A77] transition-colors flex items-center flex-wrap gap-2">
          {item.name}
        </h4>
        
        {/* Dot Leaders */}
        <div className="flex-grow mx-2 h-[2px] border-b border-dotted border-[#52371E]/20 self-end mb-[0.5em]"></div>
        
        {/* Price */}
        {item.price && <span className="text-[#8C9A77] font-medium whitespace-nowrap">{item.price}</span>}
      </div>
      
      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 mt-1">
        {item.soldOut && 
          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100 shadow-sm">
            Sold Out
          </span>
        }
        {item.popular && 
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 shadow-sm">
            Popular
          </span>
        }
      </div>
      
      {/* Description */}
      {item.description && (
        <p className="text-[#52371E]/80 text-sm leading-relaxed mt-1">{item.description}</p>
      )}
      
      {/* Variants */}
      {item.variants && item.variants.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {item.variants.map((variant, vidx) => (
            <span key={vidx} className="text-xs inline-block bg-cream-100 text-brown-700 px-2.5 py-1 rounded-full shadow-sm border border-cream-200">
              {variant.name}: {variant.price}
            </span>
          ))}
        </div>
      )}
      
      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.tags.map((tag, tidx) => (
            <span key={tidx} className="text-xs inline-block bg-[#8C9A77]/10 text-[#8C9A77] px-2 py-0.5 rounded-full border border-[#8C9A77]/20">
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MenuCategory;
