import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
});

// Helper for image URLs
const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};

// Fetch all blog posts
export async function getPosts() {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt
    }
  `);
}

// Fetch a single blog post by slug
export async function getPost(slug: string) {
  return await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      body,
      publishedAt
    }
  `, { slug });
}

// Fetch all products
export async function getProducts() {
  return await client.fetch(`
    *[_type == "product" && available == true] {
      _id,
      title,
      slug,
      price,
      images,
      shopifyProductId,
      shopifyVariantId
    }
  `);
}

// Fetch a single product by slug
export async function getProduct(slug: string) {
  return await client.fetch(`
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      price,
      images,
      description,
      shopifyProductId,
      shopifyVariantId
    }
  `, { slug });
}
