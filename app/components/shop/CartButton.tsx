'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import ShoppingCart from '../ShoppingCart';

const CartButton: React.FC = () => {
  const { isOpen, openCart, closeCart, items, itemCount, updateQuantity, removeItem, checkout } = useCart();

  return (
    <>
      {/* Floating cart button */}
      <button
        onClick={openCart}
        className="fixed bottom-6 right-6 z-20 flex items-center justify-center rounded-full bg-green-800 p-3 shadow-lg transition-all hover:bg-green-900"
        aria-label="Open shopping cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        
        {/* Item count badge */}
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {itemCount}
          </span>
        )}
      </button>
      
      {/* Shopping cart drawer */}
      <ShoppingCart
        isOpen={isOpen}
        onClose={closeCart}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={checkout}
      />
    </>
  );
};

export default CartButton;
