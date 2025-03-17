import React from 'react';
import InfoBlockComponent from '../InfoBlockComponent/InfoBlockComponent';

export interface HeroBlockData {
  variant: 'fullWidth' | 'split' | 'compact';
  impactLevel: 'low' | 'normal' | 'high';
  headline: string;
  subheadline?: string;
  backgroundImage?: { url: string };
  subBlocks?: any[];
}

const FullWidth = ({ block }: { block: HeroBlockData }) => (
    console.log(block),
  <div className={`hero full-width impact-${block.impactLevel}`} style={{ backgroundImage: `url(${block.backgroundImage?.url})` }}>
    <h1>{block.headline}</h1>
    {block.subheadline && <p>{block.subheadline}</p>}
    {block.subBlocks && block.subBlocks.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
  </div>
);

const HeroBlockComponent = ({ block }: { block: HeroBlockData }) => {
  switch (block.variant) {
    case 'fullWidth':
      return <FullWidth block={block} />;
    // Add cases for 'split' and 'compact'
    default:
      return <FullWidth block={block} />;
  }
};

export default HeroBlockComponent;