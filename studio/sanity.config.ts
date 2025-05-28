/**
 * Sanity Studio Configuration
 */
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { media } from 'sanity-plugin-media';
import { tailwindColorTheme } from './theme';

export default defineConfig({
  name: 'samms-farm',
  title: "Samm's Farm Kitchen & Brewery",
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mfp8ghll',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [
    deskTool({
      structure: (S) => 
        S.list()
          .title('Content')
          .items([
            // Site Settings singleton
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            
            // Homepage
            S.listItem()
              .title('Homepage')
              .child(
                S.list()
                  .title('Homepage')
                  .items([
                    S.listItem()
                      .title('Hero Section')
                      .child(
                        S.document()
                          .schemaType('homeHero')
                          .documentId('homeHero')
                      ),
                    S.listItem()
                      .title('Tiles')
                      .child(
                        S.documentTypeList('homeTile')
                          .title('Homepage Tiles')
                      ),
                  ])
              ),
            
            // Blog
            S.listItem()
              .title('Blog')
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    S.documentTypeListItem('blogPost').title('Blog Posts'),
                    S.documentTypeListItem('author').title('Authors'),
                    S.documentTypeListItem('category').title('Categories'),
                  ])
              ),
            
            // Events and menus
            S.listItem()
              .title('Events & Menus')
              .child(
                S.list()
                  .title('Events & Menus')
                  .items([
                    S.documentTypeListItem('event').title('Events'),
                    S.documentTypeListItem('menuPdf').title('Menu PDFs'),
                  ])
              ),
            
            // Restaurant
            S.listItem()
              .title('Restaurant')
              .child(
                S.list()
                  .title('Restaurant')
                  .items([
                    S.documentTypeListItem('menuItem').title('Menu Items'),
                    S.documentTypeListItem('restaurantGalleryImage').title('Gallery Images'),
                    // Add other restaurant-related document types here in the future
                  ])
              ),
            
            // Shop and media
            S.listItem()
              .title('Shop & Media')
              .child(
                S.list()
                  .title('Shop & Media')
                  .items([
                    S.documentTypeListItem('product').title('Products'),
                    S.documentTypeListItem('mediaAsset').title('Media Assets'),
                  ])
              ),
          ]),
    }),
    visionTool(),
    media(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  theme: tailwindColorTheme,
})
