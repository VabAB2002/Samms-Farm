import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Samm's Resort - Coming Soon",
  description: "A mindful sanctuary in nature, built with purpose and presence for rejuvenation."
};

export default function ResortPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 md:py-20">
        <section className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-medium text-brown-800 mb-4">
              Samm&apos;s Nature Retreat
            </h1>
            <div className="w-24 h-[2px] bg-terracotta-600 mx-auto mb-6" />
            <p className="text-xl text-brown-700 max-w-2xl mx-auto">
              A mindful sanctuary in nature, built with purpose and presence for rejuvenation.
            </p>
          </div>
          
          <div className="bg-cream-100 rounded-lg p-10 mb-16 max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 bg-terracotta-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-3xl font-serif text-brown-800 mb-4">Coming Soon</h2>
            <p className="text-lg text-brown-700 mb-8">
              We're currently developing our nature retreat, where guests will soon be able to immerse themselves in the tranquility of our landscape while enjoying sustainable accommodations and wellness experiences.
            </p>
            <form className="max-w-md mx-auto">
              <p className="text-brown-700 mb-4">Sign up to be notified when we open for reservations:</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-md border border-brown-300 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-terracotta-600 text-white px-6 py-2 rounded-md hover:bg-terracotta-700 transition-colors"
                >
                  Notify Me
                </button>
              </div>
            </form>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="rounded-lg overflow-hidden h-[400px]">
              <img 
                src="/images/resort.jpg" 
                alt="Samm's Nature Retreat - Coming Soon"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-serif text-brown-800 mb-4">Our Vision</h2>
              <p className="text-brown-700 mb-6">
                Samm's Nature Retreat will be a place where guests can reconnect with nature, themselves, and each other. Our accommodations will be built using sustainable materials and designed to harmonize with the surrounding landscape.
              </p>
              <p className="text-brown-700">
                The retreat will feature wellness facilities, meditation spaces, and opportunities to engage with our working farm. Every aspect is being designed with intention to support rest, rejuvenation, and a deeper connection to the natural world.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-cream-50 p-6 rounded-lg border border-brown-200">
              <h3 className="text-xl font-serif text-brown-800 text-center mb-3">Sustainable Accommodations</h3>
              <p className="text-brown-700 text-center">
                Eco-friendly cabins and rooms built with natural materials, designed to minimize environmental impact while maximizing comfort.
              </p>
            </div>
            
            <div className="bg-cream-50 p-6 rounded-lg border border-brown-200">
              <h3 className="text-xl font-serif text-brown-800 text-center mb-3">Wellness Center</h3>
              <p className="text-brown-700 text-center">
                A sanctuary for mind and body with yoga spaces, massage treatments, and natural therapies using herbs from our gardens.
              </p>
            </div>
            
            <div className="bg-cream-50 p-6 rounded-lg border border-brown-200">
              <h3 className="text-xl font-serif text-brown-800 text-center mb-3">Farm-to-Table Dining</h3>
              <p className="text-brown-700 text-center">
                Exclusive dining experiences featuring the freshest ingredients from our farm, prepared with care by our skilled chefs.
              </p>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-brown-800 mb-6">Anticipated Opening</h2>
            <p className="text-brown-700 mb-2">We're working diligently to open our doors in Spring 2026.</p>
            <p className="text-brown-700 mb-2"><strong>Future Location:</strong> Jl. Canggu Padang Linjong No.58, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80351, Indonesia</p>
            <p className="text-brown-700 mb-6"><strong>Contact for Inquiries:</strong> +62 853-5369-5751</p>
            <a href="#" className="inline-block px-6 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700 transition-colors">Learn More About Our Progress</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
