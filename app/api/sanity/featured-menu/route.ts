import { NextResponse } from 'next/server';
import client from '../../../../sanity/lib/client';
import { groq } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Helper function for Sanity image URLs
function getSanityImageUrl(image: any) {
  if (!image || !image.asset) {
    return null;
  }
  
  const builder = imageUrlBuilder(client);
  return builder.image(image).width(800).quality(90).url();
}

export async function GET() {
  try {
    console.log('API: Fetching featured menu items from Sanity');
    
    // First get the raw data including the image objects
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
        category
      }`
    );
    
    console.log('API: Raw featured menu items:', rawItems);
    
    // Process the images to generate proper URLs
    const result = rawItems.map((item: any) => {
      // Generate a proper image URL using the helper
      const imageUrl = item.image ? getSanityImageUrl(item.image) : null;
      
      return {
        ...item,
        imageUrl // Add the processed URL
      };
    });
    
    console.log('API: Processed featured menu items:', result);
    
    return NextResponse.json({ 
      success: true, 
      items: result,
      message: `Found ${result.length} featured menu items` 
    });
  } catch (error) {
    console.error('Error in featured-menu API:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch featured menu items',
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
