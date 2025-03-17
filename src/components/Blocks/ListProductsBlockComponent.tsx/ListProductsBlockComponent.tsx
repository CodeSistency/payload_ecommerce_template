import React from 'react';
import BlockComponent from '../BlockComponent/BlockComponent';


export interface ListProductsBlockData {
  variant: 'grid' | 'list' | 'carousel';
  impactLevel: 'low' | 'normal' | 'high';
  products: { id: string; title: string; price: number; images?: { image: { url: string } }[] }[];
  subBlocks?: any[];
}

// Variant: Grid
const Grid = ({ block }: { block: ListProductsBlockData }) => (
  <div className="list-products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {block.products.map((product) => (
      <div key={product.id} className="border p-4 rounded">
        {product.images?.[0]?.image && (
          <img src={product.images[0].image.url} alt={product.title} className="w-full h-48 object-cover mb-2" />
        )}
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p>${product.price}</p>
      </div>
    ))}
  </div>
);

// Variant: List
const List = ({ block }: { block: ListProductsBlockData }) => (
  <div className="list-products list space-y-4">
    {block.products.map((product) => (
      <div key={product.id} className="flex border p-4 rounded">
        {product.images?.[0]?.image && (
          <img src={product.images[0].image.url} alt={product.title} className="w-24 h-24 object-cover mr-4" />
        )}
        <div>
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p>${product.price}</p>
        </div>
      </div>
    ))}
  </div>
);

// Variant: Carousel
const Carousel = ({ block }: { block: ListProductsBlockData }) => (
  <div className="list-products carousel flex space-x-4 overflow-x-auto">
    {block.products.map((product) => (
      <div key={product.id} className="flex-shrink-0 w-64 border p-4 rounded">
        {product.images?.[0]?.image && (
          <img src={product.images[0].image.url} alt={product.title} className="w-full h-48 object-cover mb-2" />
        )}
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p>${product.price}</p>
      </div>
    ))}
  </div>
);

// Variants Object
const variants = {
  grid: Grid,
  list: List,
  carousel: Carousel,
};



// Main Component
const ListProductsBlockComponent = ({ block }: { block: ListProductsBlockData }) => {
    const VariantComponent = variants[block.variant] || variants.grid;
    return <VariantComponent block={block} />;
};

export default ListProductsBlockComponent;