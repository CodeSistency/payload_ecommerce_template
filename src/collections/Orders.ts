import { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: ({ req: { user } }) => user?.role === 'admin' || user?.id === 'user',
    create: () => true, // Public can create via checkout
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products' },
        { name: 'title', type: 'text' }, // Snapshot
        { name: 'price', type: 'number' }, // Snapshot
        { name: 'quantity', type: 'number' },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'shipped', 'delivered'],
      defaultValue: 'pending',
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: ['unpaid', 'paid'],
      defaultValue: 'unpaid',
    },
  ],
};