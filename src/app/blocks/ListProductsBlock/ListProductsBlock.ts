import { Block } from "payload";
import { InfoBlock } from "../InfoBlock/InfoBlock";


export const ListProductsBlock: Block = {
  slug: 'listProducts',
  fields: [
    {
      name: 'variant',
      type: 'select',
      options: ['grid', 'list', 'carousel'],
      required: true,
    },
    {
      name: 'impactLevel',
      type: 'select',
      options: ['low', 'normal', 'high'],
      defaultValue: 'normal',
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'subBlocks',
      type: 'blocks',
      blocks: [InfoBlock], // Add product-related info
    },
  ],
};