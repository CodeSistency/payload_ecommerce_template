import { Block } from 'payload';
import { InfoBlock } from '../InfoBlock/InfoBlock';

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'variant',
      type: 'select',
      options: ['fullWidth', 'split', 'compact'],
      required: true,
    },
    {
      name: 'impactLevel',
      type: 'select',
      options: ['low', 'normal', 'high'],
      defaultValue: 'normal',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'subBlocks',
      type: 'blocks',
      blocks: [InfoBlock], // Nested sub-blocks
      maxRows: 2, // Limit for simplicity
    },
  ],
};