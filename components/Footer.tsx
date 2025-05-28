"use client";

import { Instagram, Mail, MapPin, Phone, Wheat, Heart } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-brown-700 text-cream-50/90 overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-15"></div>
      
      {/* Subtle top border */}
      <div className="h-1 w-full bg-gradient-to-r from-terracotta-500 via-moss-500 to-brown-500"></div>
      
      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Minimal logo and tagline */}
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-brown-600/40 p-2 rounded-lg">
              <Wheat size={24} className="text-cream-100" />
            </div>
            <div className="ml-3">
              <h2 className="font-farm text-2xl font-medium text-cream-50 tracking-wide transform -rotate-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">SAMM&apos;S</h2>
              <p className="text-xs tracking-wider text-cream-100/60">EST. 1982</p>
            </div>
          </div>
          <p className="max-w-md text-cream-100/70 text-sm font-serif italic">
            &quot;From our fields to your table, we grow with nature&apos;s rhythm.&quot;
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
          {/* Column 1: About */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-medium text-cream-50 mb-3 pb-1 border-b border-brown-600/50">
              About Us
            </h3>
            <p className="mb-4 text-cream-100/70 text-sm leading-relaxed">
              A family-owned farm and restaurant dedicated to sustainable practices that connect people with the land.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-cream-100/60">Follow us:</span>
              <a 
                href="https://instagram.com/sammsfarm" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brown-600/40 text-cream-100/90 hover:text-terracotta-300 hover:bg-brown-600/60 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
                aria-label="Follow us on Instagram"
                title="Follow us on Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-medium text-cream-50 mb-3 pb-1 border-b border-brown-600/50">
              Quick Links
            </h3>
            <ul className="space-y-1.5 text-sm">
              {[
                { name: 'Restaurant', path: '/restaurant' },
                { name: 'Farm', path: '/farm' },
                { name: 'Resort', path: '/resort' },
                { name: 'Shop', path: '/shop' },
                { name: 'Blog', path: '/blog' }
              ].map(({ name, path }) => (
                <li key={name}>
                  <Link 
                    href={path}
                    className="text-cream-100/70 hover:text-terracotta-300 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 h-[1px] bg-terracotta-400 mr-0 group-hover:w-3 group-hover:mr-1.5 transition-all duration-300"></span>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-medium text-cream-50 mb-3 pb-1 border-b border-brown-600/50">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin size={14} className="text-terracotta-300 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-cream-100/70">Jl. Canggu Padang Linjong No.58, Canggu, Bali 80351, Indonesia</span>
              </li>
              <li className="flex items-center">
                <Phone size={14} className="text-terracotta-300 mr-2 flex-shrink-0" />
                <span className="text-cream-100/70">+62 853-5369-5751</span>
              </li>
              <li className="flex items-center group">
                <Mail size={14} className="text-terracotta-300 mr-2 flex-shrink-0" />
                <a href="mailto:hello@sammsfarm.com" className="text-cream-100/70 hover:text-terracotta-300 transition-colors duration-300">hello@sammsfarm.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-medium text-cream-50 mb-3 pb-1 border-b border-brown-600/50">
              Newsletter
            </h3>
            <p className="mb-3 text-cream-100/70 text-sm leading-relaxed">
              Updates on seasonal farm-to-table offerings and events.
            </p>
            <form className="flex flex-col gap-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-3 py-2 bg-brown-600/40 text-cream-100 placeholder-cream-100/40 border border-brown-600/50 rounded-md focus:outline-none focus:border-terracotta-400 text-sm"
                />
              </div>
              <button 
                type="submit" 
                className="bg-terracotta-500 hover:bg-terracotta-600 py-2 px-3 rounded-md text-sm transition-colors duration-300 text-cream-50"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Simple divider */}
        <div className="border-t border-brown-600/30 my-5"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-cream-100/60 text-xs">
          <div className="flex items-center mb-3 md:mb-0">
            <Heart size={12} className="text-terracotta-400/70 mr-1.5" />
            <p>&copy; {currentYear} <span className="font-farm tracking-wide">Samm&apos;s Farm</span>. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-terracotta-300 transition-colors duration-300 text-xs">Privacy</a>
            <a href="#" className="hover:text-terracotta-300 transition-colors duration-300 text-xs">Terms</a>
            <a href="#" className="hover:text-terracotta-300 transition-colors duration-300 text-xs">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
