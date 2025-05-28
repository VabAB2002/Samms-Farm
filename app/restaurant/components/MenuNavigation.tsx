"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuNavigationProps {
  sectionNames: string[];
  activeSection: string | null;
  setActiveSection: (section: string) => void;
  scrollToSection: (sectionId: string) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  isSticky: boolean;
}

const MenuNavigation: React.FC<MenuNavigationProps> = ({
  sectionNames,
  activeSection,
  setActiveSection,
  scrollToSection,
  isMobileNavOpen,
  setIsMobileNavOpen,
  isSticky
}) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden w-full flex justify-between items-center">
        <h3 className="font-medium text-brown-800">Menu Sections</h3>
        <button 
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="px-4 py-2 bg-terracotta-100 text-terracotta-700 rounded-full transition-colors hover:bg-terracotta-200"
        >
          {isMobileNavOpen ? 'Close' : 'Browse Sections'}
        </button>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex overflow-x-auto py-1 gap-3 no-scrollbar">
        {sectionNames.map((section, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveSection(section);
              scrollToSection(section);
            }}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeSection === section
                ? 'bg-terracotta-100 text-terracotta-800'
                : 'text-brown-700 hover:bg-cream-100'
            }`}
          >
            {section}
          </button>
        ))}
      </div>
      
      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden mt-5"
          >
            <div className="flex flex-col gap-2.5 bg-cream-50 p-5 rounded-lg border border-cream-200 shadow-sm">
              {sectionNames.map((section, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveSection(section);
                    scrollToSection(section);
                  }}
                  className={`text-left px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                    activeSection === section
                      ? 'bg-terracotta-100 text-terracotta-800 border border-terracotta-200'
                      : 'text-brown-700 hover:bg-cream-200 border border-transparent'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuNavigation;
