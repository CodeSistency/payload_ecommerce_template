import { Block } from "payload";
import { InfoBlock } from "../InfoBlock/InfoBlock";


export const OrdersBlock: Block = {
  slug: 'orders',
  fields: [
    {
      name: 'variant',
      type: 'select',
      options: ['list', 'table', 'summary'],
      required: true,
      defaultValue: 'list',
    },
    {
      name: 'impactLevel',
      type: 'select',
      options: ['low', 'normal', 'high'],
      defaultValue: 'normal',
    },
    {
      name: 'orders',
      type: 'relationship',
      relationTo: 'orders', // Assumes an 'orders' collection exists
      hasMany: true,
    },
    {
      name: 'subBlocks',
      type: 'blocks',
      blocks: [InfoBlock],
      maxRows: 2,
    },
  ],
};