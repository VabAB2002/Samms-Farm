import client from './client';
import { groq } from 'next-sanity';
import getSanityImageUrl from './image';

// Query to fetch all featured menu items with their images
export async function getFeaturedMenuItems() {
  console.log('Fetching featured menu items from Sanity');
  
  // First fetch raw items with full image references
  const rawItems = await client.fetch(
    groq`*[_type == "menuItem" && featured == true] {
      _id,
      name,
      description,
      price,
      image,
      tags,
      popular,
      soldOut,
      section,
      category,
      featured
    }`
  );
  
  console.log('Raw featured menu items from Sanity:', rawItems);
  
  // Process the images with our helper
  const result = rawItems.map(item => ({
    ...item,
    imageUrl: item.image ? getSanityImageUrl(item.image) : null
  }));
  
  console.log('Processed featured menu items with images:', result);
  return result;
}

// Query to fetch a specific menu item by ID
export async function getMenuItemById(id) {
  return await client.fetch(
    groq`*[_type == "menuItem" && _id == $id][0]`,
    { id }
  );
}

// Query to fetch menu items by section
export async function getMenuItemsBySection(section) {
  return await client.fetch(
    groq`*[_type == "menuItem" && section == $section] {
      _id,
      name,
      description,
      price,
      "image": image.asset->url,
      tags,
      popular,
      soldOut,
      category,
      variants
    }`,
    { section }
  );
}

// Query to fetch all menu items
export async function getAllMenuItems() {
  return await client.fetch(
    groq`*[_type == "menuItem"] | order(section asc, category asc) {
      _id,
      name,
      description,
      price,
      "image": image.asset->url,
      tags,
      popular,
      soldOut,
      section,
      category,
      variants
    }`
  );
}
