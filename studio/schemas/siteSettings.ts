/**
 * Site Settings Schema
 * Global settings for the site including contact information, 
 * social media links, business hours, and SEO defaults
 */
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact Information' },
    { name: 'social', title: 'Social Media' },
    { name: 'hours', title: 'Business Hours' },
    { name: 'seo', title: 'SEO Defaults' },
  ],
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    // Contact Information Group
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      group: 'contact',
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      group: 'contact',
    },
    // Social Media Group
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'LinkedIn', value: 'linkedin' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
      group: 'social',
    },
    // Business Hours Group
    {
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'days',
              title: 'Days',
              type: 'string',
              description: 'E.g., "Monday - Thursday" or "Weekends"',
            },
            {
              name: 'hours',
              title: 'Hours',
              type: 'string',
              description: 'E.g., "9AM - 5PM" or "Closed"',
            },
          ],
        },
      ],
      group: 'hours',
    },
    // SEO Defaults Group
    {
      name: 'seoTitle',
      title: 'Default SEO Title',
      type: 'string',
      description: 'Default title for SEO (used when page-specific title is not available)',
      group: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      description: 'Default meta description (used when page-specific description is not available)',
      group: 'seo',
    },
    {
      name: 'seoKeywords',
      title: 'Default Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'seo',
    },
    {
      name: 'ogImage',
      title: 'Default Open Graph Image',
      type: 'image',
      description: 'Default image for social sharing (used when page-specific image is not available)',
      options: {
        hotspot: true,
      },
      group: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo',
    },
  },
}
