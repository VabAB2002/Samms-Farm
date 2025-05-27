import { safeFetch } from '../client';

// Get all products
export async function getAllProducts() {
  const query = `
    *[_type == "product" && available == true] | order(title asc) {
      _id,
      title,
      slug,
      shopifyProductId,
      shopifyVariantId,
      price,
      images,
      description
    }
  `;
  
  return safeFetch(query);
}

// Get a product by slug
export async function getProductBySlug(slug: string) {
  const query = `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      shopifyProductId,
      shopifyVariantId,
      price,
      images,
      description,
      available
    }
  `;
  
  return safeFetch(query, { slug });
}

// Get featured products
export async function getFeaturedProducts(limit = 4) {
  const query = `
    *[_type == "product" && available == true] | order(price desc)[0...$limit] {
      _id,
      title,
      slug,
      price,
      images[0]
    }
  `;
  
  return safeFetch(query, { limit: limit - 1 });
}
