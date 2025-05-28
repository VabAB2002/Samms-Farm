"use client";

import React from 'react';
import { motion } from 'framer-motion';

const MenuHeader: React.FC = () => {
  return (
    <div className="text-center mb-14 pt-20">
      <motion.div
        className="relative inline-block mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-terracotta-400 to-transparent"></div>
        <motion.h2 
          className="text-4xl md:text-5xl font-display font-medium text-brown-800"
        >
          Our <span className="text-terracotta-500">Menu</span>
        </motion.h2>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-terracotta-300 to-transparent"></div>
      </motion.div>
      
      <motion.p 
        className="text-brown-700 max-w-3xl mx-auto mb-10 leading-relaxed text-base"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Crafted with care, straight from our farm to your table. At SammsFarm, we take pride in serving 
        dishes made with the freshest ingredients, sourced directly from our plantations.
      </motion.p>
    </div>
  );
};

export default MenuHeader;
