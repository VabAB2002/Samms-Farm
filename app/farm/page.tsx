import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Farm | Samm's Farm",
  description: "Our working farm focused on sustainability, interdependence, and healing the land."
};

export default function FarmPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12 md:py-20">
        <section className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-medium text-brown-800 mb-4">
              Our Farm
            </h1>
            <div className="w-24 h-[2px] bg-terracotta-600 mx-auto mb-6" />
            <p className="text-xl text-brown-700 max-w-2xl mx-auto">
              A working farm focused on sustainability, interdependence, and healing the land.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="rounded-lg overflow-hidden h-[400px]">
              <img 
                src="/images/farm.jpg" 
                alt="Samm's Living Farm"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-serif text-brown-800 mb-4">Our Sustainable Practices</h2>
              <p className="text-brown-700 mb-6">
                At Samm's Living Farm, we practice regenerative agriculture that works with nature rather than against it. Our farm is a harmonious ecosystem where plants, animals, and people thrive together.
              </p>
              <p className="text-brown-700">
                We focus on soil health, biodiversity, and water conservation. By avoiding synthetic fertilizers and pesticides, we produce nutrient-dense food while improving the land for future generations.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-cream-100 p-6 rounded-lg">
              <div className="w-16 h-16 bg-terracotta-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M12 7V13L15 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-serif text-brown-800 text-center mb-2">Seasonal Tours</h3>
              <p className="text-brown-700 text-center">
                Join us for guided tours of the farm where you'll learn about our sustainable practices and see our diverse crops and heritage breed animals.
              </p>
            </div>
            
            <div className="bg-cream-100 p-6 rounded-lg">
              <div className="w-16 h-16 bg-terracotta-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C2 10 5.5 14 12 14C18.5 14 22 10 22 10M15 14.5L16 17.5M9 14.5L8 17.5M17.5 6.5L16 9.5M6.5 6.5L8 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-serif text-brown-800 text-center mb-2">Farm Workshops</h3>
              <p className="text-brown-700 text-center">
                Learn practical skills from our farmers with hands-on workshops covering composting, seed saving, natural building, and more.
              </p>
            </div>
            
            <div className="bg-cream-100 p-6 rounded-lg">
              <div className="w-16 h-16 bg-terracotta-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-serif text-brown-800 text-center mb-2">Farm Store</h3>
              <p className="text-brown-700 text-center">
                Visit our farm store to purchase fresh produce, pasture-raised meats, eggs, and artisanal products made right here on the farm.
              </p>
            </div>
          </div>
          
          <div className="bg-brown-100 p-8 rounded-lg mb-20">
            <h2 className="text-3xl font-display text-brown-800 mb-6 text-center">Seasonal Produce</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="font-serif text-xl text-brown-800 mb-3">Spring</h3>
                <ul className="text-brown-700">
                  <li>Asparagus</li>
                  <li>Spring Greens</li>
                  <li>Radishes</li>
                  <li>Rhubarb</li>
                  <li>Peas</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl text-brown-800 mb-3">Summer</h3>
                <ul className="text-brown-700">
                  <li>Tomatoes</li>
                  <li>Cucumbers</li>
                  <li>Summer Squash</li>
                  <li>Berries</li>
                  <li>Sweet Corn</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl text-brown-800 mb-3">Fall</h3>
                <ul className="text-brown-700">
                  <li>Pumpkins</li>
                  <li>Winter Squash</li>
                  <li>Apples</li>
                  <li>Root Vegetables</li>
                  <li>Brussels Sprouts</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl text-brown-800 mb-3">Winter</h3>
                <ul className="text-brown-700">
                  <li>Kale</li>
                  <li>Greenhouse Greens</li>
                  <li>Stored Roots</li>
                  <li>Preserved Foods</li>
                  <li>Winter Herbs</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-brown-800 mb-6">Visit the Farm</h2>
            <p className="text-brown-700 mb-2"><strong>Farm Store Hours:</strong> Friday - Sunday, 10am - 5pm</p>
            <p className="text-brown-700 mb-2"><strong>Farm Tours:</strong> Saturdays at 1pm (April - October)</p>
            <p className="text-brown-700 mb-2"><strong>Location:</strong> Jl. Canggu Padang Linjong No.58, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80351, Indonesia</p>
            <p className="text-brown-700 mb-6"><strong>Phone:</strong> +62 853-5369-5751</p>
            <a href="#" className="inline-block px-6 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700 transition-colors">Book a Farm Experience</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
