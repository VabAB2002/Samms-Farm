/**
 * Schema Index
 * Exports all schema types for Sanity Studio
 */
import siteSettings from './siteSettings'
import homeHero from './homeHero'
import homeTile from './homeTile'
import blogPost from './blogPost'
import author from './author'
import category from './category'
import event from './event'
import menuPdf from './menuPdf'
import product from './product'
import mediaAsset from './mediaAsset'
import restaurantGalleryImage from './restaurantGalleryImage'
import menuItem from './menuItem'

export const schemaTypes = [
  // Core types
  siteSettings,
  
  // Home page components
  homeHero,
  homeTile,
  
  // Blog components
  blogPost,
  author,
  category,
  
  // Events and menus
  event,
  menuPdf,
  menuItem,
  
  // Shop and media
  product,
  mediaAsset,
  restaurantGalleryImage,
]
