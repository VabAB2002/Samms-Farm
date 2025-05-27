/**
 * Home Tile Schema
 * Represents the 5 interactive tiles on the homepage arranged in a 3-over-2 layout
 * (Restaurants, Farm, Resort, Merchandise, Blog & Newsletter)
 */
export default {
  name: 'homeTile',
  title: 'Home Tile',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the tile (e.g., "Samms Restaurant")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short description or tagline',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly name (used for routing)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order of tiles (1-5). The first 3 tiles appear in the top row, the last 2 in the bottom row.',
      validation: (Rule: any) => Rule.required().min(1).max(5).integer(),
    },
    {
      name: 'media',
      title: 'Tile Media',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              { title: 'Image', value: 'image' },
              { title: 'Video', value: 'video' },
            ],
            layout: 'radio',
          },
          initialValue: 'image',
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }: { parent: { type: string } }) => parent?.type !== 'image',
        },
        {
          name: 'video',
          title: 'Video',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({ parent }: { parent: { type: string } }) => parent?.type !== 'video',
        },
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        },
      ],
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Background color for the tile when no media is present',
      options: {
        list: [
          { title: 'Moss Green', value: 'bg-moss-500' },
          { title: 'Light Moss', value: 'bg-moss-200' },
          { title: 'Brown', value: 'bg-brown-700' },
          { title: 'Light Brown', value: 'bg-brown-200' },
          { title: 'Terracotta', value: 'bg-terracotta-500' },
          { title: 'Light Terracotta', value: 'bg-terracotta-200' },
          { title: 'Cream', value: 'bg-cream-50' },
        ],
      },
      initialValue: 'bg-moss-500',
    },
    {
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'Call-to-action button text (e.g., "Explore", "Learn More")',
    },
    {
      name: 'ctaHref',
      title: 'CTA Link',
      type: 'string',
      description: 'Where the tile links to when clicked',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      description: 'Aspect ratio of the tile',
      options: {
        list: [
          { title: 'Square (1:1)', value: 'square' },
          { title: 'Landscape (4:3)', value: 'landscape' },
          { title: 'Portrait (3:4)', value: 'portrait' },
          { title: 'Widescreen (16:9)', value: 'widescreen' },
        ],
      },
      initialValue: 'square',
    },
    {
      name: 'hoverEffect',
      title: 'Hover Effect',
      type: 'string',
      options: {
        list: [
          { title: 'Zoom In', value: 'zoom' },
          { title: 'Fade', value: 'fade' },
          { title: 'Slide Up', value: 'slideUp' },
          { title: 'None', value: 'none' },
        ],
      },
      initialValue: 'zoom',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'media.image',
      order: 'order',
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: subtitle,
        media: media,
      };
    },
  },
}
