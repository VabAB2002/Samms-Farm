/**
 * Product Schema
 * Represents products to be sold via Shopify integration
 */
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'details', title: 'Product Details' },
    { name: 'images', title: 'Images' },
    { name: 'shopify', title: 'Shopify Integration' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'details',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      group: 'details',
      of: [{ type: 'block' }],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      group: 'details',
      description: 'The price in your default currency',
      validation: (Rule: any) => Rule.required().precision(2),
    },
    {
      name: 'compareAtPrice',
      title: 'Compare at Price',
      type: 'number',
      group: 'details',
      description: 'Original price, if on sale',
      validation: (Rule: any) => Rule.precision(2),
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      group: 'images',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'available',
      title: 'Available',
      type: 'boolean',
      group: 'details',
      initialValue: true,
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      group: 'details',
      initialValue: false,
    },
    // Shopify integration fields
    {
      name: 'shopifyProductId',
      title: 'Shopify Product ID',
      type: 'string',
      group: 'shopify',
      description: 'ID from Shopify (required for Buy Button)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'shopifyVariantId',
      title: 'Shopify Variant ID',
      type: 'string',
      group: 'shopify',
      description: 'Default variant ID from Shopify',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      price: 'price',
      available: 'available',
    },
    prepare({ title, media, price, available }: { title: string; media?: any; price?: number; available?: boolean }) {
      return {
        title: available === false ? `${title} (Out of stock)` : title,
        subtitle: price ? `$${price.toFixed(2)}` : 'No price set',
        media,
      };
    },
  },
}
