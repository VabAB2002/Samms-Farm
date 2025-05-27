'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../lib/sanity/client';
import { useCart } from '@/contexts/LegacyCartAdapter';

type ProductCardProps = {
  product: {
    _id: string;
    title: string;
    slug: { current: string };
    price: number;
    images: any[];
    shopifyVariantId?: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    if (!product.shopifyVariantId) return;
    
    addToCart({
      id: product._id,
      title: product.title,
      quantity: 1,
      price: product.price,
      image: product.images && product.images.length > 0 
        ? urlFor(product.images[0]).width(100).url() 
        : '',
      variantId: product.shopifyVariantId,
    });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image
            src={urlFor(product.images[0]).width(400).url()}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/shop/${product.slug.current}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-green-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
