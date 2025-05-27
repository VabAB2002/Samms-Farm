'use client';

import React from 'react';
import { useCart as useModernCart } from './CartContext';
import { Product } from '@/app/components/ProductCard';

type LegacyCartItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  image: string;
  variantId: string;
};

/**
 * This adapter provides backward compatibility with the old cart context API
 * It maps the new cart context properties to the old ones for components
 * that haven't been updated yet.
 */
export const useCart = () => {
  const modernCart = useModernCart();
  
  // Map the new cart context properties to the old ones
  return {
    cart: modernCart.items.map(item => ({
      id: item.id,
      title: item.product.title,
      quantity: item.quantity,
      price: item.product.price,
      image: item.product.images?.[0] ? item.product.images[0] : '', // Use first image from images array
      variantId: item.product.shopifyVariantId || item.product._id
    })) as LegacyCartItem[],
    isCartOpen: modernCart.isOpen,
    totalItems: modernCart.itemCount,
    totalPrice: modernCart.subtotal,
    checkoutUrl: '#checkout', // This might need to be updated based on implementation
    toggleCart: () => {
      if (modernCart.isOpen) {
        modernCart.closeCart();
      } else {
        modernCart.openCart();
      }
    },
    removeFromCart: modernCart.removeItem,
    updateQuantity: modernCart.updateQuantity,
    clearCart: modernCart.clearCart,
    addToCart: (item: LegacyCartItem) => {
      const product: Partial<Product> = {
        _id: item.id,
        title: item.title,
        price: item.price,
        images: [item.image],
        shopifyVariantId: item.variantId
      };
      modernCart.addItem(product as Product, item.quantity);
    }
  };
};
