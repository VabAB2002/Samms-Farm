import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { IoLeaf } from 'react-icons/io5';
import { FaUtensils, FaCalendarAlt } from 'react-icons/fa';
import { getRestaurantMedia } from '@/lib/sanity/api/restaurant';
import SanityImage from '@/components/media/SanityImage';
import SanityVideo from '@/components/media/SanityVideo';
import MediaGallery from '@/components/media/MediaGallery';
import { MediaAsset } from '@/lib/sanity/api/media';

export const metadata = {
  title: "Samm's Restaurant",
  description: "Farm-to-table café that serves fresh, wholesome meals with warmth and connection."
};

export default async function RestaurantPage() {
  // Fetch media assets from Sanity
  const mediaAssets = await getRestaurantMedia();
  
  // Find specific media assets by type
  const findMediaByType = (type: string): MediaAsset | undefined => {
    return mediaAssets.find(asset => asset.mediaType === type);
  };
  
  // Get specific media assets
  const heroImage = findMediaByType('heroImage');
  const interiorImage = findMediaByType('galleryImage');
  const exteriorImage = mediaAssets.find(asset => 
    asset.mediaType === 'galleryImage' && asset.title.toLowerCase().includes('exterior'));
  
  // Get gallery images
  const galleryImages = mediaAssets.filter(asset => 
    asset.mediaType === 'galleryImage' && 
    !asset.title.toLowerCase().includes('exterior'));
  return (
    <div className="min-h-screen bg-cream-50 bg-grain">
      <Header />
      <main className="py-12 md:py-20">
        <section className="container mx-auto px-4">
          {/* Hero section with editorial photography */}
          <div className="relative h-[70vh] mb-20 rounded-lg overflow-hidden shadow-rustic-lg">
            {heroImage ? (
              <SanityImage 
                image={heroImage.image} 
                alt={heroImage.altText || "Farm to table experience"} 
                fill
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src="/images/hero-farm-table.jpg" 
                alt="Farm to table experience" 
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brown-800/70 to-transparent flex flex-col justify-end p-8 md:p-12">
              <div className="max-w-2xl animate-fade-up">
                <h1 className="text-5xl md:text-6xl font-display font-medium text-cream-50 mb-4 leading-tight">
                  Healing the Land,<br />
                  <span className="text-terracotta-400">Nourishing People</span>
                </h1>
                <p className="text-xl text-cream-100 mb-8 leading-relaxed">
                  A farm-to-table journey of family, happiness, and connection
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#menu" className="px-6 py-3 bg-terracotta-500 text-cream-50 rounded-lg hover:bg-terracotta-600 transition-all shadow-rustic transform hover:scale-105 duration-300 flex items-center gap-2">
                    <FaUtensils /> Explore Our Menu
                  </a>
                  <a href="#reservation" className="px-6 py-3 border-2 border-moss-500 text-cream-50 rounded-lg hover:bg-moss-500/20 transition-all flex items-center gap-2">
                    <FaCalendarAlt /> Reserve a Table
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Left column (50%): Restaurant interior image */}
            <div className="rounded-natural overflow-hidden h-[600px] shadow-rustic transform hover:scale-[1.02] transition-all duration-500 border-4 border-cream-200">
              {interiorImage ? (
                <SanityImage 
                  image={interiorImage.image} 
                  alt={interiorImage.altText || "Samm's Restaurant interior"}
                  fill
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src="/images/restaurant-interior.jpg" 
                  alt="Samm's Restaurant interior"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {/* Right column (50%): Title and Philosophy */}
            <div className="flex flex-col justify-start md:pt-8 animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-display font-medium text-brown-700 mb-3">
                Samm&apos;s Restaurant
              </h1>
              <div className="w-24 h-[2px] bg-terracotta-500 mb-5" />
              <p className="text-xl text-brown-600 mb-8 leading-relaxed font-light">
                A farm-to-table café that serves fresh, wholesome meals with warmth and connection.
              </p>
              
              <h2 className="text-2xl font-serif text-brown-700 mb-3 flex items-center gap-2">
                <IoLeaf className="text-moss-500" /> Our Philosophy
              </h2>
              <div className="w-16 h-[1px] bg-terracotta-300 mb-5" />
              <p className="text-brown-600 mb-5 leading-relaxed">
                At Samm's Restaurant, we believe in the power of good food to bring people together. Our ingredients are sourced directly from our farm and local producers, ensuring the freshest, most nutritious meals possible.
              </p>
              <p className="text-brown-600 mb-6 leading-relaxed">
                Every dish tells a story of sustainable farming, thoughtful preparation, and the joy of sharing meals around a table. We invite you to experience the difference that fresh, responsibly-sourced ingredients make.
              </p>
              <a href="#about" className="text-terracotta-600 font-medium flex items-center gap-1 hover:text-terracotta-700 transition-colors self-start border-b-2 border-terracotta-200 hover:border-terracotta-500 pb-1">
                Learn more about our family farm <span>→</span>
              </a>
            </div>
          </div>
          
          <div id="menu" className="bg-cream-100 p-8 rounded-lg mb-20 shadow-rustic border border-cream-200 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 h-40 w-40 bg-moss-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-20 -left-20 h-48 w-48 bg-terracotta-100 rounded-full opacity-40"></div>
            <div className="relative z-10">
            <h2 className="text-3xl font-display text-brown-700 mb-3 text-center">Our Menu</h2>
            <p className="text-brown-600 text-center mb-6 italic">Seasonal & locally sourced</p>
            <div className="w-24 h-[2px] bg-moss-500 mx-auto mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
              <div className="border-b border-brown-200 pb-4">
                <h3 className="font-serif text-xl text-brown-700">Farm Breakfast</h3>
                <p className="text-brown-500 text-sm mb-2 font-light">Free-range eggs, herb-roasted potatoes, farm bacon, sourdough toast</p>
                <p className="text-moss-600 font-medium">$16</p>
              </div>
              <div className="border-b border-brown-200 pb-4">
                <h3 className="font-serif text-xl text-brown-700">Seasonal Vegetable Quiche</h3>
                <p className="text-brown-500 text-sm mb-2 font-light">With garden herbs, goat cheese, and mixed greens</p>
                <p className="text-moss-600 font-medium">$14</p>
              </div>
              <div className="border-b border-brown-200 pb-4">
                <h3 className="font-serif text-xl text-brown-700">Harvest Salad</h3>
                <p className="text-brown-500 text-sm mb-2 font-light">Fresh farm greens, seasonal vegetables, apple cider vinaigrette</p>
                <p className="text-moss-600 font-medium">$12</p>
              </div>
              <div className="border-b border-brown-200 pb-4">
                <h3 className="font-serif text-xl text-brown-700">Farm Burger</h3>
                <p className="text-brown-500 text-sm mb-2 font-light">Grass-fed beef, aged cheddar, caramelized onions, aioli, brioche bun</p>
                <p className="text-moss-600 font-medium">$18</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-brown-600 italic mb-4">Menu changes seasonally based on available farm ingredients</p>
              <a href="#" className="inline-block mt-2 px-6 py-3 bg-terracotta-500 text-white rounded-lg hover:bg-terracotta-600 transition-all shadow-rustic transform hover:scale-105 duration-300">View Full Menu</a>
            </div>
          </div>
          </div>
          
          <div id="reservation" className="mb-20">
            <h2 className="text-3xl font-display text-brown-700 mb-3 text-center">Hours & Location</h2>
            <p className="text-brown-600 text-center mb-3 italic">Come visit our farm</p>
            <div className="w-24 h-[2px] bg-terracotta-500 mx-auto mb-8" />
            
            <div className="bg-cream-50 p-8 rounded-lg shadow-rustic border border-cream-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="mb-6">
                    <h3 className="font-serif text-xl text-brown-700 mb-3 flex items-center gap-2">
                      <FaCalendarAlt className="text-terracotta-500" /> Opening Hours
                    </h3>
                    <div className="w-16 h-[1px] bg-terracotta-300 mb-4" />
                    <p className="text-brown-600 mb-2 leading-relaxed"><strong>Wednesday - Sunday:</strong> 8am - 9pm</p>
                    <p className="text-brown-600 mb-6 leading-relaxed"><strong>Monday - Tuesday:</strong> Closed</p>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-xl text-brown-700 mb-3 flex items-center gap-2">
                      <FaUtensils className="text-moss-500" /> Contact & Address
                    </h3>
                    <div className="w-16 h-[1px] bg-terracotta-300 mb-4" />
                    <p className="text-brown-600 mb-2 leading-relaxed">Jl. Canggu Padang Linjong No.58, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80351, Indonesia</p>
                    <p className="text-brown-600 mb-6 leading-relaxed"><strong>Phone:</strong> +62 853-5369-5751</p>
                    <a href="#reservation-form" className="inline-block px-6 py-3 bg-terracotta-500 text-white rounded-lg hover:bg-terracotta-600 transition-all shadow-rustic transform hover:scale-105 duration-300 font-medium">Make a Reservation</a>
                  </div>
                </div>
                
                <div className="rounded-natural overflow-hidden h-[550px] shadow-rustic order-first md:order-last border-4 border-cream-200 transform hover:scale-[1.02] transition-all duration-500">
                  {exteriorImage ? (
                    <SanityImage 
                      image={exteriorImage.image} 
                      alt={exteriorImage.altText || "Samm's Restaurant exterior view"}
                      fill
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src="/images/restaurant-exterior.jpg" 
                      alt="Samm's Restaurant exterior view"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Farm values section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-cream-100 p-6 rounded-lg shadow-rustic border border-cream-200 flex flex-col items-center text-center hover:shadow-rustic-lg transition-all transform hover:-translate-y-1 duration-300">
              <div className="h-16 w-16 bg-moss-100 rounded-full flex items-center justify-center mb-4">
                <IoLeaf className="text-3xl text-moss-600" />
              </div>
              <h3 className="font-serif text-xl text-brown-700 mb-3">Healing the Land</h3>
              <p className="text-brown-600 leading-relaxed">Our regenerative farming practices restore soil health and biodiversity, creating a sustainable ecosystem.</p>
            </div>
            
            <div className="bg-cream-100 p-6 rounded-lg shadow-rustic border border-cream-200 flex flex-col items-center text-center hover:shadow-rustic-lg transition-all transform hover:-translate-y-1 duration-300">
              <div className="h-16 w-16 bg-terracotta-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-terracotta-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-brown-700 mb-3">Family & Kindness</h3>
              <p className="text-brown-600 leading-relaxed">We believe in treating everyone like family—from our staff to our guests—creating a welcoming atmosphere of warmth and kindness.</p>
            </div>
            
            <div className="bg-cream-100 p-6 rounded-lg shadow-rustic border border-cream-200 flex flex-col items-center text-center hover:shadow-rustic-lg transition-all transform hover:-translate-y-1 duration-300">
              <div className="h-16 w-16 bg-brown-100 rounded-full flex items-center justify-center mb-4">
                <FaUtensils className="text-2xl text-brown-600" />
              </div>
              <h3 className="font-serif text-xl text-brown-700 mb-3">Nourishing Joy</h3>
              <p className="text-brown-600 leading-relaxed">Each meal is crafted not just to nourish the body, but to create moments of joy and connection around the table.</p>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="bg-cream-100 p-8 md:p-12 rounded-lg shadow-rustic border border-cream-200 mb-20 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 h-40 w-40 bg-terracotta-100 rounded-full opacity-40"></div>
            <div className="absolute -bottom-20 -left-20 h-48 w-48 bg-moss-100 rounded-full opacity-40"></div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <svg className="w-12 h-12 text-terracotta-300 mx-auto mb-4 opacity-80" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
              </svg>
              <p className="text-xl md:text-2xl text-brown-600 mb-8 leading-relaxed font-light italic">The moment we stepped into Samm's Restaurant, we felt like family. The food was not only delicious but made with such care you could taste the love in every bite.</p>
              <div className="w-16 h-[1px] bg-terracotta-300 mx-auto mb-6" />
              <p className="font-serif text-brown-700">Maria & John Sanders</p>
              <p className="text-brown-500 text-sm">Regular guests since 2019</p>
            </div>
          </div>
          
          {/* Gallery section using MediaGallery component */}
          {galleryImages.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl font-display text-brown-700 mb-3 text-center">Our Restaurant</h2>
              <p className="text-brown-600 text-center mb-3 italic">The farm-to-table experience</p>
              <div className="w-24 h-[2px] bg-moss-500 mx-auto mb-8" />
              
              <MediaGallery 
                mediaAssets={galleryImages}
                columns={3}
                gap="medium"
                aspectRatio="4:3"
                showCaptions={true}
              />
            </div>
          )}
          
          {/* Simple newsletter */}
          <div id="newsletter" className="bg-moss-500 p-8 md:p-12 rounded-lg shadow-rustic text-cream-50 mb-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-display mb-4">Join Our Farm-to-Table Community</h2>
              <p className="mb-6 opacity-90">Sign up for our newsletter to receive seasonal recipes, farm updates, and exclusive invitations to our special events.</p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input type="email" placeholder="Your email address" className="flex-grow px-4 py-3 rounded-lg focus:outline-none text-brown-700 bg-cream-50 border-2 border-transparent focus:border-terracotta-300" />
                <button type="submit" className="px-6 py-3 bg-terracotta-500 rounded-lg hover:bg-terracotta-600 transition-all shadow-rustic transform hover:scale-105 duration-300 whitespace-nowrap">Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
