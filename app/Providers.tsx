'use client';

import React from 'react';
import { CartProvider } from '../contexts/CartContext';

// Provider component that wraps the app with all necessary context providers
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
