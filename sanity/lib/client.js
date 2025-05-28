import { createClient } from 'next-sanity';

// Ensure we have the latest data by disabling CDN caching in development
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mfp8ghll',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-03-04',
  useCdn: false, // Always get fresh content
  perspective: 'published',
  token: process.env.SANITY_API_TOKEN, // Optional: Add if you have a token for more reliable preview
});

export default client;
