import Client from 'shopify-buy';

// Initialize the Shopify client
const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
});

export default client;

// Helper functions for common Shopify operations
export const createCheckout = async () => {
  return await client.checkout.create();
};

export const fetchProducts = async () => {
  return await client.product.fetchAll();
};

export const fetchProductByHandle = async (handle: string) => {
  return await client.product.fetchByHandle(handle);
};

export const addLineItemsToCheckout = async (checkoutId: string, lineItems: any[]) => {
  return await client.checkout.addLineItems(checkoutId, lineItems);
};

export const updateLineItems = async (checkoutId: string, lineItems: any[]) => {
  return await client.checkout.updateLineItems(checkoutId, lineItems);
};

export const removeLineItems = async (checkoutId: string, lineItemIds: string[]) => {
  return await client.checkout.removeLineItems(checkoutId, lineItemIds);
};
