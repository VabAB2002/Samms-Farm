import React from 'react';
import { getProduct } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/app/products/[slug]/AddToCartButton';

export const revalidate = 3600; // Revalidate this page every hour

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          {product.images && product.images.length > 0 ? (
            <div className="rounded-lg overflow-hidden">
              <img
                src={urlFor(product.images[0]).width(600).height(600).url()}
                alt={product.title}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          
          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images.map((image: any, index: number) => (
                <div key={index} className="rounded-md overflow-hidden">
                  <img
                    src={urlFor(image).width(150).height(150).url()}
                    alt={`${product.title} - image ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold mt-2">${product.price}</p>
          
          {/* Add to Cart Button - This will be connected via client component */}
          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
          
          {/* Product Description */}
          {product.description && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <div className="prose prose-sm">
                {/* Render Portable Text content from Sanity */}
                {/* For simplicity, we're just rendering it as text for now */}
                <p>{JSON.stringify(product.description)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
