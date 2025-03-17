import React from 'react';
import InfoBlockComponent from '../InfoBlockComponent/InfoBlockComponent';

export interface CarouselBlockData {
  variant: 'imageOnly' | 'withText' | 'product';
  impactLevel: 'low' | 'normal' | 'high';
  items: { image?: { url: string }; caption?: string; product?: { id: string; title: string; images?: { image: { url: string } }[] } }[];
  subBlocks?: any[];
}

// Variant: ImageOnly
const ImageOnly = ({ block }: { block: CarouselBlockData }) => (
  <div className={`carousel image-only impact-${block.impactLevel} flex space-x-4 overflow-x-auto`}>
    {block.items.map((item, index) => (
      <div key={index} className="flex-shrink-0">
        {item.image && <img src={item.image.url} alt={item.caption || 'Carousel Image'} className="h-48 w-48 object-cover" />}
      </div>
    ))}
    {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
  </div>
);

// Variant: WithText
const WithText = ({ block }: { block: CarouselBlockData }) => (
  <div className={`carousel with-text impact-${block.impactLevel} flex space-x-4 overflow-x-auto`}>
    {block.items.map((item, index) => (
      <div key={index} className="flex-shrink-0 text-center">
        {item.image && <img src={item.image.url} alt={item.caption || 'Carousel Image'} className="h-48 w-48 object-cover" />}
        {item.caption && <p className="mt-2">{item.caption}</p>}
      </div>
    ))}
    {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
  </div>
);

// Variant: Product
const Product = ({ block }: { block: CarouselBlockData }) => (
  <div className={`carousel product impact-${block.impactLevel} flex space-x-4 overflow-x-auto`}>
    {block.items.map((item, index) => (
      <div key={index} className="flex-shrink-0 text-center">
        {item.product && (
          <>
            {item.product.images?.[0]?.image && (
              <img src={item.product.images[0].image.url} alt={item.product.title} className="h-48 w-48 object-cover" />
            )}
            <p className="mt-2">{item.product.title}</p>
          </>
        )}
      </div>
    ))}
    {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
  </div>
);

// Main Component
const CarouselBlockComponent = ({ block }: { block: CarouselBlockData }) => {
  switch (block.variant) {
    case 'imageOnly':
      return <ImageOnly block={block} />;
    case 'withText':
      return <WithText block={block} />;
    case 'product':
      return <Product block={block} />;
    default:
      return <ImageOnly block={block} />;
  }
};

export default CarouselBlockComponent;