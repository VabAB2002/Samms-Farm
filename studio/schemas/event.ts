/**
 * Event Schema
 * For farm and restaurant events with date, price, and booking information
 */
export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  groups: [
    { name: 'details', title: 'Event Details' },
    { name: 'booking', title: 'Booking & Tickets' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      group: 'details',
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
      group: 'details',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'details',
    },
    {
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      group: 'details',
    },
    {
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      group: 'details',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Location name (e.g., "Samm\'s Restaurant", "The Farm")',
      group: 'details',
    },
    {
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Workshop', value: 'workshop' },
          { title: 'Dinner', value: 'dinner' },
          { title: 'Tasting', value: 'tasting' },
          { title: 'Tour', value: 'tour' },
          { title: 'Class', value: 'class' },
          { title: 'Festival', value: 'festival' },
          { title: 'Other', value: 'other' },
        ],
      },
      group: 'details',
    },
    {
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
      description: 'Feature this event on the homepage or events landing page',
      group: 'details',
    },
    // Booking & Tickets Group
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Event price in IDR',
      group: 'booking',
    },
    {
      name: 'priceDescription',
      title: 'Price Description',
      type: 'string',
      description: 'Additional price information (e.g., "per person", "includes dinner")',
      group: 'booking',
    },
    {
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      description: 'Link to booking page or form',
      group: 'booking',
    },
    {
      name: 'availableSpots',
      title: 'Available Spots',
      type: 'number',
      description: 'Number of available spots (leave empty for unlimited)',
      group: 'booking',
    },
    {
      name: 'soldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false,
      group: 'booking',
    },
    // Media Group
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'media',
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
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
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      group: 'media',
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'startDate',
      media: 'mainImage',
      sold: 'soldOut',
    },
    prepare({ title, date, media, sold }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'No date set';
      return {
        title: sold ? `${title} (SOLD OUT)` : title,
        subtitle: formattedDate,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Event Date, Upcoming',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
    {
      title: 'Event Date, Past',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
}
