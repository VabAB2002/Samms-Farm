/**
 * Sanity GROQ Queries
 * Collection of GROQ queries for fetching data from Sanity CMS
 */
import { sanityFetch } from './sanityClient';
import {
  SiteSettings,
  HomeHero,
  HomeTile,
  BlogPost,
  Event,
  MenuPdf,
  Author,
  Category,
  MediaAsset,
  Product,
} from './types/schema';

/**
 * Get site settings
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    _type,
    siteName,
    logo,
    email,
    phone,
    address,
    googleMapsUrl,
    socialMedia[] {
      _key,
      platform,
      url
    },
    businessHours[] {
      _key,
      days,
      hours
    },
    seoTitle,
    seoDescription,
    seoKeywords,
    ogImage
  }`;

  return sanityFetch<SiteSettings>(query);
}

/**
 * Get home page data (hero + ordered tiles)
 * As specified in the requirements
 */
export async function getHome() {
  const query = `{
    "hero": *[_type == "homeHero"][0] {
      _id,
      headline,
      subHeadline,
      heroMedia {
        type,
        image,
        video,
        videoUrl,
        alt
      },
      ctaButton {
        label,
        href,
        style
      },
      secondaryCta {
        label,
        href
      },
      overlayColor,
      overlayOpacity
    },
    "tiles": *[_type == "homeTile"] | order(order asc) {
      _id,
      title,
      tagline,
      slug,
      order,
      media {
        type,
        image,
        video,
        alt
      },
      backgroundColor,
      ctaLabel,
      ctaHref,
      aspectRatio,
      hoverEffect
    }
  }`;

  return sanityFetch<{ hero: HomeHero; tiles: HomeTile[] }>(query);
}

/**
 * Get blog posts with pagination
 * As specified in the requirements
 */
export async function getPosts(page = 1, limit = 6) {
  const offset = (page - 1) * limit;
  
  const query = `{
    "posts": *[_type == "blogPost"] | order(publishedAt desc) [${offset}...${offset + limit}] {
      _id,
      title,
      slug,
      heroImage,
      excerpt,
      publishedAt,
      "author": author->{
        _id,
        name,
        slug,
        image
      },
      "categories": categories[]->{
        _id,
        title,
        slug,
        color
      }
    },
    "total": count(*[_type == "blogPost"])
  }`;

  return sanityFetch<{
    posts: Array<Omit<BlogPost, 'categories' | 'author'> & {
      author: Author;
      categories: Category[];
    }>;
    total: number;
  }>(query);
}

/**
 * Get a single blog post by slug
 * As specified in the requirements
 */
export async function getPost(slug: string) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    heroImage,
    excerpt,
    publishedAt,
    content,
    "author": author->{
      _id,
      name,
      slug,
      image,
      bio,
      role
    },
    "categories": categories[]->{
      _id,
      title,
      slug,
      color
    },
    seoTitle,
    seoDescription,
    seoKeywords,
    ogImage
  }`;

  return sanityFetch<
    Omit<BlogPost, 'categories' | 'author'> & {
      author: Author;
      categories: Category[];
    }
  >(query, { slug });
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit = 3) {
  const now = new Date().toISOString();
  
  const query = `*[_type == "event" && startDate >= $now] | order(startDate asc) [0...${limit}] {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    location,
    eventType,
    featured,
    price,
    priceDescription,
    bookingUrl,
    availableSpots,
    soldOut,
    mainImage
  }`;

  return sanityFetch<Event[]>(query, { now });
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(limit = 4) {
  const query = `*[_type == "product" && available == true] | order(price desc) [0...${limit}] {
    _id,
    title,
    slug,
    price,
    images[0]
  }`;
  
  return sanityFetch<Product[]>(query);
}

/**
 * Get menus
 */
export async function getMenus() {
  const query = `*[_type == "menuPdf" && active == true] | order(menuType) {
    _id,
    name,
    slug,
    pdfFile,
    thumbnail,
    description,
    lastUpdated,
    menuType
  }`;
  
  return sanityFetch<MenuPdf[]>(query);
}

/**
 * Get media assets by category
 */
export async function getMediaByCategory(category: string) {
  const query = `*[_type == "mediaAsset" && category == $category] {
    _id,
    title,
    altText,
    mediaType,
    category,
    image,
    video,
    videoUrl,
    caption
  }`;
  
  return sanityFetch<MediaAsset[]>(query, { category });
}
