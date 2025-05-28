import Image from 'next/image';
import { client } from '../../../sanity/lib/client'; 
import { groq } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Define types for better type safety
type MenuItem = {
  _id: string;
  name: string;
  description?: string;
  price?: string;
  imageUrl?: string;
  image?: any;
  featured?: boolean;
  section?: string;
  tags?: string[];
  popular?: boolean;
  soldOut?: boolean;
};

// Format a Sanity image using the imageUrlBuilder
function getSanityImageUrl(image: any) {
  if (!image || !image.asset) {
    return null;
  }
  
  // Create a URL builder from the Sanity client
  const builder = imageUrlBuilder(client);
  
  return builder.image(image)
    .width(800)
    .quality(90)
    .url();
}

// Fetch menu items from Sanity with more debugging info
async function getAllMenuItems() {
  // Get ALL menu items regardless of featured status
  console.log('Fetching ALL menu items from Sanity directly...');
  const result = await client.fetch(
    // Use a simple query without any filters to get all menu items
    groq`*[_type == "menuItem"] {
      _id,
      name,
      description,
      price,
      image,
      featured,
      section,
      tags,
      popular,
      soldOut
    }`
  );
  
  // Process the images and add URLs
  const itemsWithImages = result.map((item: any) => ({
    ...item,
    // Try to generate image URL using the helper
    imageUrl: item.image ? getSanityImageUrl(item.image) : null,
  }));
  
  console.log('Processed menu items:', JSON.stringify(itemsWithImages, null, 2));
  return itemsWithImages;
}

export default async function SandboxPage() {
  const menuItems = await getAllMenuItems();
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Sanity Menu Items Sandbox</h1>
      
      <div className="mb-8 p-4 bg-yellow-50 border border-yellow-300 rounded">
        <h2 className="text-xl font-semibold mb-2">Debug Info:</h2>
        <p>Total items found: {menuItems.length}</p>
        <p>Featured items: {menuItems.filter((item: MenuItem) => item.featured).length}</p>
        <p>Items with images: {menuItems.filter((item: MenuItem) => !!item.imageUrl).length}</p>
      </div>

      <div className="mb-8 p-4 bg-blue-50 border border-blue-300 rounded">
        <h2 className="text-xl font-semibold mb-2">Raw Image Data:</h2>
        <div className="overflow-auto max-h-60 text-xs">
          <pre className="whitespace-pre-wrap break-all">
            {JSON.stringify(menuItems.map((item: MenuItem) => ({
              name: item.name, 
              featured: item.featured,
              imageUrl: item.imageUrl,
              image: item.image
            })), null, 2)}
          </pre>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item: MenuItem) => (
          <div 
            key={item._id} 
            className={`border rounded-lg overflow-hidden shadow-md ${
              item.featured ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
            }`}
          >
            {item.imageUrl ? (
              <div className="relative h-48">
                <Image
                  src={item.imageUrl}
                  alt={item.name || 'Menu item'}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="bg-gray-100 h-48 flex flex-col items-center justify-center p-2">
                <p className="text-gray-500 text-center mb-2">No image URL</p>
                {item.image ? (
                  <div className="text-xs text-red-500 text-center">
                    Image object exists but URL is missing
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 text-center">
                    No image object in item
                  </div>
                )}
              </div>
            )}
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{item.name}</h3>
                {item.featured && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Featured</span>
                )}
              </div>
              
              <p className="text-gray-700 mt-1">{item.description}</p>
              
              <div className="mt-3 flex justify-between items-center">
                <span className="font-medium text-indigo-600">{item.price}</span>
                <span className="text-sm text-gray-500">{item.section}</span>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-1">
                {item.popular && (
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Popular</span>
                )}
                {item.soldOut && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Sold Out</span>
                )}
                {item.tags?.map((tag: string, idx: number) => (
                  <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
