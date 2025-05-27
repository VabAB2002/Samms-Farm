'use client';

import React, { useState } from 'react';
import { useCart } from '@/components/cart/CartContext';

type AddToCartButtonProps = {
  product: {
    shopifyVariantId: string;
  };
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, loading } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product.shopifyVariantId, quantity);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 border border-gray-300 rounded-l flex items-center justify-center"
        >
          -
        </button>
        <span className="w-12 h-10 border-t border-b border-gray-300 flex items-center justify-center">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 border border-gray-300 rounded-r flex items-center justify-center"
        >
          +
        </button>
      </div>
      
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400"
      >
        {loading ? 'Adding to Cart...' : 'Add to Cart'}
      </button>
    </div>
  );
}
