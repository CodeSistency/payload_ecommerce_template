import Image from "next/image";
import { ProductCardProps } from "./ProductCard.types";
import { useModelTempStore } from "@/lib/models";
import { useCartStore } from "@/lib/models/__stores__/cart/cart.store";
import { ProductsModel } from "@/lib/models/Products";
import Link from "next/link";

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { actions: { setModelTemp } } = useModelTempStore();
  const { actions: { createModelCart } } = useCartStore();

  const imageUrl = product.featuredImage && typeof product.featuredImage !== "string"
    ? product.featuredImage.url
    : undefined;

  const descriptionText = product.description.root.children
    .map((child) => child.type === "paragraph" ? (child.children as { text: string }[])[0]?.text : "")
    .filter(Boolean)
    .join(" ") || "No description available";

  const displayPrice = product.hasVariants && product.variants?.[0]?.price
    ? product.variants[0].price
    : product.price;

  const handleProductClick = () => {
    setModelTemp(ProductsModel.key, [product]);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    createModelCart("cart", "productId", product.id, {
      productId: product.id,  // Changed from 'id' to 'productId'
      title: product.title,
      price: displayPrice || 0,
      quantity: 1,
      image: imageUrl || "",        // Changed from 'imageUrl' to 'image'
    });
  };

  return (
    <Link href={`/products/${product.id}`} onClick={handleProductClick}>
      <div className="border border-secondary dark:border-secondaryDark p-4 rounded hover:shadow-lg">
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
        <button
          onClick={handleAddToCart}
          className="mt-2 bg-primary dark:bg-primaryDark text-white px-4 py-2 rounded"
          disabled={product.availability === "outOfStock"}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};