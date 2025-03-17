import React from 'react';

export interface InfoBlockData {
  variant: 'simple' | 'highlighted' | 'boxed';
  impactLevel: 'low' | 'normal' | 'high';
  text: string;
}



const Simple = ({ block }: { block: InfoBlockData }) => (
  <div className={`info simple impact-${block.impactLevel}`}>
    <p>{block.text}</p>
  </div>
);

const InfoBlockComponent = ({ block }: { block: InfoBlockData }) => {
  switch (block.variant) {
    case 'simple':
      return <Simple block={block} />;
    // Add cases for 'highlighted' and 'boxed'
    default:
      return <Simple block={block} />;
  }
};

export default InfoBlockComponent;