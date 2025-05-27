/**
 * Sanity Client
 * Creates and configures the Sanity client for use throughout the application
 */
import { createClient, ClientConfig, ClientPerspective } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mfp8ghll';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

// Sanity configuration
export const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  // Prevents browser console warnings in development when no projectId is set
  ignoreBrowserTokenWarning: true,
  // Log only in development
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published' as ClientPerspective,
};

// Create client
export const client = createClient(config);

// Create a safe version of fetch that returns mock data when credentials are missing
export const sanityFetch = async <T>(
  query: string, 
  params?: Record<string, any>,
  options: { cache?: RequestCache; next?: { revalidate?: number } } = {}
): Promise<T> => {
  const { cache = 'force-cache', next = { revalidate: 60 } } = options;
  
  try {
    if (!projectId || projectId === 'placeholder-project-id') {
      console.warn('Using mock Sanity data (no credentials provided)');
      return [] as unknown as T;
    }

    return client.fetch<T>(query, params || {}, {
      cache,
      next,
    });
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    return [] as unknown as T;
  }
};

// Image URL builder
export const imageBuilder = imageUrlBuilder(client);

// Helper to get image URL
export const urlFor = (source: SanityImageSource) => {
  if (!source) {
    return {
      url: () => 'https://via.placeholder.com/400x300?text=Image+Not+Available',
      width: () => urlFor({ _type: 'image', asset: { _ref: '' } }),
      height: () => urlFor({ _type: 'image', asset: { _ref: '' } }),
      auto: () => urlFor({ _type: 'image', asset: { _ref: '' } }),
      format: () => urlFor({ _type: 'image', asset: { _ref: '' } }),
      quality: () => urlFor({ _type: 'image', asset: { _ref: '' } }),
    };
  }
  return imageBuilder.image(source);
};
