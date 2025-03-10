import Image from "next/image";
import { ProductCardProps } from "./ProductCard.types";

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // Extract image URL from featuredImage (handle string | Media)
    const imageUrl = product.featuredImage && typeof product.featuredImage !== "string"
      ? product.featuredImage.url
      : undefined;
  
    // Simplified rich text description (first paragraph)
    const descriptionText = product.description.root.children
      .map((child) => child.type === "paragraph" ? (child.children as { text: string }[])[0]?.text : "")
      .filter(Boolean)
      .join(" ") || "No description available";
  
    // Determine display price (use first variant price if applicable)
    const displayPrice = product.hasVariants && product.variants?.[0]?.price
      ? product.variants[0].price
      : product.price;
  
    return (
      <div className="border border-secondary dark:border-secondaryDark p-4 rounded">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product.title}
            width={200}
            height={200}
            className="object-cover"
          />
        )}
        <h3 className="text-lg font-semibold text-primary dark:text-primaryDark">{product.title}</h3>
        <p className="text-sm text-secondary dark:text-secondaryDark truncate">{descriptionText}</p>
        <p className="text-primary dark:text-primaryDark">${displayPrice?.toFixed(2)}</p>
        {product.compareAtPrice && (
          <p className="text-secondary dark:text-secondaryDark line-through">
            ${product.compareAtPrice.toFixed(2)}
          </p>
        )}
        {product.availability === "outOfStock" && (
          <p className="text-red-500">Out of Stock</p>
        )}
        <button className="mt-2 bg-primary dark:bg-primaryDark text-white px-4 py-2 rounded">
          Add to Cart
        </button>
      </div>
    );
  };