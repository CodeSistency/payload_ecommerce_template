// import React from 'react';
// import InfoBlockComponent from '../InfoBlockComponent/InfoBlockComponent';

// export interface CheckoutBlockData {
//   variant: 'simple' | 'detailed' | 'stepped';
//   impactLevel: 'low' | 'normal' | 'high';
//   items?: { name: string; price: number; quantity: number }[]; // Example data
//   subBlocks?: any[];
// }

// // Variant: Simple
// const Simple = ({ block }: { block: CheckoutBlockData }) => (
//   <div className={`checkout simple impact-${block.impactLevel}`}>
//     <h2>Checkout</h2>
//     <ul>
//       {block.items?.map((item, index) => (
//         <li key={index}>{item.name} - ${item.price} x {item.quantity}</li>
//       ))}
//     </ul>
//     {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
//   </div>
// );

// // Variant: Detailed
// const Detailed = ({ block }: { block: CheckoutBlockData }) => (
//   <div className={`checkout detailed impact-${block.impactLevel}`}>
//     <h2>Checkout</h2>
//     <table className="w-full">
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Price</th>
//           <th>Quantity</th>
//         </tr>
//       </thead>
//       <tbody>
//         {block.items?.map((item, index) => (
//           <tr key={index}>
//             <td>{item.name}</td>
//             <td>${item.price}</td>
//             <td>{item.quantity}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
//   </div>
// );

// // Variant: Stepped
// const Stepped = ({ block }: { block: CheckoutBlockData }) => (
//   <div className={`checkout stepped impact-${block.impactLevel}`}>
//     <h2>Checkout Steps</h2>
//     <div>Step 1: Review Items</div>
//     <ul>
//       {block.items?.map((item, index) => (
//         <li key={index}>{item.name} - ${item.price} x {item.quantity}</li>
//       ))}
//     </ul>
//     {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
//   </div>
// );

// // Main Component
// const CheckoutBlockComponent = ({ block }: { block: CheckoutBlockData }) => {
//   switch (block.variant) {
//     case 'simple':
//       return <Simple block={block} />;
//     case 'detailed':
//       return <Detailed block={block} />;
//     case 'stepped':
//       return <Stepped block={block} />;
//     default:
//       return <Simple block={block} />;
//   }
// };

// export default CheckoutBlockComponent;

"use client"

import React, { useState } from "react"
import { CreditCard, ShoppingCart, Truck, Check } from "lucide-react"

export interface CheckoutBlockData {
  variant: "simple" | "detailed" | "stepped"
  impactLevel: "low" | "normal" | "high"
  items?: { name: string; price: number; quantity: number }[]
  subBlocks?: any[]
}

// Helper function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

