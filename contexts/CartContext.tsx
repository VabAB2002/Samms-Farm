'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/app/components/ProductCard';
import { 
  createCart, 
  addToCart, 
  updateCartItems, 
  removeFromCart, 
  getCart, 
  mapToLineItem 
} from '@/lib/shopify/shopifyClient';

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  checkout: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate totals
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Initialize cart on component mount
  useEffect(() => {
    const initCart = async () => {
      // Try to get stored checkout ID from localStorage
      const storedCheckoutId = localStorage.getItem('sammsFarmCheckoutId');
      const storedItems = localStorage.getItem('sammsFarmCartItems');

      if (storedItems) {
        try {
          setItems(JSON.parse(storedItems));
        } catch (e) {
          console.error('Failed to parse stored cart items:', e);
        }
      }

      if (storedCheckoutId) {
        try {
          setCheckoutId(storedCheckoutId);
          // Optionally fetch the cart from Shopify to ensure it's still valid
          const cart = await getCart(storedCheckoutId);
          if (!cart || !cart.id) {
            throw new Error('Invalid checkout');
          }
        } catch (e) {
          console.warn('Previous checkout expired or invalid, creating a new one');
          createNewCart();
        }
      } else {
        createNewCart();
      }
    };

    if (typeof window !== 'undefined') {
      initCart();
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (items.length > 0) {
        localStorage.setItem('sammsFarmCartItems', JSON.stringify(items));
      } else {
        localStorage.removeItem('sammsFarmCartItems');
      }
    }
  }, [items]);

  // Create a new Shopify checkout
  const createNewCart = async () => {
    try {
      const checkout = await createCart();
      setCheckoutId(checkout.id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sammsFarmCheckoutId', checkout.id);
      }
      return checkout;
    } catch (error) {
      console.error('Failed to create new cart:', error);
      return null;
    }
  };

  // Add item to cart
  const addItem = async (product: Product, quantity = 1) => {
    setIsLoading(true);
    try {
      // Check if item already exists in cart
      const existingItemIndex = items.findIndex(
        item => item.product._id === product._id
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const newItems = [...items];
        newItems[existingItemIndex].quantity += quantity;
        setItems(newItems);
        
        // Update in Shopify if checkout exists
        if (checkoutId) {
          await updateCartItems(checkoutId, [
            {
              id: newItems[existingItemIndex].id,
              quantity: newItems[existingItemIndex].quantity,
            },
          ]);
        }
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product._id}-${Date.now()}`, // Generate unique ID for the cart item
          product,
          quantity,
        };
        
        setItems(prev => [...prev, newItem]);
        
        // Add to Shopify if checkout exists
        if (checkoutId) {
          await addToCart(checkoutId, [mapToLineItem(product, quantity)]);
        }
      }
      
      // Open the cart when adding items
      setIsOpen(true);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (id: string) => {
    setIsLoading(true);
    try {
      const newItems = items.filter(item => item.id !== id);
      setItems(newItems);
      
      // Remove from Shopify if checkout exists
      if (checkoutId) {
        await removeFromCart(checkoutId, [id]);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (id: string, quantity: number) => {
    setIsLoading(true);
    try {
      const newItems = items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      setItems(newItems);
      
      // Update in Shopify if checkout exists
      if (checkoutId) {
        await updateCartItems(checkoutId, [{ id, quantity }]);
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    setItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sammsFarmCartItems');
    }
    
    // Create a new checkout in Shopify
    if (checkoutId) {
      createNewCart();
    }
  };

  // Proceed to checkout
  const checkout = async () => {
    if (!checkoutId) {
      console.error('No checkout ID available');
      return;
    }
    
    try {
      const cart = await getCart(checkoutId);
      if (cart && cart.webUrl) {
        window.location.href = cart.webUrl;
      } else {
        throw new Error('Invalid checkout URL');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Try to create a new checkout as a fallback
      const newCheckout = await createNewCart();
      if (newCheckout && newCheckout.webUrl) {
        window.location.href = newCheckout.webUrl;
      }
    }
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const contextValue: CartContextType = {
    items,
    isOpen,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    checkout,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
