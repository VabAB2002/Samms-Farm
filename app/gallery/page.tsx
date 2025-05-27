import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MediaGallery from '../components/MediaGallery';
import NewsletterForm from '../components/NewsletterForm';
import { getSiteSettings, getMediaByCategory } from '@/lib/sanity/queries';

// Generate metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  
  return {
    title: `Gallery | ${siteSettings?.siteName || "Samm's Farm Kitchen & Brewery"}`,
    description: 'Explore our gallery of farm, kitchen, and brewery images.',
    openGraph: {
      images: siteSettings?.ogImage ? [{
        url: `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${
          siteSettings.ogImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg')
        }`,
        width: 1200,
        height: 630,
        alt: `Gallery | ${siteSettings.siteName}`,
      }] : [],
    },
  };
}

export default async function GalleryPage() {
  // Fetch all media assets from different categories
  const [farmMedia, restaurantMedia, breweryMedia] = await Promise.all([
    getMediaByCategory('farm'),
    getMediaByCategory('restaurant'),
    getMediaByCategory('brewery'),
  ]);
  
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">Our Gallery</h1>
          <p className="text-lg md:text-xl text-amber-800 max-w-2xl mx-auto">
            Explore the beauty of our farm, the warmth of our kitchen, and the craft of our brewery through these images.
          </p>
        </div>
        
        {/* Farm Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="h-px flex-1 bg-amber-200"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 px-4">The Farm</h2>
            <div className="h-px flex-1 bg-amber-200"></div>
          </div>
          
          <p className="text-green-700 mb-6 text-center max-w-3xl mx-auto">
            Our sustainable farm is where it all begins - from the soil to the plants to the animals that call this place home.
          </p>
          
          <div className="bg-white bg-opacity-70 rounded-xl p-6 shadow-md border border-amber-100">
            <MediaGallery 
              assets={farmMedia} 
              layout="masonry" 
              showCaptions={true}
              imageSize="medium"
              className="mb-4"
            />
          </div>
        </section>
        
        {/* Restaurant Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="h-px flex-1 bg-amber-200"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 px-4">The Kitchen</h2>
            <div className="h-px flex-1 bg-amber-200"></div>
          </div>
          
          <p className="text-green-700 mb-6 text-center max-w-3xl mx-auto">
            Our kitchen transforms farm-fresh ingredients into delicious, nutritious meals that celebrate the seasons.
          </p>
          
          <div className="bg-white bg-opacity-70 rounded-xl p-6 shadow-md border border-amber-100">
            <MediaGallery 
              assets={restaurantMedia} 
              layout="grid" 
              showCaptions={true}
              imageSize="medium"
              className="mb-4"
            />
          </div>
        </section>
        
        {/* Brewery Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="h-px flex-1 bg-amber-200"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 px-4">The Brewery</h2>
            <div className="h-px flex-1 bg-amber-200"></div>
          </div>
          
          <p className="text-green-700 mb-6 text-center max-w-3xl mx-auto">
            Our small-batch brewery crafts unique beers using ingredients grown right here on our farm.
          </p>
          
          <div className="bg-white bg-opacity-70 rounded-xl p-6 shadow-md border border-amber-100">
            <MediaGallery 
              assets={breweryMedia} 
              layout="carousel" 
              showCaptions={true}
              imageSize="large"
              className="mb-4"
            />
          </div>
        </section>
        
        {/* Newsletter signup */}
        <section className="mt-12 mb-16 max-w-3xl mx-auto">
          <div className="relative">
            {/* Decorative grain texture in background */}
            <div className="absolute inset-0 bg-[url('/images/grain-texture.png')] opacity-10 rounded-xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="h-px flex-1 bg-amber-200"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-green-800 px-4">Stay Connected</h2>
                <div className="h-px flex-1 bg-amber-200"></div>
              </div>
              
              <div className="p-6">
                <div className="bg-green-900 rounded-xl p-6 shadow-lg">
                  <NewsletterForm 
                    darkMode={true}
                    title="Join Our Farm Family"
                    description="Subscribe to receive seasonal updates, special offers, and invitations to farm events."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
