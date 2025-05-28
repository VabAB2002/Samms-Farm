"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaLeaf, FaStore, FaCalendarAlt } from 'react-icons/fa';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: custom * 0.2, ease: 'easeOut' }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    className="p-8 rounded-xl backdrop-blur-sm bg-cream-50/90 shadow-rustic overflow-hidden relative"
    variants={fadeIn}
    whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(120, 80, 40, 0.1), 0 10px 10px -5px rgba(120, 80, 40, 0.04)' }}
    transition={{ duration: 0.3 }}
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-terracotta-500 to-moss-500"></div>
    <div className="mb-6 text-terracotta-500 text-3xl">{icon}</div>
    <h3 className="text-xl font-serif text-brown-800 mb-3">{title}</h3>
    <p className="text-brown-700 leading-relaxed">{description}</p>
  </motion.div>
);

const SeasonCard = ({ season, items }: { season: string, items: string[] }) => (
  <motion.div 
    className="p-6 rounded-xl bg-gradient-to-br from-cream-50 to-cream-100 shadow-rustic"
    variants={fadeIn}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="font-serif text-xl text-brown-800 mb-4 border-b border-terracotta-200 pb-2">{season}</h3>
    <ul className="text-brown-700 space-y-2">
      {items.map((item, index) => (
        <motion.li 
          key={index}
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <span className="w-2 h-2 rounded-full bg-moss-500"></span>
          {item}
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

export default function FarmContent() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] mb-20">
        <div className="absolute inset-0 overflow-hidden rounded-b-3xl shadow-rustic-lg">
          <img 
            src="/images/farm.jpg" 
            alt="Samm's Living Farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-900/80 via-brown-800/40 to-transparent"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 container mx-auto">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-medium text-cream-50 mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Our Living
              </motion.span>
              <br />
              <motion.span 
                className="text-terracotta-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Sustainable Farm
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl text-cream-100 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              A working farm focused on sustainability, interdependence, and healing the land
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <motion.a 
                href="#tours" 
                className="px-6 py-3 bg-terracotta-500 text-cream-50 rounded-lg hover:bg-terracotta-600 transition-all shadow-rustic transform hover:scale-105 duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, backgroundColor: "#c4462e" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLeaf /> Explore the Farm
              </motion.a>
              <motion.a 
                href="#store" 
                className="px-6 py-3 border-2 border-moss-500 text-cream-50 rounded-lg hover:bg-moss-500/20 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 138, 86, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaStore /> Visit Farm Store
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-20">
        {/* Mission Section */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            variants={fadeIn}
            custom={0}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-medium text-brown-800 mb-6"
              variants={fadeIn}
              custom={1}
            >
              Our Sustainable Practices
            </motion.h2>
            <motion.div 
              className="w-24 h-[2px] bg-gradient-to-r from-terracotta-500 to-moss-500 mx-auto mb-6"
              variants={fadeIn}
              custom={2}
            />
            <motion.p 
              className="text-xl text-brown-700 leading-relaxed"
              variants={fadeIn}
              custom={3}
            >
              At Samm's Living Farm, we practice regenerative agriculture that works with nature rather than against it. 
              Our farm is a harmonious ecosystem where plants, animals, and people thrive together.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaSeedling />}
              title="Seasonal Tours"
              description="Join us for guided tours of the farm where you'll learn about our sustainable practices and see our diverse crops and heritage breed animals."
            />
            
            <FeatureCard 
              icon={<FaLeaf />}
              title="Farm Workshops"
              description="Learn practical skills from our farmers with hands-on workshops covering composting, seed saving, natural building, and more."
            />
            
            <FeatureCard 
              icon={<FaStore />}
              title="Farm Store"
              description="Visit our farm store to purchase fresh produce, pasture-raised meats, eggs, and artisanal products made right here on the farm."
            />
          </div>
        </motion.section>
        
        {/* Seasonal Produce Section */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-medium text-brown-800 mb-10 text-center"
            variants={fadeIn}
            custom={0}
          >
            What's Growing <span className="text-terracotta-500">This Season</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SeasonCard 
              season="Spring"
              items={["Asparagus", "Spring Greens", "Radishes", "Rhubarb", "Peas"]}
            />
            <SeasonCard 
              season="Summer"
              items={["Tomatoes", "Cucumbers", "Summer Squash", "Berries", "Sweet Corn"]}
            />
            <SeasonCard 
              season="Fall"
              items={["Pumpkins", "Winter Squash", "Apples", "Root Vegetables", "Brussels Sprouts"]}
            />
            <SeasonCard 
              season="Winter"
              items={["Kale", "Greenhouse Greens", "Stored Roots", "Preserved Foods", "Winter Herbs"]}
            />
          </div>
        </motion.section>
        
        {/* Visit Section */}
        <motion.section 
          className="max-w-4xl mx-auto bg-cream-100 p-8 md:p-12 rounded-2xl shadow-rustic relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#638A56" d="M45.4,-63.2C59.2,-54.7,71.1,-42.3,77.1,-27.1C83.1,-11.9,83.2,6.1,77.8,21.9C72.4,37.6,61.6,51.1,47.9,61.6C34.2,72,17.1,79.3,0,79.3C-17.1,79.4,-34.2,72.1,-46.7,61C-59.3,49.9,-67.3,35,-73.1,18.2C-79,1.4,-82.6,-17.2,-77,-32.6C-71.4,-48,-56.6,-60.2,-41.1,-67.8C-25.6,-75.5,-9.4,-78.6,4.5,-84.8C18.4,-91,36.8,-100.4,45.4,-63.2Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <motion.div variants={fadeIn} custom={0} className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-brown-800 mb-8 text-center">Visit the Farm</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <motion.div variants={fadeIn} custom={1} className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-terracotta-500"><FaStore /></div>
                  <div>
                    <h3 className="font-serif text-lg text-brown-800 mb-1">Farm Store Hours</h3>
                    <p className="text-brown-700">Friday - Sunday, 10am - 5pm</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-terracotta-500"><FaLeaf /></div>
                  <div>
                    <h3 className="font-serif text-lg text-brown-800 mb-1">Farm Tours</h3>
                    <p className="text-brown-700">Saturdays at 1pm (April - October)</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} custom={2} className="space-y-4">
                <div>
                  <h3 className="font-serif text-lg text-brown-800 mb-1">Location</h3>
                  <p className="text-brown-700">Jl. Canggu Padang Linjong No.58, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80351, Indonesia</p>
                </div>
                
                <div>
                  <h3 className="font-serif text-lg text-brown-800 mb-1">Contact</h3>
                  <p className="text-brown-700">+62 853-5369-5751</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex justify-center"
              variants={fadeIn}
              custom={3}
            >
              <motion.a 
                href="#booking" 
                className="px-8 py-3 bg-moss-600 text-cream-50 rounded-lg shadow-rustic-sm flex items-center gap-2"
                whileHover={{ scale: 1.05, backgroundColor: "#4b6a41" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCalendarAlt /> Book a Farm Experience
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
