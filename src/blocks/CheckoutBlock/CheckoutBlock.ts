import { Block } from "payload";
import { InfoBlock } from "../InfoBlock/InfoBlock";


export const CheckoutBlock: Block = {
  slug: 'checkout',
  fields: [
    {
      name: 'variant',
      type: 'select',
      options: ['simple', 'detailed', 'stepped'],
      required: true,
      defaultValue: 'simple',
    },
    {
      name: 'impactLevel',
      type: 'select',
      options: ['low', 'normal', 'high'],
      defaultValue: 'normal',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'subBlocks',
      type: 'blocks',
      blocks: [InfoBlock],
      maxRows: 2,
    },
  ],
};