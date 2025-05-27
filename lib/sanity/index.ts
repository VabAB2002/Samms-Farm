/**
 * Sanity Client Index
 * This file exports all Sanity-related functionality from a single location
 * to simplify imports and provide a unified API
 */

// Re-export from the standard client
export {
  config,
  client,
  sanityFetch,
  imageBuilder,
  urlFor
} from './sanityClient';

// Re-export from the legacy client for backward compatibility
export {
  safeFetch
} from './client';

// Re-export from the root sanity file for backward compatibility
export {
  getProducts,
  getProduct,
  getPosts,
  getPost
} from '../sanity';

// Re-export queries selectively to avoid naming conflicts
export { 
  getHome,
  getSiteSettings,
  getMediaByCategory
} from './queries';

// Re-export media API functions
export * from './api/media';

// Re-export product API functions but explicitly to avoid conflicts
export {
  getAllProducts,
  getProductBySlug,
  getFeaturedProducts
} from './api/products';
