import { Carousel } from "@/components/Generic/Carousel/Carousel.comp";
import { Navbar } from "@/components/Generic/Navbar/Navbar.comp";
import { ProductCard } from "@/components/Generic/ProductCard/ProductCard.comp";
import { Product } from "@/payload-types";
import { useEffect, useState } from "react";


export const HomepageScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Use the first product as a featured item in the carousel (optional)
  const featuredProduct = products[0];

  return (
    <div>
      <Navbar />
      <Carousel product={featuredProduct} />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primaryDark">Featured Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};