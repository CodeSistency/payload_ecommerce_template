"use client";
import { Carousel } from "@/components/Generic/Carousel/Carousel.comp";
import { Navbar } from "@/components/Generic/Navbar/Navbar.comp";
import { ProductCard } from "@/components/Generic/ProductCard/ProductCard.comp";
import { useModelDataStore } from "@/lib/models";
import { useQueryWithFetchHook } from "@/lib/utils/hooks/useQueryWithFetch";
import { Product } from "@/payload-types";
import { useEffect } from "react";
import { ProductsModel } from "@/lib/models/Products";

export const HomepageScreen: React.FC = () => {
  const Products = useQueryWithFetchHook<Product[]>({
    key: ProductsModel.key,
    url: ProductsModel.endpoint.get.url,
  });

  const { actions: { setModelData } } = useModelDataStore();

  useEffect(() => {
    if (Products.isSuccess) {
      setModelData(ProductsModel.key, Products.data ?? []);
    }
  }, [Products.isSuccess, Products.data]);

  // Ensure products is always an array
  const products = Array.isArray(Products.data) ? Products.data : [];
  const featuredProduct = products[0];

  if (Products.isLoading) {
    return (
      <div className="w-full">
        <Navbar />
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primaryDark">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg"></div>
                <div className="mt-3 bg-gray-200 h-4 w-3/4 rounded"></div>
                <div className="mt-2 bg-gray-200 h-4 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (Products.isError) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto py-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primaryDark">Error</h2>
          <p className="text-red-500">
            Failed to fetch products: {Products.error?.message || "Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto py-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primaryDark">No Products Found</h2>
          <p className="text-gray-500">There are no products available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {featuredProduct && <Carousel product={featuredProduct} />}
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primaryDark">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

// export const HomepageScreen: React.FC = () => {
//   // Use your custom hook to fetch products
//   const {
//     data: productsResponse,
//     isLoading,
//     isError,
//   } = useQueryWithFetchHook<Product[]>({
//     key: 'products', // Unique key for this query
//     url: '/api/products', // Adjust the URL as necessary
//   });

//   // Extract the products data from the response
//   const products = productsResponse ?? [];

//   // Use the first product as a featured item in the carousel (optional)
//   const featuredProduct = products[0];

//   if (isLoading) {
//     return <p>Loading products...</p>;
//   }

//   if (isError) {
//     return <p>Error fetching products. Please try again later.</p>;
//   }

//   return (
//     <div>
//       <Navbar />
//       {featuredProduct && <Carousel product={featuredProduct} />}
//       <div className="container mx-auto py-8">
//         <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primaryDark">Featured Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };