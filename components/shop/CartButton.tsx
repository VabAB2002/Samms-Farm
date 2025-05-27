'use client';

import { useCart } from '@/contexts/LegacyCartAdapter';
import Cart from './Cart';

export default function CartButton() {
  const { toggleCart, isCartOpen, totalItems } = useCart();

  return (
    <>
      <button
        onClick={toggleCart}
        className="fixed right-6 bottom-6 z-40 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center"
        aria-label="Open cart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
      
      {/* Cart is conditionally rendered inside the Cart component based on isCartOpen */}
      <Cart />
    </>
  );
}
