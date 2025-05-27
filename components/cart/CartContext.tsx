import React, { createContext, useContext, useState, useEffect } from 'react';
import client, { createCheckout, addLineItemsToCheckout, removeLineItems, updateLineItems } from '@/lib/shopify';

type CartContextType = {
  isCartOpen: boolean;
  toggleCart: () => void;
  checkout: any;
  loading: boolean;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  cartCount: number;
};

const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  toggleCart: () => {},
  checkout: null,
  loading: false,
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeFromCart: async () => {},
  cartCount: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checkout, setCheckout] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Initialize checkout
  useEffect(() => {
    const fetchCheckout = async () => {
      const existingCheckoutId = localStorage.getItem('shopifyCheckoutId');
      
      if (existingCheckoutId) {
        try {
          // Fetch existing checkout
          const existingCheckout = await client.checkout.fetch(existingCheckoutId);
          
          // Check if checkout is still valid
          if (existingCheckout && !existingCheckout.completedAt) {
            setCheckout(existingCheckout);
            setCartCount(existingCheckout?.lineItems?.length || 0);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error fetching checkout:', error);
          // Continue to create a new checkout if there was an error
        }
      }
      
      // Create a new checkout
      const newCheckout = await createCheckout();
      setCheckout(newCheckout);
      localStorage.setItem('shopifyCheckoutId', newCheckout.id);
      setLoading(false);
    };

    fetchCheckout();
  }, []);

  // Update cart count whenever checkout changes
  useEffect(() => {
    if (checkout) {
      let count = 0;
      if (checkout.lineItems) {
        checkout.lineItems.forEach((item: any) => {
          count += item.quantity;
        });
      }
      setCartCount(count);
    }
  }, [checkout]);

  // Add to cart
  const addToCart = async (variantId: string, quantity: number) => {
    setLoading(true);
    
    const lineItemsToAdd = [
      {
        variantId,
        quantity,
      },
    ];

    const updatedCheckout = await addLineItemsToCheckout(checkout.id, lineItemsToAdd);
    setCheckout(updatedCheckout);
    setLoading(false);
  };

  // Update quantity
  const updateQuantity = async (lineItemId: string, quantity: number) => {
    setLoading(true);
    
    const lineItemsToUpdate = [
      {
        id: lineItemId,
        quantity,
      },
    ];

    const updatedCheckout = await updateLineItems(checkout.id, lineItemsToUpdate);
    setCheckout(updatedCheckout);
    setLoading(false);
  };

  // Remove from cart
  const removeFromCart = async (lineItemId: string) => {
    setLoading(true);
    
    const updatedCheckout = await removeLineItems(checkout.id, [lineItemId]);
    setCheckout(updatedCheckout);
    setLoading(false);
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        checkout,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
