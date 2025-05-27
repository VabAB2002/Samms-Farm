import { safeFetch } from '../client';

// Get all posts
export async function getAllPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt
    }
  `;
  
  return safeFetch(query);
}

// Get a post by slug
export async function getPostBySlug(slug: string) {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      body
    }
  `;
  
  return safeFetch(query, { slug });
}

// Get recent posts
export async function getRecentPosts(limit = 3) {
  const query = `
    *[_type == "post"] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt
    }
  `;
  
  return safeFetch(query, { limit: limit - 1 });
}