// Simple variant component
const Simple = ({ block }: { block: CheckoutBlockData }) => {
  const items = block.items || []

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // Impact level styling
  const containerClasses = {
    low: "border border-gray-100 rounded p-3",
    normal: "border border-gray-200 rounded-md p-4 shadow-sm",
    high: "border border-gray-300 rounded-lg p-5 shadow",
  }

  const sectionTitleClasses = {
    low: "text-sm font-medium mb-2",
    normal: "text-base font-medium mb-3",
    high: "text-lg font-semibold mb-4",
  }

  const inputClasses = {
    low: "w-full border border-gray-200 rounded px-2 py-1 text-sm",
    normal: "w-full border border-gray-300 rounded-md px-3 py-2",
    high: "w-full border border-gray-400 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary",
  }

  const buttonClasses = {
    low: "w-full bg-primary text-primary-foreground py-1 px-2 rounded text-sm",
    normal: "w-full bg-primary text-primary-foreground py-2 px-3 rounded-md font-medium",
    high: "w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors",
  }

  return (
    <div className={`w-full max-w-2xl mx-auto ${containerClasses[block.impactLevel]}`}>
      <form className="space-y-4">
        {/* Contact Information */}
        <div>
          <h3 className={sectionTitleClasses[block.impactLevel]}>Contact Information</h3>
          <div className="space-y-2">
            <input type="email" placeholder="Email" className={inputClasses[block.impactLevel]} required />
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className={sectionTitleClasses[block.impactLevel]}>Shipping Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input type="text" placeholder="First Name" className={inputClasses[block.impactLevel]} required />
            <input type="text" placeholder="Last Name" className={inputClasses[block.impactLevel]} required />
            <input
              type="text"
              placeholder="Address"
              className={`${inputClasses[block.impactLevel]} md:col-span-2`}
              required
            />
            <input type="text" placeholder="City" className={inputClasses[block.impactLevel]} required />
            <input type="text" placeholder="Postal Code" className={inputClasses[block.impactLevel]} required />
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h3 className={sectionTitleClasses[block.impactLevel]}>Payment Information</h3>
          <div className="space-y-2">
            <input type="text" placeholder="Card Number" className={inputClasses[block.impactLevel]} required />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Expiration (MM/YY)"
                className={inputClasses[block.impactLevel]}
                required
              />
              <input type="text" placeholder="CVC" className={inputClasses[block.impactLevel]} required />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        {items.length > 0 && (
          <div>
            <h3 className={sectionTitleClasses[block.impactLevel]}>Order Summary</h3>
            <div className="space-y-1 mb-2">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.quantity} x {item.name}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className={buttonClasses[block.impactLevel]}>
          Complete Order
        </button>
      </form>
    </div>
  )
}

// Detailed variant component
const Detailed = ({ block }: { block: CheckoutBlockData }) => {
  const items = block.items || []

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // Impact level styling
  const containerClasses = {
    low: "border border-gray-100 rounded p-3",
    normal: "border border-gray-200 rounded-md p-4 shadow-sm",
    high: "border border-gray-300 rounded-lg p-5 shadow",
  }

  const sectionTitleClasses = {
    low: "text-sm font-medium mb-2",
    normal: "text-base font-medium mb-3",
    high: "text-lg font-semibold mb-4",
  }

  const inputClasses = {
    low: "w-full border border-gray-200 rounded px-2 py-1 text-sm",
    normal: "w-full border border-gray-300 rounded-md px-3 py-2",
    high: "w-full border border-gray-400 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary",
  }

  const buttonClasses = {
    low: "w-full bg-primary text-primary-foreground py-1 px-2 rounded text-sm",
    normal: "w-full bg-primary text-primary-foreground py-2 px-3 rounded-md font-medium",
    high: "w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors",
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${containerClasses[block.impactLevel]}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className={sectionTitleClasses[block.impactLevel]}>Contact Information</h3>
              <div className="space-y-2">
                <input type="email" placeholder="Email" className={inputClasses[block.impactLevel]} required />
                <input type="tel" placeholder="Phone Number" className={inputClasses[block.impactLevel]} />
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className={sectionTitleClasses[block.impactLevel]}>Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input type="text" placeholder="First Name" className={inputClasses[block.impactLevel]} required />
                <input type="text" placeholder="Last Name" className={inputClasses[block.impactLevel]} required />
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className={`${inputClasses[block.impactLevel]} md:col-span-2`}
                  required
                />
                <input
                  type="text"
                  placeholder="Address Line 2 (Optional)"
                  className={`${inputClasses[block.impactLevel]} md:col-span-2`}
                />
                <input type="text" placeholder="City" className={inputClasses[block.impactLevel]} required />
                <input type="text" placeholder="State/Province" className={inputClasses[block.impactLevel]} required />
                <input type="text" placeholder="Postal Code" className={inputClasses[block.impactLevel]} required />
                <input type="text" placeholder="Country" className={inputClasses[block.impactLevel]} required />
              </div>
            </div>

            {/* Shipping Method */}
            <div>
              <h3 className={sectionTitleClasses[block.impactLevel]}>Shipping Method</h3>
              <div className="space-y-2">
                <label className="flex items-center p-2 border rounded cursor-pointer">
                  <input type="radio" name="shipping" className="mr-2" defaultChecked />
                  <div>
                    <div className="font-medium">Standard Shipping</div>
                    <div className="text-sm text-gray-500">3-5 business days</div>
                  </div>
                  <div className="ml-auto">{formatPrice(shipping)}</div>
                </label>
                <label className="flex items-center p-2 border rounded cursor-pointer">
                  <input type="radio" name="shipping" className="mr-2" />
                  <div>
                    <div className="font-medium">Express Shipping</div>
                    <div className="text-sm text-gray-500">1-2 business days</div>
                  </div>
                  <div className="ml-auto">{formatPrice(shipping * 2)}</div>
                </label>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className={sectionTitleClasses[block.impactLevel]}>Payment Information</h3>
              <div className="space-y-2">
                <input type="text" placeholder="Cardholder Name" className={inputClasses[block.impactLevel]} required />
                <input type="text" placeholder="Card Number" className={inputClasses[block.impactLevel]} required />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Expiration (MM/YY)"
                    className={inputClasses[block.impactLevel]}
                    required
                  />
                  <input type="text" placeholder="CVC" className={inputClasses[block.impactLevel]} required />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className={sectionTitleClasses[block.impactLevel]}>Additional Information</h3>
              <div className="space-y-2">
                <textarea
                  placeholder="Order notes, special delivery instructions, etc."
                  className={`${inputClasses[block.impactLevel]} h-24`}
                ></textarea>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">This order is a gift (we'll remove the price from the packing slip)</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className={sectionTitleClasses[block.impactLevel]}>Order Summary</h3>

          {/* Items */}
          <div className="space-y-2 mb-4">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-1 border-b">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-2">No items in cart</div>
            )}
          </div>

          {/* Totals */}
          <div className="space-y-1 mb-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t mt-2">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mb-4">
            <div className="flex gap-2">
              <input type="text" placeholder="Promo Code" className={`flex-grow ${inputClasses[block.impactLevel]}`} />
              <button className="bg-gray-200 px-3 py-2 rounded">Apply</button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className={buttonClasses[block.impactLevel]}>
            Complete Order
          </button>

          {/* Security Notice */}
          <div className="mt-4 text-xs text-center text-gray-500 flex items-center justify-center">
            <CreditCard size={14} className="mr-1" />
            <span>Secure payment processing</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stepped variant component
const Stepped = ({ block }: { block: CheckoutBlockData }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const items = block.items || []

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // Impact level styling
  const containerClasses = {
    low: "border border-gray-100 rounded p-3",
    normal: "border border-gray-200 rounded-md p-4 shadow-sm",
    high: "border border-gray-300 rounded-lg p-5 shadow",
  }

  const sectionTitleClasses = {
    low: "text-sm font-medium mb-2",
    normal: "text-base font-medium mb-3",
    high: "text-lg font-semibold mb-4",
  }

  const inputClasses = {
    low: "w-full border border-gray-200 rounded px-2 py-1 text-sm",
    normal: "w-full border border-gray-300 rounded-md px-3 py-2",
    high: "w-full border border-gray-400 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary",
  }

  const buttonClasses = {
    low: "w-full bg-primary text-primary-foreground py-1 px-2 rounded text-sm",
    normal: "w-full bg-primary text-primary-foreground py-2 px-3 rounded-md font-medium",
    high: "w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors",
  }

  const stepClasses = {
    low: "flex items-center space-x-2 mb-4",
    normal: "flex items-center space-x-3 mb-6",
    high: "flex items-center space-x-4 mb-8",
  }

  const stepIconClasses = {
    active: "flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground",
    completed: "flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white",
    inactive: "flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-500",
  }

  const stepLabelClasses = {
    active: "text-sm font-medium",
    completed: "text-sm font-medium text-green-500",
    inactive: "text-sm text-gray-500",
  }

  const stepLineClasses = {
    active: "flex-1 h-0.5 bg-primary",
    completed: "flex-1 h-0.5 bg-green-500",
    inactive: "flex-1 h-0.5 bg-gray-200",
  }

  // Render step indicator
  const renderStepIndicator = () => {
    const steps = [
      { id: 1, label: "Cart" },
      { id: 2, label: "Shipping" },
      { id: 3, label: "Payment" },
      { id: 4, label: "Confirmation" },
    ]

    return (
      <div className={stepClasses[block.impactLevel]}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step icon */}
            <div
              className={
                currentStep > step.id
                  ? stepIconClasses.completed
                  : currentStep === step.id
                    ? stepIconClasses.active
                    : stepIconClasses.inactive
              }
            >
              {currentStep > step.id ? <Check size={14} /> : <span>{step.id}</span>}
            </div>

            {/* Step label */}
            <span
              className={
                currentStep > step.id
                  ? stepLabelClasses.completed
                  : currentStep === step.id
                    ? stepLabelClasses.active
                    : stepLabelClasses.inactive
              }
            >
              {step.label}
            </span>

            {/* Connector line (except after last step) */}
            {index < steps.length - 1 && (
              <div
                className={
                  currentStep > step.id + 1
                    ? stepLineClasses.completed
                    : currentStep > step.id
                      ? stepLineClasses.active
                      : stepLineClasses.inactive
                }
              />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Cart Review
        return (
          <div className="space-y-4">
            <h3 className={sectionTitleClasses[block.impactLevel]}>Review Your Cart</h3>

            {items.length > 0 ? (
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center border-b pb-3">
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mr-3">
                      <ShoppingCart size={24} className="text-gray-400" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))}

                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">Your cart is empty</div>
            )}

            <div className="flex justify-between pt-4">
              <button className="px-4 py-2 border border-gray-300 rounded" onClick={() => window.history.back()}>
                Back to Shopping
              </button>
              <button
                className={buttonClasses[block.impactLevel].replace("w-full", "")}
                onClick={() => setCurrentStep(2)}
                disabled={items.length === 0}
              >
                Continue to Shipping
              </button>
            </div>
          </div>
        )

      case 2: // Shipping
        return (
          <div className="space-y-4">
            <h3 className={sectionTitleClasses[block.impactLevel]}>Shipping Information</h3>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="First Name" className={inputClasses[block.impactLevel]} required />
                <input type="text" placeholder="Last Name" className={inputClasses[block.impactLevel]} required />
                <input
                  type="email"
                  placeholder="Email"
                  className={`${inputClasses[block.impactLevel]} md:col-span-2`}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className={`${inputClasses[block.impactLevel]} md:col-span-2`}
                  required
                />
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className={`${inputClasses[block.impactLevel]} md:col-span-2`}
                  required
                />
                <input
                  type="text"
                  placeholder="Address Line 2 (Optional)"
                  className={`${inputClasses[block.impactLevel]} md:col-span-2`}
                />
                <input type="text" placeholder="City" className={inputClasses[block.impactLevel]} required />
                <input type="text" placeholder="State/Province" className={inputClasses[block.impactLevel]} required />
                <input type="text" placeholder="Postal Code" className={inputClasses[block.impactLevel]} required />
                <input type="text" placeholder="Country" className={inputClasses[block.impactLevel]} required />
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Shipping Method</h4>
                <div className="space-y-2">
                  <label className="flex items-center p-2 border rounded cursor-pointer">
                    <input type="radio" name="shipping" className="mr-2" defaultChecked />
                    <div className="flex items-center flex-grow">
                      <Truck size={18} className="mr-2 text-gray-500" />
                      <div>
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-gray-500">3-5 business days</div>
                      </div>
                    </div>
                    <div>{formatPrice(shipping)}</div>
                  </label>
                  <label className="flex items-center p-2 border rounded cursor-pointer">
                    <input type="radio" name="shipping" className="mr-2" />
                    <div className="flex items-center flex-grow">
                      <Truck size={18} className="mr-2 text-gray-500" />
                      <div>
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-sm text-gray-500">1-2 business days</div>
                      </div>
                    </div>
                    <div>{formatPrice(shipping * 2)}</div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button className="px-4 py-2 border border-gray-300 rounded" onClick={() => setCurrentStep(1)}>
                Back to Cart
              </button>
              <button
                className={buttonClasses[block.impactLevel].replace("w-full", "")}
                onClick={() => setCurrentStep(3)}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )

      case 3: // Payment
        return (
          <div className="space-y-4">
            <h3 className={sectionTitleClasses[block.impactLevel]}>Payment Information</h3>

            <div className="space-y-3">
              <div className="flex items-center mb-4">
                <CreditCard size={24} className="mr-2 text-gray-500" />
                <span className="font-medium">Credit Card</span>
              </div>

              <div className="space-y-3">
                <input type="text" placeholder="Cardholder Name" className={inputClasses[block.impactLevel]} required />
                <input type="text" placeholder="Card Number" className={inputClasses[block.impactLevel]} required />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Expiration (MM/YY)"
                    className={inputClasses[block.impactLevel]}
                    required
                  />
                  <input type="text" placeholder="CVC" className={inputClasses[block.impactLevel]} required />
                </div>
                <input
                  type="text"
                  placeholder="Billing Zip/Postal Code"
                  className={inputClasses[block.impactLevel]}
                  required
                />
              </div>

              <div className="pt-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button className="px-4 py-2 border border-gray-300 rounded" onClick={() => setCurrentStep(2)}>
                Back to Shipping
              </button>
              <button
                className={buttonClasses[block.impactLevel].replace("w-full", "")}
                onClick={() => setCurrentStep(4)}
              >
                Place Order
              </button>
            </div>
          </div>
        )

      case 4: // Confirmation
        return (
          <div className="text-center py-8 space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Order Confirmed!</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Thank you for your purchase. Your order has been received and is being processed. You will receive a
              confirmation email shortly.
            </p>
            <div className="pt-4">
              <div className="inline-block border border-gray-200 rounded-lg p-4 text-left">
                <div className="text-sm text-gray-500 mb-1">Order Number</div>
                <div className="font-medium">#ORD-{Math.floor(100000 + Math.random() * 900000)}</div>
                <div className="text-sm text-gray-500 mt-3 mb-1">Total Amount</div>
                <div className="font-medium">{formatPrice(total)}</div>
              </div>
            </div>
            <div className="pt-6">
              <button
                className={buttonClasses[block.impactLevel].replace("w-full", "px-8")}
                onClick={() => (window.location.href = "/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`w-full max-w-3xl mx-auto ${containerClasses[block.impactLevel]}`}>
      {renderStepIndicator()}
      {renderStepContent()}
    </div>
  )
}

// Variant mapping
const variants = {
  simple: Simple,
  detailed: Detailed,
  stepped: Stepped,
}

// Main component
const CheckoutBlockComponent = ({ block }: { block: CheckoutBlockData }) => {
  const VariantComponent = variants[block.variant]

  return (
    <section className="checkout-block py-4">
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

export default CheckoutBlockComponent

