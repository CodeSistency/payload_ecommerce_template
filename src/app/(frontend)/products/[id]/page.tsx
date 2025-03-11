
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Product } from "@/payload-types"; // Adjust path to your product type
import { useModelTempStore } from "@/lib/models";
import { ProductsModel } from "@/lib/models/Products";
import ProductDetails from "@/components/Views/ProductDetail/ProductDetailScreen.comp";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: { Products: selectedProduct }, actions: { setModelTemp } } = useModelTempStore();

  // This is a fallback in case the product isn't in temp store yet
  // In a real app, you might want to fetch from API if not found
  useEffect(() => {
    if (!id || selectedProduct[0]?.id === id) return;

    // Here you could fetch the product if it's not in temp store
    // For now, we'll just clear it if it doesn't match
    if (selectedProduct && selectedProduct[0].id !== id) {
      setModelTemp(ProductsModel.key, []);
    }
  }, [id, selectedProduct, setModelTemp]);

  if (!selectedProduct) {
    return (
      <div className="container mx-auto p-4">
        <p>No product selected. Please select a product from the homepage.</p>
      </div>
    );
  }

  return (
    <div>
      <ProductDetails product={selectedProduct[0]} />
    </div>
  );
};

export default ProductDetailPage;