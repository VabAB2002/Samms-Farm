import { Metadata } from 'next';
import { getAllProducts } from '@/lib/sanity/api/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/shop/ProductCard';
import CartButton from '@/components/shop/CartButton';

export const metadata: Metadata = {
  title: "Shop | Samm's Farm",
  description: 'Bring home the essence of our farm with handcrafted products and artisanal goods.',
};

export default async function ShopPage() {
  // Fetch products from Sanity
  const products = await getAllProducts();

  return (
    <div className="min-h-screen">
      <Header />
      <CartButton />
      <main className="py-12 md:py-20">
        <section className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-medium text-brown-800 mb-4">
              Samm&apos;s Farm Shop
            </h1>
            <div className="w-24 h-[2px] bg-terracotta-600 mx-auto mb-6" />
            <p className="text-xl text-brown-700 max-w-2xl mx-auto">
              Bring home the essence of our farm with handcrafted products and artisanal goods.
            </p>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-12 bg-cream-50 rounded-lg">
              <h2 className="text-2xl font-serif text-brown-800 mb-2">Shop Coming Soon</h2>
              <p className="text-brown-700">
                We're currently setting up our online store. Please check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 bg-cream-50 p-8 rounded-lg">
            <div>
              <h2 className="text-2xl font-serif text-brown-800 mb-4">About Our Products</h2>
              <p className="text-brown-700 mb-4">
                Every item in our shop is carefully crafted with ingredients from our farm or sourced from local artisans who share our values of sustainability and quality.
              </p>
              <p className="text-brown-700">
                From our homemade preserves to our hand-crafted soaps, each product tells a story of traditional methods and thoughtful production. We hope they bring a piece of our farm into your home.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-serif text-brown-800 mb-4">Shipping Information</h2>
              <p className="text-brown-700 mb-4">
                We ship within the United States using eco-friendly packaging materials. Orders typically ship within 3-5 business days.
              </p>
              <p className="text-brown-700">
                Local pickup is available at our farm store during regular business hours. Select this option at checkout to avoid shipping fees.
              </p>
              <p className="text-brown-700 mt-4">
                <strong>Questions about our products?</strong> Contact us at shop@sammsfarm.com
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
