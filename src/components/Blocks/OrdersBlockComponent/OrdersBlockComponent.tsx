import React from 'react';
import InfoBlockComponent from '../InfoBlockComponent/InfoBlockComponent';

export interface OrdersBlockData {
  variant: 'list' | 'table' | 'summary';
  impactLevel: 'low' | 'normal' | 'high';
  orders?: { id: string; total: number; status: string }[]; // Example data structure
  subBlocks?: any[];
}

// Variant: List
const List = ({ block }: { block: OrdersBlockData }) => (
  <div className={`orders list impact-${block.impactLevel}`}>
    <ul className="space-y-2">
      {block.orders?.map((order) => (
        <li key={order.id} className="border p-2">
          Order #{order.id} - ${order.total} - {order.status}
        </li>
      ))}
    </ul>
    {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
  </div>
);

// Variant: Table
const Table = ({ block }: { block: OrdersBlockData }) => (
  <div className={`orders table impact-${block.impactLevel}`}>
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Order ID</th>
          <th className="border p-2">Total</th>
          <th className="border p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {block.orders?.map((order) => (
          <tr key={order.id}>
            <td className="border p-2">{order.id}</td>
            <td className="border p-2">${order.total}</td>
            <td className="border p-2">{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
  </div>
);

// Variant: Summary
const Summary = ({ block }: { block: OrdersBlockData }) => (
  <div className={`orders summary impact-${block.impactLevel}`}>
    <p>Total Orders: {block.orders?.length || 0}</p>
    {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
  </div>
);

// Main Component
const OrdersBlockComponent = ({ block }: { block: OrdersBlockData }) => {
  switch (block.variant) {
    case 'list':
      return <List block={block} />;
    case 'table':
      return <Table block={block} />;
    case 'summary':
      return <Summary block={block} />;
    default:
      return <List block={block} />;
  }
};

export default OrdersBlockComponent;