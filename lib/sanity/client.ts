import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
  // This option enables the Sanity client to work without credentials
  // in development when not connected to a real Sanity project
  ignoreBrowserTokenWarning: true,
};

// Check if we have real Sanity credentials
export const hasSanityCredentials = () => {
  return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder-project-id';
};

// Create the client
export const sanityClient = createClient(config);

// Create a safe version of the fetch function that returns mock data when credentials are missing
export const safeFetch = async (query: string, params?: any) => {
  if (!hasSanityCredentials()) {
    console.log('Using mock Sanity data (no credentials provided)');
    return [];
  }
  
  try {
    return await sanityClient.fetch(query, params);
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    return [];
  }
};

const builder = imageUrlBuilder(sanityClient);

// Helper function to check if source exists and create proper image URL
export const urlFor = (source: any) => {
  if (!source) {
    // Create a dummy placeholder image with the same API
    const placeholderImage = builder.image('placeholder');
    // Override the URL function to return an empty image placeholder
    const originalUrl = placeholderImage.url;
    placeholderImage.url = () => 'https://via.placeholder.com/400x300?text=Image+Placeholder';
    return placeholderImage;
  }
  return builder.image(source);
};
