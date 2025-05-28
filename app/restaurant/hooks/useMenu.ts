"use client";

import { useEffect, useState, useMemo } from 'react';
import { Menu, Section, DietaryFilter } from '../types/menu';
import menuData from '../data/menu.json';

export const useMenu = () => {
  const [menu, setMenu] = useState<Menu>(menuData as Menu);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<DietaryFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Set initial active section on load
  useEffect(() => {
    if (menu.menu.length > 0 && !activeSection) {
      setActiveSection(menu.menu[0].section);
    }
  }, [menu, activeSection]);

  // Filter menu items based on dietary preferences and search term
  const filteredMenu = useMemo(() => {
    // For now, we're returning the full menu since we don't have dietary tags in the data
    // In a real implementation, you would filter based on tags
    
    // If there's a search term, filter across all sections
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      
      // Deep copy menu to avoid mutations
      const menuCopy = JSON.parse(JSON.stringify(menu)) as Menu;
      
      // Filter each section's categories and items
      menuCopy.menu = menuCopy.menu.map(section => {
        // Make sure categories exist
        if (!section.categories || !Array.isArray(section.categories)) {
          section.categories = [];
          return section;
        }
        
        // Filter categories to only include those with matching items
        section.categories = section.categories.map(category => {
          // Make sure items exist before filtering
          if (!category.items || !Array.isArray(category.items)) {
            category.items = [];
            return category;
          }
          
          // Filter items in each category
          category.items = category.items.filter(item => 
            item && item.name && item.name.toLowerCase().includes(searchLower) || 
            (item && item.description && item.description.toLowerCase().includes(searchLower))
          );
          return category;
        }).filter(category => category.items && category.items.length > 0);
        
        return section;
      }).filter(section => section.categories.length > 0);
      
      return menuCopy;
    }
    
    return menu;
  }, [menu, activeFilter, searchTerm]);

  // Get current visible section
  const currentSection = useMemo(() => {
    if (!activeSection) return null;
    return filteredMenu.menu.find(section => section.section === activeSection) || null;
  }, [filteredMenu, activeSection]);

  // Get all section names for navigation
  const sectionNames = useMemo(() => {
    return menu.menu.map(section => section.section);
  }, [menu]);

  return {
    menu: filteredMenu,
    currentSection,
    sectionNames,
    activeSection,
    setActiveSection,
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
  };
};
