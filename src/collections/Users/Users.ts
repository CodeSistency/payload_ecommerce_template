import { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({ req: { user } }) => user?.role === 'admin' || user?.id === 'id',
    create: () => true, // Public registration
    update: ({ req: { user } }) => user?.role === 'admin' || user?.id === 'id',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'customer'],
      defaultValue: 'customer',
    },
    {
      name: 'address',
      type: 'text',
    },
  ],
};