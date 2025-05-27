/**
 * Shopify Client
 * Initializes and provides methods to interact with Shopify Lite (Buy Button) via the Storefront API
 */
import Client from 'shopify-buy';
import { Product } from '@/app/components/ProductCard';

// Initialize the Shopify client
const shopifyClient = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'your-store.myshopify.com',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || 'your-storefront-access-token',
  apiVersion: '2023-07', // Specify the Shopify API version
});

// Create a cart
export const createCart = async () => {
  try {
    return await shopifyClient.checkout.create();
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
};

// Add items to cart
export const addToCart = async (checkoutId: string, lineItems: any[]) => {
  try {
    return await shopifyClient.checkout.addLineItems(checkoutId, lineItems);
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Update items in cart
export const updateCartItems = async (checkoutId: string, lineItems: any[]) => {
  try {
    return await shopifyClient.checkout.updateLineItems(checkoutId, lineItems);
  } catch (error) {
    console.error('Error updating cart items:', error);
    throw error;
  }
};

// Remove items from cart
export const removeFromCart = async (checkoutId: string, lineItemIds: string[]) => {
  try {
    return await shopifyClient.checkout.removeLineItems(checkoutId, lineItemIds);
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Get cart
export const getCart = async (checkoutId: string) => {
  try {
    return await shopifyClient.checkout.fetch(checkoutId);
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Map Sanity product to Shopify line item
export const mapToLineItem = (product: Product, quantity = 1) => {
  return {
    variantId: product.shopifyVariantId || product.shopifyProductId,
    quantity,
  };
};

export default shopifyClient;
