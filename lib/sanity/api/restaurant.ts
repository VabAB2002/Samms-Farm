import { safeFetch } from '../client';
import { getMediaAssetsByCategory } from './media';

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
