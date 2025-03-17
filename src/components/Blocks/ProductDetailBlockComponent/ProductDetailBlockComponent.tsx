"use client"

import { useState } from "react"
import { ShoppingCart, Heart, Share2, Star, ChevronDown, ChevronUp, Check } from "lucide-react"

export interface DetailedProductBlockData {
  variant: "standard" | "gallery" | "specs"
  impactLevel: "low" | "normal" | "high"
  product: {
    id: string
    title: string
    price: number
    originalPrice?: number
    description?: string
    images?: { url: string }[]
    rating?: number
    reviewCount?: number
    inStock?: boolean
    colors?: string[]
    sizes?: string[]
    specs?: { name: string; value: string }[]
    features?: string[]
  }
  subBlocks?: any[]
}

// Helper function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

// Standard variant component
const Standard = ({ block }: { block: DetailedProductBlockData }) => {
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  const product = block.product || {}
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Impact level styling
  const containerClasses = {
    low: "grid grid-cols-1 md:grid-cols-2 gap-4",
    normal: "grid grid-cols-1 md:grid-cols-2 gap-6",
    high: "grid grid-cols-1 md:grid-cols-2 gap-8",
  }

  const imageClasses = {
    low: "w-full rounded",
    normal: "w-full rounded-md shadow-sm",
    high: "w-full rounded-lg shadow",
  }

  const titleClasses = {
    low: "text-xl font-medium",
    normal: "text-2xl font-bold",
    high: "text-3xl font-extrabold",
  }

  const priceClasses = {
    low: "text-lg font-medium text-gray-900 mt-1",
    normal: "text-xl font-semibold text-gray-900 mt-2",
    high: "text-2xl font-bold text-gray-900 mt-3",
  }

  const originalPriceClasses = {
    low: "text-sm line-through text-gray-500 ml-2",
    normal: "text-base line-through text-gray-500 ml-2",
    high: "text-lg line-through text-gray-500 ml-2",
  }

  const discountBadgeClasses = {
    low: "bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded ml-2",
    normal: "bg-green-100 text-green-800 text-sm px-2 py-0.5 rounded-md ml-2",
    high: "bg-green-100 text-green-800 text-base px-2.5 py-1 rounded-md ml-2",
  }

  const descriptionClasses = {
    low: "text-sm text-gray-600 mt-2",
    normal: "text-base text-gray-700 mt-3",
    high: "text-lg text-gray-800 mt-4",
  }

  const sectionTitleClasses = {
    low: "text-sm font-medium mt-3 mb-1",
    normal: "text-base font-medium mt-4 mb-2",
    high: "text-lg font-semibold mt-5 mb-3",
  }

  const colorOptionClasses = {
    low: "w-6 h-6 rounded-full cursor-pointer border-2",
    normal: "w-8 h-8 rounded-full cursor-pointer border-2",
    high: "w-10 h-10 rounded-full cursor-pointer border-2",
  }

  const sizeOptionClasses = {
    low: "px-2 py-1 border rounded text-sm cursor-pointer",
    normal: "px-3 py-1.5 border rounded-md text-base cursor-pointer",
    high: "px-4 py-2 border rounded-lg text-lg cursor-pointer",
  }

  const quantityContainerClasses = {
    low: "flex items-center mt-3",
    normal: "flex items-center mt-4",
    high: "flex items-center mt-5",
  }

  const quantityButtonClasses = {
    low: "w-6 h-6 flex items-center justify-center border rounded",
    normal: "w-8 h-8 flex items-center justify-center border rounded-md",
    high: "w-10 h-10 flex items-center justify-center border rounded-lg",
  }

  const quantityInputClasses = {
    low: "w-10 h-6 text-center border-t border-b",
    normal: "w-12 h-8 text-center border-t border-b",
    high: "w-14 h-10 text-center border-t border-b text-lg",
  }

  const addToCartClasses = {
    low: "mt-4 w-full bg-primary text-primary-foreground py-1 px-3 rounded flex items-center justify-center gap-1",
    normal:
      "mt-5 w-full bg-primary text-primary-foreground py-2 px-4 rounded-md flex items-center justify-center gap-2 font-medium",
    high: "mt-6 w-full bg-primary text-primary-foreground py-3 px-5 rounded-lg flex items-center justify-center gap-3 font-semibold text-lg hover:bg-primary/90 transition-colors",
  }

  const wishlistButtonClasses = {
    low: "mt-2 w-full border border-gray-300 py-1 px-3 rounded flex items-center justify-center gap-1",
    normal: "mt-3 w-full border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center gap-2",
    high: "mt-4 w-full border border-gray-300 py-3 px-5 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors",
  }

  // Render star rating
  const renderRating = (rating: number, reviewCount?: number) => {
    return (
      <div className="flex items-center mt-1">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={block.impactLevel === "high" ? 20 : 16}
              className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
        {reviewCount !== undefined && <span className="ml-2 text-gray-600 text-sm">({reviewCount} reviews)</span>}
      </div>
    )
  }

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className={containerClasses[block.impactLevel]}>
      {/* Product Image */}
      <div>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url || "/placeholder.svg?height=600&width=600"}
            alt={product.title}
            className={imageClasses[block.impactLevel]}
          />
        ) : (
          <div
            className={`${imageClasses[block.impactLevel]} bg-gray-200 aspect-square flex items-center justify-center`}
          >
            <ShoppingCart size={48} className="text-gray-400" />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div>
        <h1 className={titleClasses[block.impactLevel]}>{product.title}</h1>

        {product.rating !== undefined && renderRating(product.rating, product.reviewCount)}

        <div className={priceClasses[block.impactLevel]}>
          {formatPrice(product.price)}

          {product.originalPrice && (
            <>
              <span className={originalPriceClasses[block.impactLevel]}>{formatPrice(product.originalPrice)}</span>
              <span className={discountBadgeClasses[block.impactLevel]}>-{discount}%</span>
            </>
          )}
        </div>

        {product.inStock !== undefined && (
          <div className="mt-2 flex items-center">
            <span
              className={`inline-block w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"} mr-2`}
            ></span>
            <span className={product.inStock ? "text-green-700" : "text-red-700"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        )}

        {product.description && <p className={descriptionClasses[block.impactLevel]}>{product.description}</p>}

        {/* Color Options */}
        {product.colors && product.colors.length > 0 && (
          <div>
            <h3 className={sectionTitleClasses[block.impactLevel]}>Color</h3>
            <div className="flex gap-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`${colorOptionClasses[block.impactLevel]} ${selectedColor === color ? "border-primary" : "border-transparent"}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size Options */}
        {product.sizes && product.sizes.length > 0 && (
          <div>
            <h3 className={sectionTitleClasses[block.impactLevel]}>Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`${sizeOptionClasses[block.impactLevel]} ${selectedSize === size ? "bg-primary text-primary-foreground" : "bg-white"}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className={quantityContainerClasses[block.impactLevel]}>
          <span className="mr-3">Quantity:</span>
          <button
            className={quantityButtonClasses[block.impactLevel]}
            onClick={decreaseQuantity}
            aria-label="Decrease quantity"
          >
            <ChevronDown size={block.impactLevel === "high" ? 20 : 16} />
          </button>
          <input type="text" value={quantity} readOnly className={quantityInputClasses[block.impactLevel]} />
          <button
            className={quantityButtonClasses[block.impactLevel]}
            onClick={increaseQuantity}
            aria-label="Increase quantity"
          >
            <ChevronUp size={block.impactLevel === "high" ? 20 : 16} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button className={addToCartClasses[block.impactLevel]}>
          <ShoppingCart size={block.impactLevel === "high" ? 20 : 16} />
          <span>Add to Cart</span>
        </button>

        {/* Wishlist Button */}
        <button className={wishlistButtonClasses[block.impactLevel]}>
          <Heart size={block.impactLevel === "high" ? 20 : 16} />
          <span>Add to Wishlist</span>
        </button>

        {/* Features (for high impact only) */}
        {block.impactLevel === "high" && product.features && product.features.length > 0 && (
          <div className="mt-6">
            <h3 className={sectionTitleClasses[block.impactLevel]}>Key Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

// Gallery variant component
const Gallery = ({ block }: { block: DetailedProductBlockData }) => {
  const [mainImage, setMainImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  const product = block.product || {}
  const images = product.images || []
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Impact level styling
  const containerClasses = {
    low: "grid grid-cols-1 md:grid-cols-2 gap-4",
    normal: "grid grid-cols-1 md:grid-cols-2 gap-6",
    high: "grid grid-cols-1 md:grid-cols-2 gap-8",
  }

  const mainImageClasses = {
    low: "w-full rounded mb-2",
    normal: "w-full rounded-md shadow-sm mb-3",
    high: "w-full rounded-lg shadow mb-4",
  }

  const thumbnailContainerClasses = {
    low: "grid grid-cols-5 gap-1",
    normal: "grid grid-cols-5 gap-2",
    high: "grid grid-cols-5 gap-3",
  }

  const thumbnailClasses = {
    low: "w-full aspect-square object-cover rounded cursor-pointer border-2",
    normal: "w-full aspect-square object-cover rounded-md cursor-pointer border-2",
    high: "w-full aspect-square object-cover rounded-lg cursor-pointer border-2",
  }

  const titleClasses = {
    low: "text-xl font-medium",
    normal: "text-2xl font-bold",
    high: "text-3xl font-extrabold",
  }

  const priceClasses = {
    low: "text-lg font-medium text-gray-900 mt-1",
    normal: "text-xl font-semibold text-gray-900 mt-2",
    high: "text-2xl font-bold text-gray-900 mt-3",
  }

  const originalPriceClasses = {
    low: "text-sm line-through text-gray-500 ml-2",
    normal: "text-base line-through text-gray-500 ml-2",
    high: "text-lg line-through text-gray-500 ml-2",
  }

  const discountBadgeClasses = {
    low: "bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded ml-2",
    normal: "bg-green-100 text-green-800 text-sm px-2 py-0.5 rounded-md ml-2",
    high: "bg-green-100 text-green-800 text-base px-2.5 py-1 rounded-md ml-2",
  }

  const descriptionClasses = {
    low: "text-sm text-gray-600 mt-2",
    normal: "text-base text-gray-700 mt-3",
    high: "text-lg text-gray-800 mt-4",
  }

  const sectionTitleClasses = {
    low: "text-sm font-medium mt-3 mb-1",
    normal: "text-base font-medium mt-4 mb-2",
    high: "text-lg font-semibold mt-5 mb-3",
  }

  const colorOptionClasses = {
    low: "w-6 h-6 rounded-full cursor-pointer border-2",
    normal: "w-8 h-8 rounded-full cursor-pointer border-2",
    high: "w-10 h-10 rounded-full cursor-pointer border-2",
  }

  const sizeOptionClasses = {
    low: "px-2 py-1 border rounded text-sm cursor-pointer",
    normal: "px-3 py-1.5 border rounded-md text-base cursor-pointer",
    high: "px-4 py-2 border rounded-lg text-lg cursor-pointer",
  }

  const quantityContainerClasses = {
    low: "flex items-center mt-3",
    normal: "flex items-center mt-4",
    high: "flex items-center mt-5",
  }

  const quantityButtonClasses = {
    low: "w-6 h-6 flex items-center justify-center border rounded",
    normal: "w-8 h-8 flex items-center justify-center border rounded-md",
    high: "w-10 h-10 flex items-center justify-center border rounded-lg",
  }

  const quantityInputClasses = {
    low: "w-10 h-6 text-center border-t border-b",
    normal: "w-12 h-8 text-center border-t border-b",
    high: "w-14 h-10 text-center border-t border-b text-lg",
  }

  const addToCartClasses = {
    low: "mt-4 w-full bg-primary text-primary-foreground py-1 px-3 rounded flex items-center justify-center gap-1",
    normal:
      "mt-5 w-full bg-primary text-primary-foreground py-2 px-4 rounded-md flex items-center justify-center gap-2 font-medium",
    high: "mt-6 w-full bg-primary text-primary-foreground py-3 px-5 rounded-lg flex items-center justify-center gap-3 font-semibold text-lg hover:bg-primary/90 transition-colors",
  }

  const actionButtonsClasses = {
    low: "flex gap-2 mt-2",
    normal: "flex gap-3 mt-3",
    high: "flex gap-4 mt-4",
  }

  const secondaryButtonClasses = {
    low: "flex-1 border border-gray-300 py-1 px-2 rounded flex items-center justify-center gap-1",
    normal: "flex-1 border border-gray-300 py-2 px-3 rounded-md flex items-center justify-center gap-2",
    high: "flex-1 border border-gray-300 py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors",
  }

  // Render star rating
  const renderRating = (rating: number, reviewCount?: number) => {
    return (
      <div className="flex items-center mt-1">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={block.impactLevel === "high" ? 20 : 16}
              className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
        {reviewCount !== undefined && <span className="ml-2 text-gray-600 text-sm">({reviewCount} reviews)</span>}
      </div>
    )
  }

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className={containerClasses[block.impactLevel]}>
      {/* Product Gallery */}
      <div>
        {/* Main Image */}
        {images.length > 0 ? (
          <img
            src={images[mainImage].url || "/placeholder.svg?height=600&width=600"}
            alt={product.title}
            className={mainImageClasses[block.impactLevel]}
          />
        ) : (
          <div
            className={`${mainImageClasses[block.impactLevel]} bg-gray-200 aspect-square flex items-center justify-center`}
          >
            <ShoppingCart size={48} className="text-gray-400" />
          </div>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className={thumbnailContainerClasses[block.impactLevel]}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`${thumbnailClasses[block.impactLevel]} ${mainImage === index ? "border-primary" : "border-transparent"}`}
                onClick={() => setMainImage(index)}
              >
                <img
                  src={image.url || "/placeholder.svg?height=100&width=100"}
                  alt={`${product.title} - view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div>
        <h1 className={titleClasses[block.impactLevel]}>{product.title}</h1>

        {product.rating !== undefined && renderRating(product.rating, product.reviewCount)}

        <div className={priceClasses[block.impactLevel]}>
          {formatPrice(product.price)}

          {product.originalPrice && (
            <>
              <span className={originalPriceClasses[block.impactLevel]}>{formatPrice(product.originalPrice)}</span>
              <span className={discountBadgeClasses[block.impactLevel]}>-{discount}%</span>
            </>
          )}
        </div>

        {product.inStock !== undefined && (
          <div className="mt-2 flex items-center">
            <span
              className={`inline-block w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"} mr-2`}
            ></span>
            <span className={product.inStock ? "text-green-700" : "text-red-700"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        )}

        {product.description && <p className={descriptionClasses[block.impactLevel]}>{product.description}</p>}

        {/* Color Options */}
        {product.colors && product.colors.length > 0 && (
          <div>
            <h3 className={sectionTitleClasses[block.impactLevel]}>Color</h3>
            <div className="flex gap-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`${colorOptionClasses[block.impactLevel]} ${selectedColor === color ? "border-primary" : "border-transparent"}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size Options */}
        {product.sizes && product.sizes.length > 0 && (
          <div>
            <h3 className={sectionTitleClasses[block.impactLevel]}>Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`${sizeOptionClasses[block.impactLevel]} ${selectedSize === size ? "bg-primary text-primary-foreground" : "bg-white"}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className={quantityContainerClasses[block.impactLevel]}>
          <span className="mr-3">Quantity:</span>
          <button
            className={quantityButtonClasses[block.impactLevel]}
            onClick={decreaseQuantity}
            aria-label="Decrease quantity"
          >
            <ChevronDown size={block.impactLevel === "high" ? 20 : 16} />
          </button>
          <input type="text" value={quantity} readOnly className={quantityInputClasses[block.impactLevel]} />
          <button
            className={quantityButtonClasses[block.impactLevel]}
            onClick={increaseQuantity}
            aria-label="Increase quantity"
          >
            <ChevronUp size={block.impactLevel === "high" ? 20 : 16} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button className={addToCartClasses[block.impactLevel]}>
          <ShoppingCart size={block.impactLevel === "high" ? 20 : 16} />
          <span>Add to Cart</span>
        </button>

        {/* Action Buttons */}
        <div className={actionButtonsClasses[block.impactLevel]}>
          <button className={secondaryButtonClasses[block.impactLevel]}>
            <Heart size={block.impactLevel === "high" ? 20 : 16} />
            <span>Wishlist</span>
          </button>
          <button className={secondaryButtonClasses[block.impactLevel]}>
            <Share2 size={block.impactLevel === "high" ? 20 : 16} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Specs variant component
const Specs = ({ block }: { block: DetailedProductBlockData }) => {
  const [activeTab, setActiveTab] = useState("description")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  const product = block.product || {}
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Impact level styling
  const containerClasses = {
    low: "space-y-4",
    normal: "space-y-6",
    high: "space-y-8",
  }

  const productHeaderClasses = {
    low: "grid grid-cols-1 md:grid-cols-2 gap-4",
    normal: "grid grid-cols-1 md:grid-cols-2 gap-6",
    high: "grid grid-cols-1 md:grid-cols-2 gap-8",
  }

  const imageClasses = {
    low: "w-full rounded",
    normal: "w-full rounded-md shadow-sm",
    high: "w-full rounded-lg shadow",
  }

  const titleClasses = {
    low: "text-xl font-medium",
    normal: "text-2xl font-bold",
    high: "text-3xl font-extrabold",
  }

  const priceClasses = {
    low: "text-lg font-medium text-gray-900 mt-1",
    normal: "text-xl font-semibold text-gray-900 mt-2",
    high: "text-2xl font-bold text-gray-900 mt-3",
  }

  const originalPriceClasses = {
    low: "text-sm line-through text-gray-500 ml-2",
    normal: "text-base line-through text-gray-500 ml-2",
    high: "text-lg line-through text-gray-500 ml-2",
  }

  const discountBadgeClasses = {
    low: "bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded ml-2",
    normal: "bg-green-100 text-green-800 text-sm px-2 py-0.5 rounded-md ml-2",
    high: "bg-green-100 text-green-800 text-base px-2.5 py-1 rounded-md ml-2",
  }

  const tabsContainerClasses = {
    low: "border-b border-gray-200",
    normal: "border-b border-gray-300",
    high: "border-b border-gray-400",
  }

  const tabButtonClasses = {
    low: "px-3 py-1.5 text-sm font-medium",
    normal: "px-4 py-2 text-base font-medium",
    high: "px-5 py-2.5 text-lg font-semibold",
  }

  const tabContentClasses = {
    low: "py-3",
    normal: "py-4",
    high: "py-5",
  }

  const descriptionClasses = {
    low: "text-sm text-gray-600",
    normal: "text-base text-gray-700",
    high: "text-lg text-gray-800 leading-relaxed",
  }

  const specTableClasses = {
    low: "w-full text-sm",
    normal: "w-full text-base",
    high: "w-full text-lg",
  }

  const specRowClasses = {
    low: "border-b border-gray-100",
    normal: "border-b border-gray-200",
    high: "border-b border-gray-300",
  }

  const specLabelClasses = {
    low: "py-2 pr-4 font-medium text-gray-600 w-1/3",
    normal: "py-3 pr-6 font-medium text-gray-700 w-1/3",
    high: "py-4 pr-8 font-medium text-gray-800 w-1/3",
  }

  const specValueClasses = {
    low: "py-2 text-gray-800",
    normal: "py-3 text-gray-900",
    high: "py-4 text-gray-900",
  }

  const colorOptionClasses = {
    low: "w-6 h-6 rounded-full cursor-pointer border-2",
    normal: "w-8 h-8 rounded-full cursor-pointer border-2",
    high: "w-10 h-10 rounded-full cursor-pointer border-2",
  }

  const sizeOptionClasses = {
    low: "px-2 py-1 border rounded text-sm cursor-pointer",
    normal: "px-3 py-1.5 border rounded-md text-base cursor-pointer",
    high: "px-4 py-2 border rounded-lg text-lg cursor-pointer",
  }

  const quantityContainerClasses = {
    low: "flex items-center",
    normal: "flex items-center",
    high: "flex items-center",
  }

  const quantityButtonClasses = {
    low: "w-6 h-6 flex items-center justify-center border rounded",
    normal: "w-8 h-8 flex items-center justify-center border rounded-md",
    high: "w-10 h-10 flex items-center justify-center border rounded-lg",
  }

  const quantityInputClasses = {
    low: "w-10 h-6 text-center border-t border-b",
    normal: "w-12 h-8 text-center border-t border-b",
    high: "w-14 h-10 text-center border-t border-b text-lg",
  }

  const addToCartClasses = {
    low: "w-full bg-primary text-primary-foreground py-1 px-3 rounded flex items-center justify-center gap-1",
    normal:
      "w-full bg-primary text-primary-foreground py-2 px-4 rounded-md flex items-center justify-center gap-2 font-medium",
    high: "w-full bg-primary text-primary-foreground py-3 px-5 rounded-lg flex items-center justify-center gap-3 font-semibold text-lg hover:bg-primary/90 transition-colors",
  }

  const featureClasses = {
    low: "flex items-start gap-2 mb-2",
    normal: "flex items-start gap-3 mb-3",
    high: "flex items-start gap-4 mb-4",
  }

  // Render star rating
  const renderRating = (rating: number, reviewCount?: number) => {
    return (
      <div className="flex items-center mt-1">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={block.impactLevel === "high" ? 20 : 16}
              className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
        {reviewCount !== undefined && <span className="ml-2 text-gray-600 text-sm">({reviewCount} reviews)</span>}
      </div>
    )
  }

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className={containerClasses[block.impactLevel]}>
      {/* Product Header */}
      <div className={productHeaderClasses[block.impactLevel]}>
        {/* Product Image */}
        <div>
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].url || "/placeholder.svg?height=600&width=600"}
              alt={product.title}
              className={imageClasses[block.impactLevel]}
            />
          ) : (
            <div
              className={`${imageClasses[block.impactLevel]} bg-gray-200 aspect-square flex items-center justify-center`}
            >
              <ShoppingCart size={48} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Product Summary */}
        <div>
          <h1 className={titleClasses[block.impactLevel]}>{product.title}</h1>

          {product.rating !== undefined && renderRating(product.rating, product.reviewCount)}

          <div className={priceClasses[block.impactLevel]}>
            {formatPrice(product.price)}

            {product.originalPrice && (
              <>
                <span className={originalPriceClasses[block.impactLevel]}>{formatPrice(product.originalPrice)}</span>
                <span className={discountBadgeClasses[block.impactLevel]}>-{discount}%</span>
              </>
            )}
          </div>

          {product.inStock !== undefined && (
            <div className="mt-2 flex items-center">
              <span
                className={`inline-block w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"} mr-2`}
              ></span>
              <span className={product.inStock ? "text-green-700" : "text-red-700"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          )}

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-1">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`${colorOptionClasses[block.impactLevel]} ${selectedColor === color ? "border-primary" : "border-transparent"}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Options */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-1">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`${sizeOptionClasses[block.impactLevel]} ${selectedSize === size ? "bg-primary text-primary-foreground" : "bg-white"}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Purchase Controls */}
          <div className="mt-6 space-y-4">
            {/* Quantity Selector */}
            <div className={quantityContainerClasses[block.impactLevel]}>
              <span className="mr-3">Quantity:</span>
              <button
                className={quantityButtonClasses[block.impactLevel]}
                onClick={decreaseQuantity}
                aria-label="Decrease quantity"
              >
                <ChevronDown size={block.impactLevel === "high" ? 20 : 16} />
              </button>
              <input type="text" value={quantity} readOnly className={quantityInputClasses[block.impactLevel]} />
              <button
                className={quantityButtonClasses[block.impactLevel]}
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                <ChevronUp size={block.impactLevel === "high" ? 20 : 16} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button className={addToCartClasses[block.impactLevel]}>
              <ShoppingCart size={block.impactLevel === "high" ? 20 : 16} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className={tabsContainerClasses[block.impactLevel]}>
          <div className="flex">
            <button
              className={`${tabButtonClasses[block.impactLevel]} ${activeTab === "description" ? "border-b-2 border-primary text-primary" : "text-gray-600"}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`${tabButtonClasses[block.impactLevel]} ${activeTab === "specifications" ? "border-b-2 border-primary text-primary" : "text-gray-600"}`}
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </button>
            {product.features && product.features.length > 0 && (
              <button
                className={`${tabButtonClasses[block.impactLevel]} ${activeTab === "features" ? "border-b-2 border-primary text-primary" : "text-gray-600"}`}
                onClick={() => setActiveTab("features")}
              >
                Features
              </button>
            )}
          </div>
        </div>

        <div className={tabContentClasses[block.impactLevel]}>
          {/* Description Tab */}
          {activeTab === "description" && (
            <div className={descriptionClasses[block.impactLevel]}>
              {product.description ? (
                <p>{product.description}</p>
              ) : (
                <p className="text-gray-500">No description available.</p>
              )}
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === "specifications" && (
            <div>
              {product.specs && product.specs.length > 0 ? (
                <table className={specTableClasses[block.impactLevel]}>
                  <tbody>
                    {product.specs.map((spec, index) => (
                      <tr key={index} className={specRowClasses[block.impactLevel]}>
                        <td className={specLabelClasses[block.impactLevel]}>{spec.name}</td>
                        <td className={specValueClasses[block.impactLevel]}>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No specifications available.</p>
              )}
            </div>
          )}

          {/* Features Tab */}
          {activeTab === "features" && (
            <div>
              {product.features && product.features.length > 0 ? (
                <div>
                  {product.features.map((feature, index) => (
                    <div key={index} className={featureClasses[block.impactLevel]}>
                      <Check
                        className="text-green-500 mt-0.5 flex-shrink-0"
                        size={block.impactLevel === "high" ? 20 : 16}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No features available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Variant mapping
const variants = {
  standard: Standard,
  gallery: Gallery,
  specs: Specs,
}

// Main component
const DetailedProductBlockComponent = ({ block }: { block: DetailedProductBlockData }) => {
  const VariantComponent = variants[block.variant]

  return (
    <section className="detailed-product-block py-4">
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

export default DetailedProductBlockComponent

