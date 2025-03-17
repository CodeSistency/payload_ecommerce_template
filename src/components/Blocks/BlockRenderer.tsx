import React from 'react';
import HeroBlockComponent, { HeroBlockData } from './HeroBlockComponent/HeroBlockComponent';
import CheckoutBlockComponent, { CheckoutBlockData } from './CheckoutBlockComponent/CheckoutBlockComponent';
import OrdersBlockComponent, { OrdersBlockData } from './OrdersBlockComponent/OrdersBlockComponent';
import InfoBlockComponent, { InfoBlockData } from './InfoBlockComponent/InfoBlockComponent';
import CarouselBlockComponent, { CarouselBlockData } from './CarouselBlockComponent/CarouselBlockComponent';
import AboutUsBlockComponent, { AboutUsBlockData } from './AboutUsBlockComponent/AboutUsBlockComponent';
import ListProductsBlockComponent, { ListProductsBlockData } from './ListProductsBlockComponent.tsx/ListProductsBlockComponent';

// Union type of all block types
type BlockType = 'hero' | 'listProducts' | 'aboutUs' | 'carousel' | 'info' | 'orders' | 'checkout';

// Map block types to their data interfaces
type BlockDataMap = {
  hero: HeroBlockData;
  listProducts: ListProductsBlockData;
  aboutUs: AboutUsBlockData;
  carousel: CarouselBlockData;
  info: InfoBlockData;
  orders: OrdersBlockData;
  checkout: CheckoutBlockData;
};

// Define the shape of a block in the layout array
export interface Block {
  blockType: BlockType;
  [key: string]: any; // Allow additional fields
}

// Type the components object
const components: { [K in BlockType]: React.FC<{ block: BlockDataMap[K] }> } = {
  hero: HeroBlockComponent,
  listProducts: ListProductsBlockComponent,
  aboutUs: AboutUsBlockComponent,
  carousel: CarouselBlockComponent,
  info: InfoBlockComponent,
  orders: OrdersBlockComponent,
  checkout: CheckoutBlockComponent,
};

const BlockRenderer: React.FC<{ layout: Block[] }> = ({ layout }) => (
  <div>
    {layout.map((block, i) => {
      const BlockComponent: React.FC<any> = components[block.blockType];
      return BlockComponent ? (
        <BlockComponent
          key={i}
            block={block}
        />
      ) : null;
    })}
  </div>
);

export default BlockRenderer;