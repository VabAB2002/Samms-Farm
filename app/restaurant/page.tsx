import { getRestaurantMedia, getRestaurantGalleryImages } from '@/lib/sanity/api/restaurant';
import { MediaAsset } from '@/lib/sanity/api/media';
import RestaurantContent from './RestaurantContent';

export default async function RestaurantPage() {
  // Fetch media assets from Sanity
  const mediaAssets = await getRestaurantMedia();
  
  // Fetch restaurant gallery images
  const restaurantGalleryImages = await getRestaurantGalleryImages();
  
  // Find specific media assets by type
  const findMediaByType = (type: string): MediaAsset | undefined => {
    return mediaAssets.find(asset => asset.mediaType === type);
  };
  
  // Get specific media assets
  const heroVideo = findMediaByType('heroVideo');
  const heroImage = findMediaByType('heroImage');
  const interiorImage = findMediaByType('galleryImage');
  const exteriorImage = mediaAssets.find(asset => 
    asset.mediaType === 'galleryImage' && asset.title?.toLowerCase().includes('exterior'));
  
  // Get gallery images
  const galleryImages = mediaAssets.filter(asset => 
    asset.mediaType === 'galleryImage' && 
    !asset.title?.toLowerCase().includes('exterior'));
    
  return (
    <RestaurantContent
      mediaAssets={mediaAssets}
      restaurantGalleryImages={restaurantGalleryImages}
      heroVideo={heroVideo}
      heroImage={heroImage}
      interiorImage={interiorImage}
      exteriorImage={exteriorImage}
      galleryImages={galleryImages}
    />
  );
}
