/**
 * Home Hero Schema
 * Represents the hero section of the homepage with headline, sub-headline, media, and CTA
 */
export default {
  name: 'homeHero',
  title: 'Home Hero',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main headline for the hero section',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subHeadline',
      title: 'Sub-headline',
      type: 'text',
      rows: 2,
      description: 'Secondary text below the headline',
    },
    {
      name: 'heroMedia',
      title: 'Hero Media',
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
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          description: 'URL to external video (YouTube, Vimeo, etc.)',
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
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Button Label',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'href',
          title: 'Button Link',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Tertiary', value: 'tertiary' },
            ],
          },
          initialValue: 'primary',
        },
      ],
    },
    {
      name: 'secondaryCta',
      title: 'Secondary Call to Action',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Button Label',
          type: 'string',
        },
        {
          name: 'href',
          title: 'Button Link',
          type: 'string',
        },
      ],
    },
    {
      name: 'overlayColor',
      title: 'Overlay Color',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' },
          { title: 'Brown', value: 'brown' },
          { title: 'Moss Green', value: 'moss' },
          { title: 'Terracotta', value: 'terracotta' },
        ],
      },
      initialValue: 'dark',
    },
    {
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).max(100),
      initialValue: 50,
      hidden: ({ document }: { document: { overlayColor: string } }) => document?.overlayColor === 'none',
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subHeadline',
      media: 'heroMedia.image',
    },
  },
}
