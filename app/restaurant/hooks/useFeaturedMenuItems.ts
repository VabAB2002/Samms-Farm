"use client";

import { useState, useEffect } from 'react';
import { getFeaturedMenuItems } from '../../../sanity/lib/api';

// Define the interface for featured menu items from Sanity
export interface SanityMenuItem {
  _id: string;
  name: string;
  description?: string;
  price: string;
  image?: any; // The raw image object from Sanity
  imageUrl?: string; // The processed image URL for display
  tags?: string[];
  popular?: boolean;
  soldOut?: boolean;
  section?: string;
  category?: string;
}

export function useFeaturedMenuItems() {
  const [featuredItems, setFeaturedItems] = useState<SanityMenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeaturedItems() {
      try {
        setIsLoading(true);
        console.log('Attempting to fetch featured menu items...');
        
        // Fetch featured menu items from API endpoint directly
        const response = await fetch('/api/sanity/featured-menu');
        const data = await response.json();
        
        console.log('API response:', data);
        
        // Get the items from the response
        const items = data.items || [];
        
        // Check if we actually received items
        if (items && items.length > 0) {
          console.log('Setting featured items from Sanity API:', items);
          
          // Ensure the image field is properly set for backward compatibility
          const processedItems = items.map((item: any) => ({
            ...item,
            // Use imageUrl as the image field if present
            image: item.imageUrl || item.image
          }));
          
          setFeaturedItems(processedItems);
          setError(null);
        } else {
          console.warn('No featured items found in Sanity, using fallbacks');
          // No items found - use fallbacks
          setFeaturedItems(createFallbackItems());
        }
      } catch (err) {
        console.error('Error fetching featured menu items:', err);
        setError('Failed to load featured menu items');
        // Create fallback placeholder items
        setFeaturedItems(createFallbackItems());
      } finally {
        setIsLoading(false);
      }
    }

    loadFeaturedItems();
  }, []);
  
  // Helper function to create fallback items
  function createFallbackItems(): SanityMenuItem[] {
    return [
      {
        _id: 'placeholder-1',
        name: 'Featured Coffee',
        description: 'Our chef\'s special coffee selection',
        price: '35K',
        section: 'coffee'
      },
      {
        _id: 'placeholder-2',
        name: 'Signature Dish',
        description: 'Exquisite flavors crafted with care',
        price: '85K',
        section: 'food'
      },
      {
        _id: 'placeholder-3',
        name: 'Sweet Treat',
        description: 'Delicious dessert to complete your meal',
        price: '45K',
        section: 'desserts'
      }
    ];
  }

  return {
    featuredItems,
    isLoading,
    error
  };
}
