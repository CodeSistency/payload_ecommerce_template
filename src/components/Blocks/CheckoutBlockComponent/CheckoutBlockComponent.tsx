import React from 'react';
import InfoBlockComponent from '../InfoBlockComponent/InfoBlockComponent';

export interface CheckoutBlockData {
  variant: 'simple' | 'detailed' | 'stepped';
  impactLevel: 'low' | 'normal' | 'high';
  items?: { name: string; price: number; quantity: number }[]; // Example data
  subBlocks?: any[];
}

// Variant: Simple
const Simple = ({ block }: { block: CheckoutBlockData }) => (
  <div className={`checkout simple impact-${block.impactLevel}`}>
    <h2>Checkout</h2>
    <ul>
      {block.items?.map((item, index) => (
        <li key={index}>{item.name} - ${item.price} x {item.quantity}</li>
      ))}
    </ul>
    {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
  </div>
);

// Variant: Detailed
const Detailed = ({ block }: { block: CheckoutBlockData }) => (
  <div className={`checkout detailed impact-${block.impactLevel}`}>
    <h2>Checkout</h2>
    <table className="w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {block.items?.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>${item.price}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
  </div>
);

// Variant: Stepped
const Stepped = ({ block }: { block: CheckoutBlockData }) => (
  <div className={`checkout stepped impact-${block.impactLevel}`}>
    <h2>Checkout Steps</h2>
    <div>Step 1: Review Items</div>
    <ul>
      {block.items?.map((item, index) => (
        <li key={index}>{item.name} - ${item.price} x {item.quantity}</li>
      ))}
    </ul>
    {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
  </div>
);

// Main Component
const CheckoutBlockComponent = ({ block }: { block: CheckoutBlockData }) => {
  switch (block.variant) {
    case 'simple':
      return <Simple block={block} />;
    case 'detailed':
      return <Detailed block={block} />;
    case 'stepped':
      return <Stepped block={block} />;
    default:
      return <Simple block={block} />;
  }
};

export default CheckoutBlockComponent;