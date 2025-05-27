import { safeFetch, sanityClient } from '../client';
import { getMediaAssetsByCategory } from './media';

// Types for restaurant gallery images
export type RestaurantGalleryImage = {
  _id: string;
  image: any;
  alt: string;
  order: number;
  caption?: string;
};

// Get all restaurant info
export async function getRestaurantInfo() {
  // This is a placeholder for future restaurant data schema
  // You can expand this to include menu items, hours, etc.
  const query = `
    *[_type == "restaurant"][0] {
      name,
      description,
      philosophy,
      hours,
      address,
      phone,
      email
    }
  `;
  
  return safeFetch(query);
}

// Get restaurant media assets
export async function getRestaurantMedia() {
  return getMediaAssetsByCategory('restaurant');
}

// Get restaurant gallery images
export async function getRestaurantGalleryImages(): Promise<RestaurantGalleryImage[]> {
  // Simplified query to test basic functionality
  const query = `
    *[_type == "restaurantGalleryImage"] {
      _id,
      image,
      alt,
      order,
      caption
    }
  `;
  
  try {
    console.log('Fetching restaurant gallery images with query:', query);
    const result = await sanityClient.fetch(query); // Using direct client instead of safeFetch
    console.log('Restaurant gallery images result:', result);
    return result || [];
  } catch (error) {
    console.error('Error fetching restaurant gallery images:', error);
    // Show the detailed error to help diagnose
    console.error('Error details:', JSON.stringify(error, null, 2));
    return [];
  }
}

// Get restaurant menu items
export async function getRestaurantMenu() {
  const query = `
    *[_type == "menuItem"] | order(category, title) {
      _id,
      title,
      description,
      price,
      category,
      dietary,
      featured,
      image
    }
  `;
  
  return safeFetch(query);
}

// Get restaurant testimonials
export async function getRestaurantTestimonials() {
  const query = `
    *[_type == "testimonial" && category == "restaurant"] {
      _id,
      quote,
      author,
      role,
      image
    }
  `;
  
  return safeFetch(query);
}
