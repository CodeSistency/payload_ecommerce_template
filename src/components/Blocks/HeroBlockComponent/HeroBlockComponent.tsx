// import React from 'react';
// import InfoBlockComponent from '../InfoBlockComponent/InfoBlockComponent';

// export interface HeroBlockData {
//   variant: 'fullWidth' | 'split' | 'compact';
//   impactLevel: 'low' | 'normal' | 'high';
//   headline: string;
//   subheadline?: string;
//   backgroundImage?: { url: string };
//   subBlocks?: any[];
// }

// const FullWidth = ({ block }: { block: HeroBlockData }) => (
//     console.log(block),
//   <div className={`hero full-width impact-${block.impactLevel}`} style={{ backgroundImage: `url(${block.backgroundImage?.url})` }}>
//     <h1>{block.headline}</h1>
//     {block.subheadline && <p>{block.subheadline}</p>}
//     {block.subBlocks && block.subBlocks.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
//   </div>
// );

// const HeroBlockComponent = ({ block }: { block: HeroBlockData }) => {
//   switch (block.variant) {
//     case 'fullWidth':
//       return <FullWidth block={block} />;
//     // Add cases for 'split' and 'compact'
//     default:
//       return <FullWidth block={block} />;
//   }
// };

// export default HeroBlockComponent;

"use client"

import { useEffect } from "react"

export interface HeroBlockData {
  variant: "fullWidth" | "split" | "compact"
  impactLevel: "low" | "normal" | "high"
  headline: string
  subheadline?: string
  backgroundImage?: { url: string }
  subBlocks?: any[]
}

// Full Width variant components
const FullWidth = ({ block }: { block: HeroBlockData }) => {
  const bgStyle = block.backgroundImage
    ? { backgroundImage: `url(${block.backgroundImage.url})`, backgroundSize: "cover", backgroundPosition: "center" }
    : {}

  // Impact level styling
  const containerClasses = {
    low: "py-8 bg-gray-50",
    normal: "py-12 bg-gray-100",
    high: "py-16 bg-gray-200",
  }

  const headlineClasses = {
    low: "text-2xl md:text-3xl font-medium",
    normal: "text-3xl md:text-4xl font-bold",
    high: "text-4xl md:text-5xl font-extrabold text-shadow",
  }

  const subheadlineClasses = {
    low: "text-base md:text-lg text-gray-600 mt-2",
    normal: "text-lg md:text-xl text-gray-700 mt-3",
    high: "text-xl md:text-2xl text-gray-800 mt-4 font-medium",
  }

  return (
    <div className={`w-full ${containerClasses[block.impactLevel]} relative`} style={bgStyle}>
      <div className="absolute inset-0 bg-black/30" style={block.backgroundImage ? {} : { display: "none" }}></div>
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10 text-center">
        <h1 className={`${headlineClasses[block.impactLevel]} ${block.backgroundImage ? "text-white" : ""}`}>
          {block.headline}
        </h1>
        {block.subheadline && (
          <p className={`${subheadlineClasses[block.impactLevel]} ${block.backgroundImage ? "text-white/90" : ""}`}>
            {block.subheadline}
          </p>
        )}
      </div>
    </div>
  )
}

// Split variant components
const Split = ({ block }: { block: HeroBlockData }) => {
  // Impact level styling
  const containerClasses = {
    low: "py-6 bg-gray-50",
    normal: "py-8 bg-gray-100",
    high: "py-10 bg-gray-200",
  }

  const headlineClasses = {
    low: "text-2xl md:text-3xl font-medium",
    normal: "text-3xl md:text-4xl font-bold",
    high: "text-4xl md:text-5xl font-extrabold",
  }

  const subheadlineClasses = {
    low: "text-base md:text-lg text-gray-600 mt-2",
    normal: "text-lg md:text-xl text-gray-700 mt-3",
    high: "text-xl md:text-2xl text-gray-800 mt-4 font-medium",
  }

  return (
    <div className={`w-full ${containerClasses[block.impactLevel]}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {block.backgroundImage ? (
            <>
              <div className="w-full md:w-1/2 order-1 md:order-1">
                <img
                  src={block.backgroundImage.url || "/placeholder.svg"}
                  alt={block.headline}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="w-full md:w-1/2 order-2 md:order-2">
                <h1 className={headlineClasses[block.impactLevel]}>{block.headline}</h1>
                {block.subheadline && <p className={subheadlineClasses[block.impactLevel]}>{block.subheadline}</p>}
              </div>
            </>
          ) : (
            <div className="w-full">
              <h1 className={headlineClasses[block.impactLevel]}>{block.headline}</h1>
              {block.subheadline && <p className={subheadlineClasses[block.impactLevel]}>{block.subheadline}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Compact variant components
const Compact = ({ block }: { block: HeroBlockData }) => {
  const bgStyle = block.backgroundImage
    ? { backgroundImage: `url(${block.backgroundImage.url})`, backgroundSize: "cover", backgroundPosition: "center" }
    : {}

  // Impact level styling
  const containerClasses = {
    low: "py-4 bg-gray-50",
    normal: "py-6 bg-gray-100",
    high: "py-8 bg-gray-200",
  }

  const headlineClasses = {
    low: "text-xl md:text-2xl font-medium",
    normal: "text-2xl md:text-3xl font-bold",
    high: "text-3xl md:text-4xl font-extrabold",
  }

  const subheadlineClasses = {
    low: "text-sm md:text-base text-gray-600 mt-1",
    normal: "text-base md:text-lg text-gray-700 mt-2",
    high: "text-lg md:text-xl text-gray-800 mt-3 font-medium",
  }

  return (
    <div className={`w-full ${containerClasses[block.impactLevel]} relative`} style={bgStyle}>
      <div className="absolute inset-0 bg-black/30" style={block.backgroundImage ? {} : { display: "none" }}></div>
      <div className="container mx-auto px-4 py-4 md:py-8 relative z-10 text-center">
        <h1 className={`${headlineClasses[block.impactLevel]} ${block.backgroundImage ? "text-white" : ""}`}>
          {block.headline}
        </h1>
        {block.subheadline && (
          <p className={`${subheadlineClasses[block.impactLevel]} ${block.backgroundImage ? "text-white/90" : ""}`}>
            {block.subheadline}
          </p>
        )}
      </div>
    </div>
  )
}

// Variant mapping
const variants = {
  fullWidth: FullWidth,
  split: Split,
  compact: Compact,
}

// Default block data to prevent undefined errors
const defaultBlock: HeroBlockData = {
  variant: "fullWidth",
  impactLevel: "normal",
  headline: "Welcome to our store",
}

// Main component with debugging
const HeroBlockComponent = ({ block }: { block: HeroBlockData }) => {
  // Add debugging to see what props are being received
  useEffect(() => {
    console.log("HeroBlockComponent received props:", block)
  }, [block])

  // Skip the safety checks - use the provided block directly
  // This will help identify if the issue is with the props or the safety logic
  const VariantComponent = variants[block.variant]

  return (
    <section className="hero-block">
      <VariantComponent block={block} />
      {block.subBlocks && block.subBlocks.length > 0 && (
        <div className="sub-blocks container mx-auto px-4 py-4">
          {block.subBlocks.map((subBlock, index) => (
            <div key={index} className="sub-block">
              {/* Render sub-block content */}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default HeroBlockComponent

