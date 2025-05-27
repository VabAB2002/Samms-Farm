/**
 * TypeScript Types for Sanity Schemas
 * These types allow for strong typing when working with Sanity content
 */

// Base Types
type SanityDocument = {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
};

type SanitySlug = {
  _type: 'slug';
  current: string;
};

type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  crop?: {
    _type: 'sanity.imageCrop';
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type: 'sanity.imageHotspot';
    height: number;
    width: number;
    x: number;
    y: number;
  };
  alt?: string;
};

type SanityFile = {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
  };
};

type SanityReference = {
  _type: 'reference';
  _ref: string;
};

// Complex Type Helpers
type SanityPortableText = Array<{
  _key: string;
  _type: 'block' | 'image' | 'youtubeEmbed' | 'productReference';
  [key: string]: any;
}>;

// Media Types
export type HeroMedia = {
  type: 'image' | 'video';
  image?: SanityImage;
  video?: SanityFile;
  videoUrl?: string;
  alt?: string;
};

export type MediaItem = {
  type: 'image' | 'video';
  image?: SanityImage;
  video?: SanityFile;
  alt?: string;
};

// Schema Types
export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings';
  siteName: string;
  logo?: SanityImage;
  email?: string;
  phone?: string;
  address?: string;
  googleMapsUrl?: string;
  socialMedia?: Array<{
    _key: string;
    platform: string;
    url: string;
  }>;
  businessHours?: Array<{
    _key: string;
    days: string;
    hours: string;
  }>;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImage?: SanityImage;
}

export interface HomeHero extends SanityDocument {
  _type: 'homeHero';
  headline: string;
  subHeadline?: string;
  heroMedia?: HeroMedia;
  ctaButton?: {
    label: string;
    href: string;
    style: 'primary' | 'secondary' | 'tertiary';
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  overlayColor: 'none' | 'dark' | 'light' | 'brown' | 'moss' | 'terracotta';
  overlayOpacity?: number;
}

export interface HomeTile extends SanityDocument {
  _type: 'homeTile';
  title: string;
  tagline?: string;
  slug: SanitySlug;
  order: number;
  media?: MediaItem;
  backgroundColor: string;
  ctaLabel?: string;
  ctaHref: string;
  aspectRatio: 'square' | 'landscape' | 'portrait' | 'widescreen';
  hoverEffect: 'zoom' | 'fade' | 'slideUp' | 'none';
}

export interface Author extends SanityDocument {
  _type: 'author';
  name: string;
  slug?: SanitySlug;
  image?: SanityImage;
  bio?: string;
  role?: string;
}

export interface Category extends SanityDocument {
  _type: 'category';
  title: string;
  slug: SanitySlug;
  description?: string;
  color: 'moss' | 'brown' | 'terracotta' | 'cream';
}

export interface BlogPost extends SanityDocument {
  _type: 'blogPost';
  title: string;
  slug: SanitySlug;
  heroImage?: SanityImage;
  excerpt?: string;
  publishedAt: string;
  author?: SanityReference;
  authorData?: Author; // Expanded reference
  categories?: SanityReference[];
  categoriesData?: Category[]; // Expanded references
  content: SanityPortableText;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImage?: SanityImage;
}

export interface Event extends SanityDocument {
  _type: 'event';
  title: string;
  slug: SanitySlug;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  eventType?: 'workshop' | 'dinner' | 'tasting' | 'tour' | 'class' | 'festival' | 'other';
  featured: boolean;
  price?: number;
  priceDescription?: string;
  bookingUrl?: string;
  availableSpots?: number;
  soldOut: boolean;
  mainImage?: SanityImage;
  gallery?: SanityImage[];
}

export interface MenuPdf extends SanityDocument {
  _type: 'menuPdf';
  name: string;
  slug: SanitySlug;
  pdfFile: SanityFile;
  thumbnail?: SanityImage;
  description?: string;
  lastUpdated: string;
  menuType?: 'breakfast' | 'lunch' | 'dinner' | 'drinks' | 'dessert' | 'seasonal' | 'special';
  active: boolean;
}

export interface Product extends SanityDocument {
  _type: 'product';
  title: string;
  slug: SanitySlug;
  shopifyProductId: string;
  shopifyVariantId?: string;
  price: number;
  images?: SanityImage[];
  description?: SanityPortableText;
  available: boolean;
}

export interface MediaAsset extends SanityDocument {
  _type: 'mediaAsset';
  title: string;
  altText?: string;
  mediaType: 'heroImage' | 'galleryImage' | 'backgroundImage' | 'productImage' | 'video' | 'icon';
  category: 'homePage' | 'restaurant' | 'shop' | 'blog' | 'about';
  image?: SanityImage;
  video?: SanityFile;
  videoUrl?: string;
  caption?: string;
}
