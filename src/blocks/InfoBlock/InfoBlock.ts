import { Block } from "payload";

export const InfoBlock: Block = {
  slug: 'info',
  fields: [
    {
      name: 'variant',
      type: 'select',
      options: ['simple', 'highlighted', 'boxed'],
      required: true,
    },
    {
      name: 'impactLevel',
      type: 'select',
      options: ['low', 'normal', 'high'],
      defaultValue: 'normal',
    },
    {
      name: 'text',
      type: 'text',
      required: true,
    },
  ],
};