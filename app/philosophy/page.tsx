import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteSettings } from '@/lib/sanity/queries';

// Generate metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  
  return {
    title: `Our Philosophy | ${siteSettings?.siteName || "Samm's Farm"}`,
    description: "Discover the philosophy and values that drive our sustainable farming practices and approach to nourishing people.",
    openGraph: {
      images: siteSettings?.ogImage ? [{
        url: `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${
          siteSettings.ogImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg')
        }`,
        width: 1200,
        height: 630,
        alt: `Our Philosophy | ${siteSettings?.siteName}`,
      }] : [],
    },
  };
}

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-cream-50 relative overflow-hidden">
      {/* Subtle grain texture overlay for entire page */}
      <div className="fixed inset-0 bg-grain opacity-[0.07] pointer-events-none z-[1] mix-blend-overlay"></div>
      
      <Header />
      
      <main className="relative z-[2]">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brown-900/60 to-brown-900/30 z-10"></div>
          <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay z-10"></div>
          <Image
            src="/images/farm-philosophy-hero.jpg" 
            alt="Samm's Farm Philosophy"
            fill
            className="object-cover scale-[1.02]"
            priority
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6">
            <span className="inline-block px-4 py-1 rounded-full bg-terracotta-600/90 text-cream-50 text-sm mb-6 backdrop-blur-sm font-medium tracking-wide">Our Vision</span>
            <h1 className="text-5xl md:text-7xl font-farm text-cream-50 mb-6 drop-shadow-lg transform -rotate-[0.5deg]">
              Our Philosophy
            </h1>
            <p className="text-xl md:text-2xl text-cream-100 max-w-2xl font-sketchy tracking-wide drop-shadow-md">
              Healing the Land, Nourishing People
            </p>
          </div>
        </section>

        {/* Philosophy Video Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none z-[1] mix-blend-overlay"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-12">
                <div className="md:w-1/3">
                  <h2 className="text-3xl md:text-4xl font-farm text-terracotta-700 leading-tight">
                    Hear From <span className="block">Samm</span>
                  </h2>
                  <div className="h-1 w-20 bg-terracotta-500 mt-4 mb-6"></div>
                  <p className="text-brown-700 font-sketchy text-lg">
                    Watch as Samm shares our vision for sustainable farming and how our philosophy shapes everything we do.
                  </p>
                </div>
                <div className="md:w-2/3">
                  <div className="relative pt-[56.25%] bg-brown-900/5 rounded-lg overflow-hidden shadow-xl border border-terracotta-100/30 transform rotate-1">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/your-video-id-here" 
                      title="Samm's Farm Philosophy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
              <div className="text-center max-w-3xl mx-auto bg-cream-50 p-8 rounded-lg shadow-sm border border-terracotta-100/20">
                <p className="text-brown-800 italic font-sketchy text-xl leading-relaxed">
                  "We believe in sustainable farming practices that respect the earth and nourish the people who depend on it."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-moss-50/40"></div>
          <div className="absolute inset-0 bg-grain opacity-[0.05] pointer-events-none z-[1] mix-blend-overlay"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1 rounded-full bg-moss-100 text-moss-800 text-sm mb-4 font-medium tracking-wide">Our Story</span>
                <h2 className="text-4xl md:text-5xl font-farm text-terracotta-700 mb-4">
                  About Us
                </h2>
                <div className="h-1 w-20 bg-terracotta-500 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 md:w-32 md:h-32 rounded-full bg-terracotta-100/60 -z-10"></div>
                  <div className="relative h-[420px] md:h-[500px] rounded-lg overflow-hidden shadow-xl transform rotate-1 border-4 border-white">
                    <Image
                      src="/images/about-us-image.jpg"
                      alt="Samm's Farm Team"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-grain opacity-10 mix-blend-overlay"></div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-40 md:h-40 rounded-full bg-moss-100/40 -z-10"></div>
                </div>
                
                <div className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-md border border-moss-100/30">
                  <p className="text-brown-800 text-lg leading-relaxed font-medium">
                    Samm's Farm Kitchen & Brewery began with a simple conviction: healthy soil is the source of healthy lives.
                  </p>
                  
                  <p className="text-brown-700 leading-relaxed">
                    Founded by Sam — a lifelong farmer, cook, and community-builder — the restaurant exists to heal the land while serving honest, joyful food. We compost on-site, mentor local growers in regenerative methods, and build every menu around what our fields and partner farms produce each week.
                  </p>
                  
                  <p className="text-brown-700 leading-relaxed">
                    Visitors aren't just guests; they become part of an extended family that shares meals, ideas, and responsibility for the earth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-24 bg-white relative">
          <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none z-[1] mix-blend-overlay"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1 rounded-full bg-terracotta-100 text-terracotta-800 text-sm mb-4 font-medium tracking-wide">What We Stand For</span>
                <h2 className="text-4xl md:text-5xl font-farm text-terracotta-700 mb-4">
                  Our Core Values
                </h2>
                <div className="h-1 w-20 bg-terracotta-500 mx-auto"></div>
              </div>
              
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-terracotta-100/30">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-terracotta-600 text-white">
                      <tr>
                        <th className="py-4 px-8 text-left text-lg font-farm tracking-wide border-b border-terracotta-500">Value</th>
                        <th className="py-4 px-8 text-left text-lg font-farm tracking-wide border-b border-terracotta-500">What It Means in Practice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-terracotta-100/30">
                      <tr className="hover:bg-cream-50 transition-colors duration-150">
                        <td className="py-5 px-8 font-medium text-terracotta-700 text-lg">Family</td>
                        <td className="py-5 px-8 text-brown-700">We treat every guest, supplier, and team-member as kin. Collaboration and care guide every decision.</td>
                      </tr>
                      <tr className="hover:bg-cream-50 transition-colors duration-150">
                        <td className="py-5 px-8 font-medium text-terracotta-700 text-lg">Happiness</td>
                        <td className="py-5 px-8 text-brown-700">A warm smile, an open table, and food that nourishes body and spirit are non-negotiable.</td>
                      </tr>
                      <tr className="hover:bg-cream-50 transition-colors duration-150">
                        <td className="py-5 px-8 font-medium text-terracotta-700 text-lg">Kindness</td>
                        <td className="py-5 px-8 text-brown-700">Fair wages, respectful partnerships, and a "no-one-left-hungry" ethos underpin daily operations.</td>
                      </tr>
                      <tr className="hover:bg-cream-50 transition-colors duration-150">
                        <td className="py-5 px-8 font-medium text-terracotta-700 text-lg">Soil Stewardship</td>
                        <td className="py-5 px-8 text-brown-700">Composting, minimal tillage, natural inputs, and continuous soil-health education for local farmers.</td>
                      </tr>
                      <tr className="hover:bg-cream-50 transition-colors duration-150">
                        <td className="py-5 px-8 font-medium text-terracotta-700 text-lg">Community</td>
                        <td className="py-5 px-8 text-brown-700">Knowledge-sharing workshops, farm tours, and joint projects with neighboring producers.</td>
                      </tr>
                      <tr className="hover:bg-cream-50 transition-colors duration-150">
                        <td className="py-5 px-8 font-medium text-terracotta-700 text-lg">Sustainability</td>
                        <td className="py-5 px-8 text-brown-700">Seasonal menus, zero-waste cooking disciplines, and responsible sourcing from within Bali whenever possible.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Philosophy: Healing the Land Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-cream-100/40"></div>
          
          {/* Decorative circles */}
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-terracotta-50 opacity-40 -z-10"></div>
          <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-moss-50 opacity-60 -z-10"></div>
          <div className="absolute bottom-20 right-40 w-52 h-52 rounded-full bg-terracotta-50 opacity-30 -z-10"></div>
          <div className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-moss-50 opacity-50 -z-10"></div>
          
          <div className="absolute inset-0 bg-grain opacity-[0.06] pointer-events-none z-[1] mix-blend-overlay"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1 rounded-full bg-cream-200 text-terracotta-800 text-sm mb-4 font-medium tracking-wide">Our Approach</span>
                <h2 className="text-4xl md:text-5xl font-farm text-terracotta-700 mb-6">
                  Our Philosophy: Healing the Land
                </h2>
                <div className="h-1 w-20 bg-terracotta-500 mx-auto mb-10"></div>
                
                <div className="max-w-4xl mx-auto mb-16 bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-md border-t border-l border-white">
                  <p className="text-2xl italic text-brown-800 font-sketchy leading-relaxed">
                    "More than 90 percent of what we eat and drink comes from the soil. When soil becomes toxic, society follows."
                  </p>
                  <p className="text-terracotta-700 mt-4 font-medium">— Sam</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {/* Soil First */}
                <div className="bg-white/90 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-terracotta-100 transform hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-terracotta-100 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-terracotta-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-farm text-terracotta-700 mb-4">Soil First</h3>
                  <p className="text-brown-700 leading-relaxed">
                    We begin where life begins: the ground beneath our feet. By restoring microbial life and organic matter, we secure nutrition, flavour, and long-term food security.
                  </p>
                </div>
                
                {/* Shared Prosperity */}
                <div className="bg-white/90 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-terracotta-100 transform hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-moss-100 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-moss-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-farm text-terracotta-700 mb-4">Shared Prosperity</h3>
                  <p className="text-brown-700 leading-relaxed">
                    A healthy farm ecosystem can only thrive when farmers thrive. We train local growers in composting and regenerative practices, then purchase their harvests at fair prices, closing a virtuous loop.
                  </p>
                </div>
                
                {/* Food as Connection */}
                <div className="bg-white/90 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-terracotta-100 transform hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-terracotta-100 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-terracotta-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-farm text-terracotta-700 mb-4">Food as Connection</h3>
                  <p className="text-brown-700 leading-relaxed">
                    Every plate tells a story of seed, sun, and stewardship. Dining here is an invitation to taste that story and to join a community that honours it.
                  </p>
                </div>
                
                {/* Business as a Force for Good */}
                <div className="bg-white/90 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-terracotta-100 transform hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-moss-100 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-moss-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-farm text-terracotta-700 mb-4">Business as a Force for Good</h3>
                  <p className="text-brown-700 leading-relaxed">
                    Profit follows purpose. When we nurture land and people first, sustainable growth—and the opportunity to franchise these ideals—naturally emerge.
                  </p>
                </div>
              </div>
              
              <div className="mt-16 text-center max-w-4xl mx-auto">
                <p className="text-brown-800 italic font-sketchy text-xl leading-relaxed">
                  By living these principles, Samm's Farm aims to prove that a restaurant can be both a successful enterprise and a steward of soil, community, and happiness.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-terracotta-700 relative">
          <div className="absolute inset-0 bg-grain opacity-[0.1] pointer-events-none z-[1] mix-blend-overlay"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-farm mb-6 text-cream-50">
                Experience Our Philosophy In Action
              </h2>
              <p className="text-cream-100 mb-10 text-lg font-sketchy max-w-2xl mx-auto">
                Visit our farm, dine at our restaurant, or stay at our resort to see how we put our values into practice every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <a 
                  href="/farm" 
                  className="py-4 px-8 bg-cream-50 text-terracotta-700 rounded-full hover:bg-white transition-colors duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  Visit The Farm
                </a>
                <a 
                  href="/restaurant" 
                  className="py-4 px-8 bg-moss-600 text-white rounded-full hover:bg-moss-700 transition-colors duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  Dine With Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
