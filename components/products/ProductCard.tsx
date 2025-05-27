import React from 'react';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import { useCart } from '@/components/cart/CartContext';

type ProductCardProps = {
  product: {
    _id: string;
    title: string;
    slug: { current: string };
    price: number;
    images: any[];
    shopifyVariantId: string;
  };
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, loading } = useCart();

  const handleAddToCart = () => {
    addToCart(product.shopifyVariantId, 1);
  };

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        {product.images && product.images[0] ? (
          <img
            src={urlFor(product.images[0]).width(400).height(400).url()}
            alt={product.title}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/products/${product.slug.current}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-2 w-full rounded-md bg-black py-2 text-sm text-white hover:bg-gray-800 disabled:bg-gray-400"
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
