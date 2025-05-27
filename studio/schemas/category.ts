/**
 * Category Schema
 * For categorizing blog posts
 */
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Color for category labels (matches brand palette)',
      options: {
        list: [
          { title: 'Moss Green', value: 'moss' },
          { title: 'Brown', value: 'brown' },
          { title: 'Terracotta', value: 'terracotta' },
          { title: 'Cream', value: 'cream' },
        ],
      },
      initialValue: 'moss',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
}
