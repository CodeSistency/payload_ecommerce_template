import Image from "next/image";
import { CarouselProps } from "./Carousel.types";

export const Carousel: React.FC<CarouselProps> = ({
  product,
  defaultImage = "/hero-image.jpg",
  defaultTitle = "Welcome to Our Store",
}) => {
  const imageUrl = (product?.featuredImage && typeof product.featuredImage !== "string"
    ? product.featuredImage.url
    : defaultImage) || defaultImage;
  const title = product?.title || defaultTitle;

  return (
    <div className="relative h-64 bg-secondary dark:bg-secondaryDark">
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-4xl text-white font-bold">{title}</h2>
      </div>
    </div>
  );
};