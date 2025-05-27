"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Wheat, ShoppingBasket, Utensils, Landmark, BookOpen, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Logo path
  const logoUrl = '/images/sam-farm-logo.jpg';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Split navigation items into left and right groups for balanced layout
  const leftNavItems = [
    { name: 'Restaurant', icon: <Utensils size={18} />, href: '/restaurant' },
    { name: 'Farm', icon: <Wheat size={18} />, href: '/farm' },
    { name: 'Resort', icon: <Landmark size={18} />, href: '/resort' },
  ];
  
  const rightNavItems = [
    { name: 'Shop', icon: <ShoppingBasket size={18} />, href: '/shop' },
    { name: 'Blog', icon: <BookOpen size={18} />, href: '/blog' },
    { name: 'Newsletter', icon: <Mail size={18} />, href: '/newsletter' },
  ];
  
  // Combined nav items for mobile menu
  const navItems = [...leftNavItems, ...rightNavItems];

  // Hover animation variants for underline
  const underlineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: '100%', opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-white/95 backdrop-blur-sm py-3'
      }`}
    >
      {/* Desktop Header */}
      <div className="container mx-auto px-4 md:px-6 hidden md:flex items-center justify-between h-16 max-w-7xl">
        {/* Left navigation */}
        <nav className="flex-1 flex justify-end items-center">
          <div className="flex items-center space-x-10 mr-12">
            {leftNavItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`relative px-1 py-2 transition-all duration-300 ease-in-out flex items-center gap-2 group ${
                  pathname === item.href 
                    ? 'text-terracotta-700 font-medium' 
                    : 'text-brown-800 hover:text-terracotta-600'
                }`}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="transition-all duration-300 ease-in-out text-terracotta-600 group-hover:text-terracotta-700">
                  {item.icon}
                </span>
                <span className="font-sketchy tracking-wide">{item.name}</span>
                {pathname === item.href ? (
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-terracotta-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-terracotta-400/80 rounded-full"
                    initial="hidden"
                    animate={hoveredItem === item.name ? "visible" : "hidden"}
                    variants={underlineVariants}
                  />
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Center Logo */}
        <Link 
          href="/"
          className="flex items-center justify-center z-10 hover:opacity-90 transition-all duration-300 transform hover:scale-105"
        >
          <div className="h-16 w-auto relative overflow-hidden">
            <Image 
              src={logoUrl}
              alt="Sam Farm Logo"
              width={140} 
              height={64}
              className="object-contain h-full w-auto"
              style={{ mixBlendMode: 'multiply' }}
              priority
            />
          </div>
        </Link>
        
        {/* Right navigation */}
        <nav className="flex-1 flex justify-start items-center">
          <div className="flex items-center space-x-10 ml-12">
            {rightNavItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`relative px-1 py-2 transition-all duration-300 ease-in-out flex items-center gap-2 group ${
                  pathname === item.href 
                    ? 'text-terracotta-700 font-medium' 
                    : 'text-brown-800 hover:text-terracotta-600'
                }`}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="transition-all duration-300 ease-in-out text-terracotta-600 group-hover:text-terracotta-700">
                  {item.icon}
                </span>
                <span className="font-sketchy tracking-wide">{item.name}</span>
                {pathname === item.href ? (
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-terracotta-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-terracotta-400/80 rounded-full"
                    initial="hidden"
                    animate={hoveredItem === item.name ? "visible" : "hidden"}
                    variants={underlineVariants}
                  />
                )}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Contact button - integrated into the header layout */}
      <div className="hidden md:block absolute top-1/2 right-6 z-20 -translate-y-1/2">
        <Link
          href="#contact"
          className="flex items-center gap-1.5 py-2 px-6 rounded-full bg-gradient-to-r from-terracotta-600 to-terracotta-700 text-white font-medium text-sm hover:shadow-lg hover:from-terracotta-700 hover:to-terracotta-800 active:scale-95 transition-all duration-300 ease-in-out"
        >
          <span className="font-farm tracking-wide">Contact Us</span>
          <ChevronDown size={14} className="ml-1" />
        </Link>
      </div>
      
      {/* Mobile Header */}
      <div className="container mx-auto px-4 md:hidden flex justify-between items-center h-14">
        {/* Mobile brand logo */}
        <Link 
          href="/" 
          className="flex items-center py-1"
        >
          <div className="h-10 w-auto relative overflow-hidden">
            <Image 
              src={logoUrl}
              alt="Sam Farm Logo"
              width={100} 
              height={40}
              className="object-contain h-full w-auto"
              style={{ mixBlendMode: 'multiply' }}
              priority
            />
          </div>
        </Link>

        {/* Contact shortcut on mobile */}
        <Link
          href="#contact"
          className="px-3 py-1.5 rounded-full bg-terracotta-600/90 text-white text-xs font-medium shadow-sm active:scale-95 transition-all duration-300 ease-in-out"
        >
          <span className="font-farm tracking-wide">Contact</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="p-2 rounded-full text-brown-800 hover:bg-brown-50 active:bg-brown-100 transition-all duration-300 ease-in-out shadow-sm"
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
            className="md:hidden fixed inset-0 z-50 bg-brown-900/30 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute right-0 top-0 h-screen w-4/5 bg-white shadow-2xl rounded-l-2xl overflow-hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex justify-end p-4">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-brown-800 hover:bg-brown-50 rounded-full shadow-sm"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-4 py-3 mb-6 flex items-center justify-center">
                <div className="h-14 w-auto overflow-hidden">
                  <Image 
                    src={logoUrl}
                    alt="Sam Farm Logo"
                    width={120} 
                    height={48}
                    className="object-contain h-full w-auto"
                    style={{ mixBlendMode: 'multiply' }}
                    priority
                  />
                </div>
              </div>

              <nav className="px-4 py-2 max-h-[calc(100vh-220px)] overflow-y-auto">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3.5 mb-2 rounded-xl transition-all duration-200 ease-in-out ${
                        pathname === item.href 
                          ? 'text-terracotta-700 bg-terracotta-50/80 font-medium shadow-sm' 
                          : 'text-brown-800 hover:text-terracotta-600 hover:bg-brown-50/70'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mr-4 text-terracotta-600 bg-white p-2 rounded-lg shadow-sm">{item.icon}</span>
                      <span className="font-sketchy">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-brown-100/50 bg-gradient-to-t from-white to-transparent pt-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <Link
                    href="#contact"
                    className="flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-terracotta-600 to-terracotta-700 text-white hover:from-terracotta-700 hover:to-terracotta-800 rounded-xl transition-all duration-300 ease-in-out font-medium shadow-lg w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Contact Us</span>
                    <ChevronDown size={16} />
                  </Link>
                </motion.div>

                <div className="mt-6 text-center text-brown-500 text-xs">
                  <p>© {new Date().getFullYear()} <span className="font-farm tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">Samm's Farm</span></p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Glass effect border at bottom for non-scrolled state */}
      {!isScrolled && (
        <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-gradient-to-r from-brown-100/10 via-brown-200/30 to-brown-100/10"></div>
      )}
    </header>
  );
};

export default Header;
