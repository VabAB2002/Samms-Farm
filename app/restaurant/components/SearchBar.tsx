"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { IoSearch, IoClose } from 'react-icons/io5';

interface SearchBarProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  handleSearchChange, 
  clearSearch 
}) => {
  return (
    <motion.div 
      className="relative max-w-md mx-auto"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <div className="relative drop-shadow-sm">
        <input
          type="text"
          placeholder="Search our menu..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-5 py-3.5 pl-12 rounded-full border border-cream-200 focus:border-terracotta-400 focus:outline-none bg-white/90 backdrop-blur-sm transition-all duration-300 text-brown-800"
        />
        <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brown-500 text-lg" />
        {searchTerm && (
          <button 
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-brown-400 hover:text-brown-600 transition-colors"
          >
            <IoClose className="text-lg" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;
