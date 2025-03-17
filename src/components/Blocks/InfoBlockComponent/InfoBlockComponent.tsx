// import React from 'react';

// export interface InfoBlockData {
//   variant: 'simple' | 'highlighted' | 'boxed';
//   impactLevel: 'low' | 'normal' | 'high';
//   text: string;
// }



// const Simple = ({ block }: { block: InfoBlockData }) => (
//   <div className={`info simple impact-${block.impactLevel}`}>
//     <p>{block.text}</p>
//   </div>
// );

// const InfoBlockComponent = ({ block }: { block: InfoBlockData }) => {
//   switch (block.variant) {
//     case 'simple':
//       return <Simple block={block} />;
//     // Add cases for 'highlighted' and 'boxed'
//     default:
//       return <Simple block={block} />;
//   }
// };

// export default InfoBlockComponent;

"use client"

export interface InfoBlockData {
  variant: "simple" | "highlighted" | "boxed"
  impactLevel: "low" | "normal" | "high"
  text: string
}

// Simple variant component
const Simple = ({ block }: { block: InfoBlockData }) => {
  // Impact level styling
  const textClasses = {
    low: "text-sm text-gray-600",
    normal: "text-base text-gray-700",
    high: "text-lg font-medium text-gray-800",
  }

  return (
    <div className="w-full max-w-prose">
      <p className={textClasses[block.impactLevel]}>{block.text}</p>
    </div>
  )
}

// Highlighted variant component
const Highlighted = ({ block }: { block: InfoBlockData }) => {
  // Impact level styling for highlighted variant
  const containerClasses = {
    low: "bg-gray-50 border-l-2 border-gray-200 pl-4 py-2",
    normal: "bg-gray-100 border-l-3 border-gray-300 pl-4 py-3",
    high: "bg-gray-200 border-l-4 border-gray-400 pl-5 py-4",
  }

  const textClasses = {
    low: "text-sm text-gray-600",
    normal: "text-base text-gray-700",
    high: "text-lg font-medium text-gray-800",
  }

  return (
    <div className={`w-full max-w-prose ${containerClasses[block.impactLevel]}`}>
      <p className={textClasses[block.impactLevel]}>{block.text}</p>
    </div>
  )
}

// Boxed variant component
const Boxed = ({ block }: { block: InfoBlockData }) => {
  // Impact level styling for boxed variant
  const containerClasses = {
    low: "bg-white border border-gray-200 rounded p-3 shadow-sm",
    normal: "bg-white border border-gray-300 rounded-md p-4 shadow",
    high: "bg-white border border-gray-400 rounded-lg p-5 shadow-md",
  }

  const textClasses = {
    low: "text-sm text-gray-600",
    normal: "text-base text-gray-700",
    high: "text-lg font-medium text-gray-800",
  }

  return (
    <div className={`w-full max-w-prose ${containerClasses[block.impactLevel]}`}>
      <p className={textClasses[block.impactLevel]}>{block.text}</p>
    </div>
  )
}

// Variant mapping
const variants = {
  simple: Simple,
  highlighted: Highlighted,
  boxed: Boxed,
}

// Main component
const InfoBlockComponent = ({ block }: { block: InfoBlockData }) => {
  const VariantComponent = variants[block.variant]

  return (
    <section className="info-block py-4">
      <VariantComponent block={block} />
    </section>
  )
}

export default InfoBlockComponent

