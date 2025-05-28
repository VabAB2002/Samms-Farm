/**
 * Menu Item Schema
 * For managing featured menu items with images
 */

export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'section',
      title: 'Menu Section',
      type: 'string',
      options: {
        list: [
          { title: 'Coffee', value: 'coffee' },
          { title: 'Food', value: 'food' },
          { title: 'Desserts', value: 'desserts' },
          { title: 'Drinks', value: 'drinks' }
        ]
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'The category within the section (e.g., "Hot Coffee" within the Coffee section)'
    },
    {
      name: 'featured',
      title: 'Featured Item',
      type: 'boolean',
      description: 'Set to true to display this item as a featured item in the menu',
      initialValue: false
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Image used for featured items display (2:3 aspect ratio recommended)'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Price with currency (e.g., "35K")'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string'
            },
            {
              name: 'price',
              title: 'Price',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'soldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'popular',
      title: 'Popular',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'image'
    }
  }
}
