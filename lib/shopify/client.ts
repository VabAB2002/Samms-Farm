import Client from 'shopify-buy';

// Shopify client initialization
export const shopifyClient = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'placeholder-store.myshopify.com',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'placeholder-token',
  apiVersion: '2023-07', // Latest stable API version
});

// Function to check if Shopify credentials are set
export const hasShopifyCredentials = () => {
  return !!process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN && !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
};

// Helper function to get all products
export async function getAllProducts() {
  try {
    const products = await shopifyClient.product.fetchAll();
    return products;
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return [];
  }
}

// Helper function to get a single product by handle
export async function getProductByHandle(handle: string) {
  try {
    const product = await shopifyClient.product.fetchByHandle(handle);
    return product;
  } catch (error) {
    console.error(`Error fetching product with handle ${handle}:`, error);
    return null;
  }
}
