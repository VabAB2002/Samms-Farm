"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMenu } from '../hooks/useMenu';

// Import modular components
import MenuHeader from './MenuHeader';
import SearchBar from './SearchBar';
import MenuNavigation from './MenuNavigation';
import DietaryFilters from './DietaryFilters';
import MenuContent from './MenuContent';
import ScrollToTopButton from './ScrollToTopButton';

export default function Menu() {
  const { 
    menu, 
    currentSection, 
    sectionNames, 
    activeSection, 
    setActiveSection,
    activeFilter, 
    setActiveFilter,
    searchTerm,
    setSearchTerm
  } = useMenu();
  
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle scroll for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && navRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        
        setIsSticky(scrollPosition > headerHeight);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // If searching, show all sections
    if (e.target.value.trim() && activeSection) {
      setActiveSection(null);
    } else if (!e.target.value.trim() && !activeSection && sectionNames.length > 0) {
      // If clearing search, reset to first section
      setActiveSection(sectionNames[0]);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    if (!activeSection && sectionNames.length > 0) {
      setActiveSection(sectionNames[0]);
    }
  };

  // Scroll to section when clicked in nav
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`menu-section-${sectionId.toLowerCase().replace(/\s+/g, '-')}`);
    if (element) {
      const yOffset = -100; // Adjust for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMobileNavOpen(false);
  };

  return (
    <div className="relative">
      {/* Menu Header */}
      <div ref={headerRef}>
        <MenuHeader />
        
        {/* Search Bar */}
        <SearchBar 
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          clearSearch={clearSearch}
        />
      </div>
      
      {/* Sticky Navigation & Filters */}
      <motion.div 
        ref={navRef}
        className={`z-20 py-5 transition-all duration-300 ${
          isSticky ? 'sticky top-0 backdrop-blur-sm border-b border-cream-100' : ''
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            {/* Menu Navigation */}
            <MenuNavigation 
              sectionNames={sectionNames}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              scrollToSection={scrollToSection}
              isMobileNavOpen={isMobileNavOpen}
              setIsMobileNavOpen={setIsMobileNavOpen}
              isSticky={isSticky}
            />
            
            {/* Dietary Filters */}
            <DietaryFilters 
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Menu Content */}
      <MenuContent 
        searchTerm={searchTerm}
        currentSection={currentSection}
        menu={menu}
        clearSearch={clearSearch}
      />
      
      {/* Scroll to Top Button */}
      <ScrollToTopButton isVisible={isSticky} />
    </div>
  );
}
