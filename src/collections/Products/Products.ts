import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Public read access for published products
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data.slug && data.title) {
          data.slug = data.title.toLowerCase().replace(/ /g, '-');
        }
        if (!data.featuredImage && data.images?.length) {
          data.featuredImage = data.images[0];
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'compareAtPrice',
      type: 'number',
    },
    {
      name: 'taxable',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'hasVariants',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'variants',
      type: 'array',
      admin: {
        condition: (data) => data.hasVariants,
      },
      fields: [
        { name: 'option1', type: 'text' },
        { name: 'option2', type: 'text' },
        { name: 'option3', type: 'text' },
        { name: 'price', type: 'number' },
        { name: 'sku', type: 'text' },
        { name: 'stock', type: 'number' },
        { name: 'barcode', type: 'text' },
      ],
    },
    {
      name: 'trackInventory',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'stock',
      type: 'number',
      admin: {
        condition: (data) => data.trackInventory && !data.hasVariants,
      },
    },
    {
      name: 'availability',
      type: 'select',
      options: ['inStock', 'outOfStock', 'preOrder'],
      defaultValue: 'inStock',
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'metaTitle',
      type: 'text',
    },
    {
      name: 'metaDescription',
      type: 'text',
    },
    {
      name: 'handle',
      type: 'text',
    },
    {
      name: 'productType',
      type: 'select',
      options: ['physical', 'digital', 'service'],
    },
    {
      name: 'digitalFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => data.productType === 'digital',
      },
    },
    {
      name: 'weight',
      type: 'number',
      admin: {
        condition: (data) => data.productType === 'physical',
      },
    },
    {
      name: 'customFields',
      type: 'blocks',
      blocks: [
        {
          slug: 'textField',
          fields: [
            { name: 'key', type: 'text' },
            { name: 'value', type: 'text' },
          ],
        },
        {
          slug: 'numberField',
          fields: [
            { name: 'key', type: 'text' },
            { name: 'value', type: 'number' },
          ],
        },
        {
          slug: 'selectField',
          fields: [
            { name: 'key', type: 'text' },
            { name: 'value', type: 'select', options: ['option1', 'option2'] },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published', 'archived'],
      defaultValue: 'draft',
    },
  ],
};