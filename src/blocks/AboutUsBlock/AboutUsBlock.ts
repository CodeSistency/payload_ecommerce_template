import { Block } from "payload";
import { InfoBlock } from "../InfoBlock/InfoBlock";

export const AboutUsBlock: Block = {
    slug: 'aboutUs',
    fields: [
      {
        name: 'variant',
        type: 'select',
        options: ['textOnly', 'withImage', 'timeline'],
        required: true,
      },
      {
        name: 'impactLevel',
        type: 'select',
        options: ['low', 'normal', 'high'],
        defaultValue: 'normal',
      },
      {
        name: 'content',
        type: 'richText',
        required: true,
      },
      {
        name: 'subBlocks',
        type: 'blocks',
        blocks: [InfoBlock],
      },
    ],
  };