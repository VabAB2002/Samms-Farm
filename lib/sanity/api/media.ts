import { safeFetch } from '../client';
import { urlFor } from '../client';

// Types for media assets
export type MediaAsset = {
  _id: string;
  title: string;
  altText?: string;
  mediaType: 'heroImage' | 'galleryImage' | 'backgroundImage' | 'productImage' | 'video' | 'icon';
  category: 'homePage' | 'restaurant' | 'shop' | 'blog' | 'about';
  image?: any;
  video?: any;
  videoUrl?: string;
  caption?: string;
};

// Get all media assets
export async function getAllMediaAssets(): Promise<MediaAsset[]> {
  const query = `
    *[_type == "mediaAsset"] {
      _id,
      title,
      altText,
      mediaType,
      category,
      image,
      video,
      videoUrl,
      caption
    }
  `;
  
  return safeFetch(query);
}

// Get media assets by category
export async function getMediaAssetsByCategory(category: string): Promise<MediaAsset[]> {
  const query = `
    *[_type == "mediaAsset" && category == $category] {
      _id,
      title,
      altText,
      mediaType,
      category,
      image,
      video,
      videoUrl,
      caption
    }
  `;
  
  return safeFetch(query, { category });
}

// Get media assets by type
export async function getMediaAssetsByType(mediaType: string): Promise<MediaAsset[]> {
  const query = `
    *[_type == "mediaAsset" && mediaType == $mediaType] {
      _id,
      title,
      altText,
      mediaType,
      category,
      image,
      video,
      videoUrl,
      caption
    }
  `;
  
  return safeFetch(query, { mediaType });
}

// Get media assets by category and type
export async function getMediaAssetsByCategoryAndType(
  category: string, 
  mediaType: string
): Promise<MediaAsset[]> {
  const query = `
    *[_type == "mediaAsset" && category == $category && mediaType == $mediaType] {
      _id,
      title,
      altText,
      mediaType,
      category,
      image,
      video,
      videoUrl,
      caption
    }
  `;
  
  return safeFetch(query, { category, mediaType });
}

// Get a single media asset by ID
export async function getMediaAssetById(id: string): Promise<MediaAsset> {
  const query = `
    *[_type == "mediaAsset" && _id == $id][0] {
      _id,
      title,
      altText,
      mediaType,
      category,
      image,
      video,
      videoUrl,
      caption
    }
  `;
  
  return safeFetch(query, { id });
}

// Helper function to format a media asset to a usable form
export function formatMediaAsset(asset: MediaAsset) {
  // For images, return a URL using the urlFor helper
  if (asset.mediaType !== 'video' && asset.image) {
    return {
      ...asset,
      url: urlFor(asset.image).url(),
      // Add responsive image URLs for different sizes
      sizes: {
        small: urlFor(asset.image).width(400).url(),
        medium: urlFor(asset.image).width(800).url(),
        large: urlFor(asset.image).width(1200).url(),
      }
    };
  }
  
  // For videos, return either the file URL or the external URL
  if (asset.mediaType === 'video') {
    return {
      ...asset,
      url: asset.videoUrl || (asset.video ? urlFor(asset.video).url() : ''),
    };
  }
  
  return asset;
}
