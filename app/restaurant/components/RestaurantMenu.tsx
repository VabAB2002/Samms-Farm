"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Menu from './Menu';

export default function RestaurantMenu() {
  return (
    <motion.section
      id="menu"
      className="py-16 md:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <Menu />
    </motion.section>
  );
}
