"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearch } from 'react-icons/io5';
import MenuSection from './MenuSection';
import { Section as SectionType } from '../types/menu';

interface MenuContentProps {
  searchTerm: string;
  currentSection: SectionType | null;
  menu: { menu: SectionType[] };
  clearSearch: () => void;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const MenuContent: React.FC<MenuContentProps> = ({
  searchTerm,
  currentSection,
  menu,
  clearSearch
}) => {
  return (
    <div className="container mx-auto px-4 py-12">
      {searchTerm ? (
        <>
          {menu.menu.length > 0 ? (
            <>
              <div className="mb-8 bg-cream-50 p-4 rounded-lg border border-cream-200 inline-block shadow-sm mx-auto">
                <p className="text-brown-700 flex items-center gap-2">
                  <IoSearch className="text-terracotta-500" />
                  Showing results for: <span className="font-medium text-terracotta-600">{searchTerm}</span>
                </p>
              </div>
              
              {menu.menu.map((section, idx) => (
                <AnimatePresence key={idx} mode="wait">
                  <motion.div
                    key={section.section}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative"
                  >
                    <MenuSection section={section} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </>
          ) : (
            <div className="text-center py-20 bg-cream-50 rounded-xl border border-cream-200 shadow-sm max-w-2xl mx-auto">
              <p className="text-brown-700 mb-4 text-lg">No menu items found matching "{searchTerm}"</p>
              <button 
                onClick={clearSearch}
                className="text-terracotta-500 hover:text-terracotta-700 font-medium px-5 py-2 border border-terracotta-200 rounded-full bg-terracotta-50 transition-colors hover:bg-terracotta-100"
              >
                Clear search
              </button>
            </div>
          )}
        </>
      ) : currentSection ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection.section}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative"
          >
            <MenuSection section={currentSection} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="text-center py-20 bg-cream-50 rounded-xl border border-cream-200 shadow-sm max-w-2xl mx-auto">
          <p className="text-brown-700 mb-2">Please select a menu section</p>
        </div>
      )}
    </div>
  );
};

export default MenuContent;
