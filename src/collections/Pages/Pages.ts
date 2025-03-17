import { AboutUsBlock } from "@/blocks/AboutUsBlock/AboutUsBlock";
import { CarouselBlock } from "@/blocks/CarouselBlock/CarouselBlock";
import { CheckoutBlock } from "@/blocks/CheckoutBlock/CheckoutBlock";
import { HeroBlock } from "@/blocks/HeroBlock/HeroBlock";
import { InfoBlock } from "@/blocks/InfoBlock/InfoBlock";
import { ListProductsBlock } from "@/blocks/ListProductsBlock/ListProductsBlock";
import { OrdersBlock } from "@/blocks/OrdersBlock/OrdersBlock";
import { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
      useAsTitle: 'title',
      defaultColumns: ['title', 'slug', 'createdAt', 'updatedAt'],
    },
    access: {
      read: () => true, // Public read access
      create: ({ req: { user } }) => user?.role === 'admin',
      update: ({ req: { user } }) => user?.role === 'admin',
      delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'slug',
        type: 'text',
        unique: true,
        required: true,
      },
      {
        name: 'layout',
        type: 'blocks',
        blocks: [
          HeroBlock,
          ListProductsBlock,
          AboutUsBlock,
          CarouselBlock,
          InfoBlock,
          OrdersBlock,
          CheckoutBlock,
        ],
        required: true,
      },
    ],
  };