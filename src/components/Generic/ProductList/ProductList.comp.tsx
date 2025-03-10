import { Product } from '@/payload-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard.comp';

interface ProductListProps {
  initialProducts: Product[];
  mode?: 'client' | 'server';
  onServerFilter?: (params: Record<string, string>) => Promise<Product[]>;
}

const ProductList = ({ 
  initialProducts, 
  mode = 'client', 
  onServerFilter 
}: ProductListProps) => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  // Get current search params
  const searchParams = router.query;

  // Handle filtering based on mode
  useEffect(() => {
    const filterProducts = async () => {
      const searchParamsStringified = Object.fromEntries(
        Object.entries(searchParams).map(([key, value]) => [key, String(value)])
      );
  
      if (mode === 'client') {
        // Client-side filtering
        const filtered = filterClientProducts(initialProducts, searchParamsStringified);
        setProducts(filtered);
      } else if (mode === 'server' && onServerFilter) {
        // Server-side filtering
        setIsLoading(true);
        try {
          const serverProducts = await onServerFilter(searchParamsStringified);
          setProducts(serverProducts);
        } catch (error) {
          console.error('Filter error:', error);
        }
        setIsLoading(false);
      }
    };
  
    filterProducts();
  }, [searchParams, initialProducts, mode, onServerFilter]);

  // Update URL params without page reload
  const updateSearchParams = (newParams: Record<string, string>) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...newParams }
    }, undefined, { shallow: true });
  };

  // Filter controls handler
  const handleFilterChange = (filterType: string, value: string) => {
    updateSearchParams({ [filterType]: value });
  };

  // Search handler
  const handleSearch = (query: string) => {
    updateSearchParams({ search: query });
  };

  // Sorting handler
  const handleSort = (sortBy: string) => {
    updateSearchParams({ sort: sortBy });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Filter Controls */}
      <div className="mb-8 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchParams.search || ''}
        />
        
        <select 
          className="p-2 border rounded"
          onChange={(e) => handleSort(e.target.value)}
          value={searchParams.sort || ''}
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest Arrivals</option>
        </select>

        <select
          className="p-2 border rounded"
          onChange={(e) => handleFilterChange('availability', e.target.value)}
          value={searchParams.availability || ''}
        >
          <option value="">All Availability</option>
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out of Stock</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading && <div className="text-center py-8">Loading products...</div>}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found matching your criteria
        </div>
      )}
    </div>
  );
};

// Client-side filtering logic
const filterClientProducts = (products: Product[], params: Record<string, any>): Product[] => {
  return products.filter(product => {
    // Search filter
    if (params.search) {
        const searchQuery = params.search.toLowerCase();
        if (!product.title.toLowerCase().includes(searchQuery) &&
            !product.description.root.children.some(child => 
              typeof child.text === 'string' && child.text.toLowerCase().includes(searchQuery)
            )) {
          return false;
        }
      }

    // Availability filter
    if (params.availability && product.availability !== params.availability) {
      return false;
    }

    // Price filter (you can add more complex logic here)
    if (params.minPrice && product.price < Number(params.minPrice)) {
      return false;
    }
    if (params.maxPrice && product.price > Number(params.maxPrice)) {
      return false;
    }

    // Add more filters as needed...

    return true;
  }).sort((a, b) => {
    // Sorting logic
    switch (params.sort) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });
};

export default ProductList;


//This is an example of usage:

// import ProductList from '../components/ProductList';

// const ProductsPage = ({ initialProducts }) => {
//   // For server-side mode
//   const handleServerFilter = async (params) => {
//     const res = await fetch(`/api/products?${new URLSearchParams(params)}`);
//     return res.json();
//   };

//   return (
//     <ProductList
//       initialProducts={initialProducts}
//       mode="server" // or "client"
//       onServerFilter={handleServerFilter}
//     />
//   );
// };

// // For SSR/SSG
// export async function getServerSideProps(context) {
//   // Fetch initial products based on query params
//   const res = await fetchInitialProducts(context.query);
//   return {
//     props: {
//       initialProducts: res.products
//     }
//   };
// }

// export default ProductsPage;