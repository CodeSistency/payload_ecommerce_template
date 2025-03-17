// import React from 'react';


// export interface ListProductsBlockData {
//   variant: 'grid' | 'list' | 'carousel';
//   impactLevel: 'low' | 'normal' | 'high';
//   products: { id: string; title: string; price: number; images?: { image: { url: string } }[] }[];
//   subBlocks?: any[];
// }

// // Variant: Grid
// const Grid = ({ block }: { block: ListProductsBlockData }) => (
//   <div className="list-products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//     {block.products.map((product) => (
//       <div key={product.id} className="border p-4 rounded">
//         {product.images?.[0]?.image && (
//           <img src={product.images[0].image.url} alt={product.title} className="w-full h-48 object-cover mb-2" />
//         )}
//         <h3 className="text-lg font-semibold">{product.title}</h3>
//         <p>${product.price}</p>
//       </div>
//     ))}
//   </div>
// );

// // Variant: List
// const List = ({ block }: { block: ListProductsBlockData }) => (
//   <div className="list-products list space-y-4">
//     {block.products.map((product) => (
//       <div key={product.id} className="flex border p-4 rounded">
//         {product.images?.[0]?.image && (
//           <img src={product.images[0].image.url} alt={product.title} className="w-24 h-24 object-cover mr-4" />
//         )}
//         <div>
//           <h3 className="text-lg font-semibold">{product.title}</h3>
//           <p>${product.price}</p>
//         </div>
//       </div>
//     ))}
//   </div>
// );

// // Variant: Carousel
// const Carousel = ({ block }: { block: ListProductsBlockData }) => (
//   <div className="list-products carousel flex space-x-4 overflow-x-auto">
//     {block.products.map((product) => (
//       <div key={product.id} className="flex-shrink-0 w-64 border p-4 rounded">
//         {product.images?.[0]?.image && (
//           <img src={product.images[0].image.url} alt={product.title} className="w-full h-48 object-cover mb-2" />
//         )}
//         <h3 className="text-lg font-semibold">{product.title}</h3>
//         <p>${product.price}</p>
//       </div>
//     ))}
//   </div>
// );

// // Variants Object
// const variants = {
//   grid: Grid,
//   list: List,
//   carousel: Carousel,
// };



// // Main Component
// const ListProductsBlockComponent = ({ block }: { block: ListProductsBlockData }) => {
//     const VariantComponent = variants[block.variant] || variants.grid;
//     return <VariantComponent block={block} />;
// };

// export default ListProductsBlockComponent;

"use client"

import React from "react"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"

export interface ListProductsBlockData {
  variant: "grid" | "list" | "carousel"
  impactLevel: "low" | "normal" | "high"
  products: {
    id: string
    title: string
    price: number
    images?: { image: { url: string } }[]
  }[]
  subBlocks?: any[]
}

// Helper function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

// Helper function to get product image URL
const getProductImageUrl = (product: any) => {
  if (product.images && product.images.length > 0 && product.images[0].image) {
    return product.images[0].image.url
  }
  return `/placeholder.svg?height=300&width=300`
}

