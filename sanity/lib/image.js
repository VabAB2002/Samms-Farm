import { urlForImage } from '@sanity/image-url';
import { client } from './client';

// Helper function to build complete image URLs from Sanity
export function getSanityImageUrl(image) {
  if (!image || !image.asset) {
    return null;
  }
  
  return urlForImage(image)
    .width(800)
    .quality(90)
    .url();
}

export default getSanityImageUrl;
