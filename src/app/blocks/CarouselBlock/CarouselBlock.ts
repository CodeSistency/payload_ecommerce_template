import { Block } from "payload";
import { InfoBlock } from "../InfoBlock/InfoBlock";

export const CarouselBlock: Block = {
    slug: 'carousel',
    fields: [
      {
        name: 'variant',
        type: 'select',
        options: ['imageOnly', 'withText', 'fullScreen'],
        required: true,
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
            name: 'image',
            type: 'upload',
            relationTo: 'media',
          },
          {
            name: 'caption',
            type: 'text',
          },
        ],
      },
      {
        name: 'subBlocks',
        type: 'blocks',
        blocks: [InfoBlock],
      },
    ],
  };