// Grid variant component
const Grid = ({ block }: { block: ListProductsBlockData }) => {
  // Impact level styling
  const containerClasses = {
    low: "gap-2",
    normal: "gap-4",
    high: "gap-6",
  }

  const cardClasses = {
    low: "border border-gray-100 rounded p-2",
    normal: "border border-gray-200 rounded-md p-3 shadow-sm hover:shadow transition-shadow duration-200",
    high: "border border-gray-300 rounded-lg p-4 shadow hover:shadow-md transition-all duration-200 hover:-translate-y-1",
  }

  const imageClasses = {
    low: "aspect-square object-cover mb-2 rounded",
    normal: "aspect-square object-cover mb-3 rounded-md",
    high: "aspect-square object-cover mb-4 rounded-lg",
  }

  const titleClasses = {
    low: "text-sm font-medium",
    normal: "text-base font-medium",
    high: "text-lg font-bold",
  }

  const priceClasses = {
    low: "text-sm text-gray-600",
    normal: "text-base text-gray-700 font-medium",
    high: "text-lg text-gray-800 font-bold",
  }

  return (
    <div className="w-full">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${containerClasses[block.impactLevel]}`}
      >
        {block.products.map((product) => (
          <div key={product.id} className={cardClasses[block.impactLevel]}>
            <img
              src={getProductImageUrl(product) || "/placeholder.svg"}
              alt={product.title}
              className={imageClasses[block.impactLevel]}
            />
            <h3 className={titleClasses[block.impactLevel]}>{product.title}</h3>
            <p className={priceClasses[block.impactLevel]}>{formatPrice(product.price)}</p>

            {block.impactLevel === "high" && (
              <button className="mt-2 w-full bg-primary text-primary-foreground py-2 rounded-md flex items-center justify-center gap-2">
                <ShoppingCart size={16} />
                <span>Add to Cart</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// List variant component
const List = ({ block }: { block: ListProductsBlockData }) => {
  // Impact level styling
  const containerClasses = {
    low: "gap-2",
    normal: "gap-4",
    high: "gap-6",
  }

  const itemClasses = {
    low: "border border-gray-100 rounded p-2 flex items-center",
    normal: "border border-gray-200 rounded-md p-3 shadow-sm flex items-center",
    high: "border border-gray-300 rounded-lg p-4 shadow flex items-center hover:shadow-md transition-all duration-200",
  }

  const imageClasses = {
    low: "w-16 h-16 object-cover rounded",
    normal: "w-24 h-24 object-cover rounded-md",
    high: "w-32 h-32 object-cover rounded-lg",
  }

  const titleClasses = {
    low: "text-sm font-medium",
    normal: "text-base font-medium",
    high: "text-lg font-bold",
  }

  const priceClasses = {
    low: "text-sm text-gray-600",
    normal: "text-base text-gray-700 font-medium",
    high: "text-lg text-gray-800 font-bold",
  }

  return (
    <div className="w-full">
      <div className={`flex flex-col ${containerClasses[block.impactLevel]}`}>
        {block.products.map((product) => (
          <div key={product.id} className={itemClasses[block.impactLevel]}>
            <img
              src={getProductImageUrl(product) || "/placeholder.svg"}
              alt={product.title}
              className={imageClasses[block.impactLevel]}
            />
            <div className="ml-4 flex-grow">
              <h3 className={titleClasses[block.impactLevel]}>{product.title}</h3>
              <p className={priceClasses[block.impactLevel]}>{formatPrice(product.price)}</p>
            </div>

            {block.impactLevel === "high" && (
              <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md flex items-center gap-2">
                <ShoppingCart size={16} />
                <span>Add</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Carousel variant component
const Carousel = ({ block }: { block: ListProductsBlockData }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  // Impact level styling
  const containerClasses = {
    low: "p-2",
    normal: "p-3",
    high: "p-4",
  }

  const cardClasses = {
    low: "border border-gray-100 rounded p-2 mx-1",
    normal: "border border-gray-200 rounded-md p-3 shadow-sm mx-2",
    high: "border border-gray-300 rounded-lg p-4 shadow mx-3",
  }

  const imageClasses = {
    low: "aspect-square object-cover mb-2 rounded",
    normal: "aspect-square object-cover mb-3 rounded-md",
    high: "aspect-square object-cover mb-4 rounded-lg",
  }

  const titleClasses = {
    low: "text-sm font-medium",
    normal: "text-base font-medium",
    high: "text-lg font-bold",
  }

  const priceClasses = {
    low: "text-sm text-gray-600",
    normal: "text-base text-gray-700 font-medium",
    high: "text-lg text-gray-800 font-bold",
  }

  const buttonClasses = {
    low: "bg-gray-100 hover:bg-gray-200 p-1 rounded-full",
    normal: "bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-sm",
    high: "bg-gray-300 hover:bg-gray-400 p-3 rounded-full shadow",
  }

  // Number of items to show per slide based on impact level
  const itemsPerSlide = {
    low: 1,
    normal: 2,
    high: 3,
  }[block.impactLevel]

  // Calculate total number of slides
  const totalSlides = Math.ceil(block.products.length / itemsPerSlide)

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  // Get current slide products
  const currentProducts = React.useMemo(() => {
    const startIndex = currentIndex * itemsPerSlide
    return block.products.slice(startIndex, startIndex + itemsPerSlide)
  }, [currentIndex, block.products, itemsPerSlide])

  return (
    <div className={`w-full relative ${containerClasses[block.impactLevel]}`}>
      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className={`${buttonClasses[block.impactLevel]} absolute left-0 top-1/2 -translate-y-1/2 z-10`}
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className={`${buttonClasses[block.impactLevel]} absolute right-0 top-1/2 -translate-y-1/2 z-10`}
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>

      {/* Carousel content */}
      <div className="overflow-hidden px-8">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(0)` }}>
          {currentProducts.map((product) => (
            <div key={product.id} className={`flex-1 min-w-0 ${cardClasses[block.impactLevel]}`}>
              <img
                src={getProductImageUrl(product) || "/placeholder.svg"}
                alt={product.title}
                className={imageClasses[block.impactLevel]}
              />
              <h3 className={titleClasses[block.impactLevel]}>{product.title}</h3>
              <p className={priceClasses[block.impactLevel]}>{formatPrice(product.price)}</p>

              {block.impactLevel === "high" && (
                <button className="mt-2 w-full bg-primary text-primary-foreground py-2 rounded-md flex items-center justify-center gap-2">
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      {block.impactLevel !== "low" && (
        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Variant mapping
const variants = {
  grid: Grid,
  list: List,
  carousel: Carousel,
}

// Main component
const ListProductsBlockComponent = ({ block }: { block: ListProductsBlockData }) => {
  const VariantComponent = variants[block.variant]

  return (
    <section className="list-products-block py-4">
      <VariantComponent block={block} />
      {block.subBlocks && block.subBlocks.length > 0 && (
        <div className="sub-blocks mt-4">
          {block.subBlocks.map((subBlock, index) => (
            <div key={index} className="sub-block">
              {/* Render sub-block content */}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ListProductsBlockComponent

