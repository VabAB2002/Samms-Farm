/**
 * Menu PDF Schema
 * For uploading and managing restaurant menu PDFs
 */
export default {
  name: 'menuPdf',
  title: 'Menu PDF',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Menu Name',
      type: 'string',
      description: 'Name of the menu (e.g., "Dinner Menu", "Drinks Menu")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Menu Thumbnail',
      type: 'image',
      description: 'Thumbnail image for the menu (optional)',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Short description of this menu',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'menuType',
      title: 'Menu Type',
      type: 'string',
      options: {
        list: [
          { title: 'Breakfast', value: 'breakfast' },
          { title: 'Lunch', value: 'lunch' },
          { title: 'Dinner', value: 'dinner' },
          { title: 'Drinks', value: 'drinks' },
          { title: 'Dessert', value: 'dessert' },
          { title: 'Seasonal', value: 'seasonal' },
          { title: 'Special', value: 'special' },
        ],
      },
    },
    {
      name: 'active',
      title: 'Active Menu',
      type: 'boolean',
      description: 'Is this an active menu currently in use?',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'thumbnail',
      updated: 'lastUpdated',
      active: 'active',
    },
    prepare({ title, media, updated, active }) {
      const formattedDate = updated ? new Date(updated).toLocaleDateString() : 'No date';
      return {
        title: active ? title : `${title} (Inactive)`,
        subtitle: `Last updated: ${formattedDate}`,
        media,
      };
    },
  },
}
