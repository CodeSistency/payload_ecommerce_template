import React from 'react';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
export interface AboutUsBlockData {
    variant: 'textOnly' | 'withImage' | 'timeline';
    impactLevel: 'low' | 'normal' | 'high';
    content: SerializedEditorState;
    subBlocks?: any[];
  }

// Variant: TextOnly
const TextOnly = ({ block }: { block: AboutUsBlockData }) => (
  <div className="about-us text-only">
        <RichText data={block.content} />
  </div>
);

// Variant: WithImage
const WithImage = ({ block }: { block: AboutUsBlockData }) => (
  <div className="about-us with-image flex flex-col md:flex-row gap-4">
    <div className="md:w-1/2">
      <img src="/placeholder-about-us.jpg" alt="About Us" className="w-full h-64 object-cover" /> {/* Replace with dynamic image if available */}
    </div>
    <div className="md:w-1/2">
        <RichText data={block.content} />
    </div>
  </div>
);

// Variant: Timeline
const Timeline = ({ block }: { block: AboutUsBlockData }) => (
  <div className="about-us timeline">
    <div className="relative border-l-2 border-gray-300 pl-4">
        <RichText data={block.content} />
    {/* Add timeline-specific styling or logic if needed */}
    </div>
  </div>
);

// Variants Object
const variants = {
  textOnly: TextOnly,
  withImage: WithImage,
  timeline: Timeline,
};

// Main Component
const AboutUsBlockComponent = ({ block }: { block: AboutUsBlockData }) => {
    const VariantComponent = variants[block.variant] || variants.textOnly;
    return <VariantComponent block={block} />;
};

export default AboutUsBlockComponent;