"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Wheat, ShoppingBasket, Utensils, Landmark, BookOpen, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Logo path
  const logoUrl = '/images/sam-farm-logo.jpg';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Split navigation items into left and right groups for balanced layout
  const leftNavItems = [
    { name: 'Restaurant', icon: <Utensils size={16} />, href: '/restaurant' },
    { name: 'Farm', icon: <Wheat size={16} />, href: '/farm' },
    { name: 'Resort', icon: <Landmark size={16} />, href: '/resort' },
  ];
  
  const rightNavItems = [
    { name: 'Shop', icon: <ShoppingBasket size={16} />, href: '/shop' },
    { name: 'Blog', icon: <BookOpen size={16} />, href: '/blog' },
    { name: 'Newsletter', icon: <Mail size={16} />, href: '/newsletter' },
  ];
  
  // Combined nav items for mobile menu
  const navItems = [...leftNavItems, ...rightNavItems];

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2' 
          : 'bg-white py-3'
      }`}
    >
      {/* Desktop Header */}
      <div className="container mx-auto px-4 md:px-6 hidden md:flex items-center justify-between h-16 max-w-6xl">
        {/* Left navigation */}
        <nav className="flex-1 flex justify-end items-center">
          <div className="flex items-center space-x-8 mr-12">
            {leftNavItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`relative px-1 py-1 transition-all duration-300 ease-in-out flex items-center gap-1.5 group ${
                  pathname === item.href 
                    ? 'text-terracotta-700 font-medium' 
                    : 'text-brown-800 hover:text-terracotta-600'
                }`}
              >
                <span className="transition-all duration-300 ease-in-out text-terracotta-600 group-hover:text-terracotta-700">
                  {item.icon}
                </span>
                <span className="font-medium tracking-wide">{item.name}</span>
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-terracotta-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Center Logo */}
        <Link 
          href="/"
          className="flex items-center justify-center z-10 hover:opacity-90 transition-opacity duration-300"
        >
          <div className="h-16 w-auto relative">
            <Image 
              src={logoUrl}
              alt="Sam Farm Logo"
              width={140} 
              height={64}
              className="object-contain h-full w-auto"
              style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))' }}
              priority
            />
          </div>
        </Link>
        
        {/* Right navigation */}
        <nav className="flex-1 flex justify-start items-center">
          <div className="flex items-center space-x-8 ml-12">
            {rightNavItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`relative px-1 py-1 transition-all duration-300 ease-in-out flex items-center gap-1.5 group ${
                  pathname === item.href 
                    ? 'text-terracotta-700 font-medium' 
                    : 'text-brown-800 hover:text-terracotta-600'
                }`}
              >
                <span className="transition-all duration-300 ease-in-out text-terracotta-600 group-hover:text-terracotta-700">
                  {item.icon}
                </span>
                <span className="font-medium tracking-wide">{item.name}</span>
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-terracotta-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Contact button - integrated into the header layout instead of floating */}
      <div className="hidden md:block absolute top-1/2 right-4 z-20 -translate-y-1/2">
        <Link
          href="#contact"
          className="flex items-center gap-1.5 py-1.5 px-5 rounded-md bg-terracotta-600 text-white font-medium text-sm hover:bg-terracotta-700 hover:shadow-md active:scale-95 transition-all duration-300 ease-in-out"
        >
          <span>Contact Us</span>
        </Link>
      </div>
      
      {/* Mobile Header */}
      <div className="container mx-auto px-4 md:hidden flex justify-between items-center">
        {/* Mobile brand logo */}
        <Link 
          href="/" 
          className="flex items-center py-1"
        >
          <div className="h-10 w-auto">
            <Image 
              src={logoUrl}
              alt="Sam Farm Logo"
              width={100} 
              height={40}
              className="object-contain h-full w-auto"
              style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))' }}
              priority
            />
          </div>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="p-2 rounded-md text-brown-800 hover:bg-brown-50 active:bg-brown-100 transition-all duration-300 ease-in-out"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-50 bg-brown-900/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute right-0 top-0 h-screen w-3/4 bg-white shadow-xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex justify-end p-4">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-brown-800 hover:bg-brown-50 rounded-full"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-4 py-2 mb-6 flex items-center justify-center">
                <div className="h-12 w-auto">
                  <Image 
                    src={logoUrl}
                    alt="Sam Farm Logo"
                    width={120} 
                    height={48}
                    className="object-contain h-full w-auto"
                    style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))' }}
                    priority
                  />
                </div>
              </div>

              <nav className="px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ease-in-out ${
                      pathname === item.href 
                        ? 'text-terracotta-700 bg-brown-50/80 font-medium' 
                        : 'text-brown-800 hover:text-terracotta-600 hover:bg-brown-50/50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3 text-terracotta-600">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>
              
              <div className="absolute bottom-safe-area-inset-bottom left-0 right-0 p-4">
                <Link
                  href="#contact"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-terracotta-600 text-white hover:bg-terracotta-700 rounded-lg transition-all duration-300 ease-in-out font-medium shadow-md w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Subtle bottom border */}
      <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-brown-100/50"></div>
    </header>
  );
};

export default Header;
