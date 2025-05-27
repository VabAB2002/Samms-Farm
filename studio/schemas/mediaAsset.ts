/**
 * Media Asset Schema
 * For managing images and videos used throughout the website
 */
export default {
  name: 'mediaAsset',
  title: 'Media Asset',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      group: 'details',
    },
    {
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility',
      group: 'details',
    },
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Image', value: 'heroImage' },
          { title: 'Gallery Image', value: 'galleryImage' },
          { title: 'Background Image', value: 'backgroundImage' },
          { title: 'Product Image', value: 'productImage' },
          { title: 'Video', value: 'video' },
          { title: 'Icon', value: 'icon' }
        ]
      },
      group: 'details',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Home Page', value: 'homePage' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Shop', value: 'shop' },
          { title: 'Blog', value: 'blog' },
          { title: 'About', value: 'about' }
        ]
      },
      group: 'details',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      hidden: ({ document }: { document: any }) => document?.mediaType === 'video',
      group: 'media',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      hidden: ({ document }: { document: any }) => document?.mediaType !== 'video',
      group: 'media',
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'URL to external video (YouTube, Vimeo, etc.)',
      hidden: ({ document }: { document: any }) => document?.mediaType !== 'video',
      group: 'media',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      group: 'details',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'details',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      type: 'mediaType',
      category: 'category',
    },
    prepare({ title, media, type, category }: { title: string; media?: any; type?: string; category?: string }) {
      return {
        title,
        subtitle: `${type || 'No type'} | ${category || 'No category'}`,
        media,
      };
    },
  },
}
