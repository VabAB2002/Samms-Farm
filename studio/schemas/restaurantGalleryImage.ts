/**
 * Restaurant Gallery Image Schema
 * For managing restaurant gallery images
 */
export default {
  name: 'restaurantGalleryImage',
  title: 'Restaurant Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility (max 120 characters)',
      validation: (Rule: any) => Rule.required().max(120),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Set the display order of the image in the gallery (lower numbers appear first)',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
      description: 'Optional caption to display in the lightbox',
      rows: 2,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
      order: 'order',
    },
    prepare({ title, media, order }: { title: string; media: any; order?: number }) {
      return {
        title,
        subtitle: `Order: ${order !== undefined ? order : 'Not set'}`,
        media,
      };
    },
  },
}
