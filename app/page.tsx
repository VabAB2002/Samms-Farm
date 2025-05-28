import { Metadata } from 'next';
import { getHome, getSiteSettings } from '@/lib/sanity/queries';
import Header from '@/components/Header';
import Hero from './components/Hero';
import HomeTile from './components/HomeTile';
import Footer from '@/components/Footer';

// Generate metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  
  return {
    title: siteSettings?.seoTitle || "Samm's Farm Kitchen & Brewery",
    description: siteSettings?.seoDescription || "Healing the Land, Nourishing People",
    // Note: We can't apply custom font styling to metadata as it's used in browser tabs/search results
    // The custom farm/sketchy styles will only apply to visible UI elements
    openGraph: {
      images: siteSettings?.ogImage ? [{
        url: `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${
          siteSettings.ogImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg')
        }`,
        width: 1200,
        height: 630,
        alt: siteSettings.siteName,
      }] : [],
    },
  };
}

export default async function Home() {
  // Fetch home content from Sanity using our GROQ query
  const { hero, tiles } = await getHome();
  
  // Separate tiles for the top and bottom rows
  const topRowTiles = tiles.slice(0, 3); // First 3 tiles (based on order)
  const bottomRowTiles = tiles.slice(3, 5); // Last 2 tiles (based on order)
  
  return (
    <div className="min-h-screen bg-cream-50 relative overflow-hidden">
      {/* Subtle grain texture overlay for entire page */}
      <div className="fixed inset-0 bg-grain opacity-[0.07] pointer-events-none z-[1] mix-blend-overlay"></div>
      
      {/* Subtle color blobs for depth */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-terracotta-500/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-[-30%] right-[-20%] w-[80%] h-[80%] bg-moss-600/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed top-[40%] right-[5%] w-[30%] h-[30%] bg-brown-500/[0.01] rounded-full blur-[70px] pointer-events-none"></div>
      
      <Header />
      <main className="relative z-[2]">
        {/* Hero Section */}
        {hero && <Hero hero={hero} />}
        
        {/* Tiles Section - 3-over-2 Layout */}
        <section className="w-full overflow-hidden">
          {/* Top Row - 3 Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {topRowTiles.map((tile, index) => (
              <div key={tile._id} className="overflow-hidden" style={{ animationDelay: `${index * 0.15}s` }}>
                <HomeTile tile={tile} />
              </div>
            ))}
          </div>
          
          {/* Bottom Row - 2 Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {bottomRowTiles.map((tile, index) => (
              <div key={tile._id} className="overflow-hidden" style={{ animationDelay: `${(index + 3) * 0.15}s` }}>
                <HomeTile tile={tile} className="md:aspect-[16/9]" />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
