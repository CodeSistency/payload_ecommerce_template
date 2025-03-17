import React from 'react';
import InfoBlockComponent, { InfoBlockData } from '../InfoBlockComponent/InfoBlockComponent';

export interface BlockData {
  variant: string;
  impactLevel: 'low' | 'normal' | 'high';
  [key: string]: any; // Flexible for block-specific fields
}

type VariantComponent = React.FC<{ block: BlockData }>;

const BlockComponent = ({
  block,
  variants,
  defaultVariant,
}: {
  block: BlockData;
  variants: Record<string, VariantComponent>;
  defaultVariant: string;
}) => {
  const VariantComponent = variants[block.variant] || variants[defaultVariant];
  return (
    <div className={`block impact-${block.impactLevel}`}>
      <VariantComponent block={block} />
      {block.subBlocks?.map((subBlock: InfoBlockData, i: number) => (
        <InfoBlockComponent key={i} block={subBlock} />
      ))}
    </div>
  );
};

export default BlockComponent;