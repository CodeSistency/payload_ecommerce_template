import React from 'react';
import { ProductDetailsProps } from './ProductDetail.types';



const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="container mx-auto p-4">
      {/* Product Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {product.images?.map((image, index) => (
           <img
           key={index}
           src={typeof image === 'string' ? image : image?.url ?? ''}
           alt={product.title}
           className="w-full h-auto rounded-lg shadow-md"
         />
          ))}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <p className="text-2xl font-semibold text-gray-800">${product.price}</p>
            {product.compareAtPrice && (
              <p className="text-xl text-gray-500 line-through">${product.compareAtPrice}</p>
            )}
          </div>

          {/* Description */}
          <div className="text-gray-700">
            {product.description.root.children.map((child, index) => (
              <p key={index} className="mb-2">
                {child.type === "paragraph" && (child.children as { text: string }[])[0]?.text}
              </p>
            ))}
          </div>

          {/* Variants */}
          {product.hasVariants && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Variants</h3>
              {product.variants?.map((variant, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <p className="text-gray-700">
                    {variant.option1} - {variant.option2} - {variant.option3}
                  </p>
                  <p className="text-gray-800 font-medium">${variant.price}</p>
                  <p className="text-sm text-gray-500">Stock: {variant.stock}</p>
                </div>
              ))}
            </div>
          )}

          {/* Meta Information */}
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Availability:</span> {product.availability}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Product Type:</span> {product.productType}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Weight:</span> {product.weight} kg
            </p>
          </div>

          {/* Custom Fields */}
          <div className="space-y-4">
            {product.customFields?.map((field, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <strong className="font-semibold text-gray-800">{field.key}:</strong>{' '}
                <span className="text-gray-700">{field.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;