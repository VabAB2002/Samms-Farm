"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUtensils } from 'react-icons/fa';
import SanityImage from '@/components/media/SanityImage';
import { MediaAsset } from '@/lib/sanity/api/media';

interface ReservationSectionProps {
  exteriorImage: MediaAsset | undefined;
}

export default function ReservationSection({
  exteriorImage
}: ReservationSectionProps) {
  return (
    <motion.div 
      id="reservation"
      className="mb-20 bg-cream-100/80 backdrop-blur-sm p-8 md:p-12 rounded-natural shadow-rustic border-2 border-cream-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-display font-medium text-brown-800 text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Make a <span className="text-terracotta-500">Reservation</span>
      </motion.h2>
      
      <motion.p
        className="text-center text-brown-700 max-w-2xl mx-auto mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Join us for a memorable farm-to-table dining experience. We recommend making reservations in advance, especially for weekend dining.
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <span className="w-10 h-10 bg-terracotta-100 rounded-full flex items-center justify-center text-terracotta-600 mt-1">
              <FaCalendarAlt />
            </span>
            <div>
              <h3 className="text-xl font-medium text-brown-800 mb-2">Dining Hours</h3>
              <p className="text-brown-700 mb-1">Wednesday - Friday: 5:00 PM - 10:00 PM</p>
              <p className="text-brown-700 mb-1">Saturday: 11:00 AM - 10:00 PM</p>
              <p className="text-brown-700">Sunday: 11:00 AM - 8:00 PM</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="w-10 h-10 bg-moss-100 rounded-full flex items-center justify-center text-moss-600 mt-1">
              <FaUtensils />
            </span>
            <div>
              <h3 className="text-xl font-medium text-brown-800 mb-2">Special Events</h3>
              <p className="text-brown-700">We offer private dining and special event bookings. Contact us for details about hosting your next celebration at Samm's Farm Kitchen.</p>
            </div>
          </div>
          
          <div className="flex justify-start mt-4">
            <motion.a
              href="tel:+15551234567"
              className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta-500 text-cream-50 rounded-lg hover:bg-terracotta-600 transition-all shadow-rustic"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Call For Reservations
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          className="relative rounded-natural overflow-hidden h-[300px] md:h-[400px] shadow-rustic"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {exteriorImage ? (
            <SanityImage 
              image={exteriorImage.image} 
              alt={exteriorImage.altText || "Samm's Restaurant exterior"}
              fill
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src="/images/restaurant-exterior.jpg" 
              alt="Samm's Restaurant exterior"
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
