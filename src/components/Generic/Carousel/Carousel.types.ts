import { Product } from "@/payload-types";

export interface CarouselProps {
    product?: Product; // Optional featured product
    defaultImage?: string;
    defaultTitle?: string;
  }