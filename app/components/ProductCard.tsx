'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/sanityClient';

export type Product = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: any[];
  price: number;
  compareAtPrice?: number;
  images: any[];
  categories?: string[];
  available: boolean;
  featured?: boolean;
  shopifyProductId: string;
  shopifyVariantId?: string;
};

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  className = '',
}) => {
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const isOutOfStock = !product.available;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCart && !isOutOfStock) {
      onAddToCart(product);
    }
  };
  
  return (
    <div 
      className={`group relative flex flex-col overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md ${className}`}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-cream-50">
        <Link href={`/shop/${product.slug.current}`}>
          {product.images && product.images[0] ? (
            <Image
              src={urlFor(product.images[0])
                .width(500)
                .height(500)
                .fit('crop')
                .crop('center')
                .url()}
              alt={product.title}
              width={500}
              height={500}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <p className="text-gray-400">No image available</p>
            </div>
          )}
          
          {/* Sale badge */}
          {isOnSale && (
            <div className="absolute top-2 right-2 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
              Sale
            </div>
          )}
          
          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <span className="rounded-md bg-white bg-opacity-90 px-3 py-1 text-sm font-medium text-gray-800">
                Out of Stock
              </span>
            </div>
          )}
        </Link>
      </div>
      
      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/shop/${product.slug.current}`} className="flex-1">
          <h3 className="mb-1 text-lg font-medium text-gray-900 transition-colors duration-200 hover:text-green-800">
            {product.title}
          </h3>
          
          {product.categories && product.categories.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {product.categories.map((category) => (
                <span 
                  key={category} 
                  className="inline-block rounded-full bg-cream-100 px-2 py-0.5 text-xs text-green-800"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </Link>
        
        {/* Price */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</span>
            {isOnSale && product.compareAtPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              isOutOfStock
                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                : 'bg-green-700 text-white hover:bg-green-800'
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
