// import React from 'react';
// import InfoBlockComponent from '../InfoBlockComponent/InfoBlockComponent';

// export interface OrdersBlockData {
//   variant: 'list' | 'table' | 'summary';
//   impactLevel: 'low' | 'normal' | 'high';
//   orders?: { id: string; total: number; status: string }[]; // Example data structure
//   subBlocks?: any[];
// }

// // Variant: List
// const List = ({ block }: { block: OrdersBlockData }) => (
//   <div className={`orders list impact-${block.impactLevel}`}>
//     <ul className="space-y-2">
//       {block.orders?.map((order) => (
//         <li key={order.id} className="border p-2">
//           Order #{order.id} - ${order.total} - {order.status}
//         </li>
//       ))}
//     </ul>
//     {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
//   </div>
// );

// // Variant: Table
// const Table = ({ block }: { block: OrdersBlockData }) => (
//   <div className={`orders table impact-${block.impactLevel}`}>
//     <table className="w-full border-collapse">
//       <thead>
//         <tr>
//           <th className="border p-2">Order ID</th>
//           <th className="border p-2">Total</th>
//           <th className="border p-2">Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {block.orders?.map((order) => (
//           <tr key={order.id}>
//             <td className="border p-2">{order.id}</td>
//             <td className="border p-2">${order.total}</td>
//             <td className="border p-2">{order.status}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
//   </div>
// );

// // Variant: Summary
// const Summary = ({ block }: { block: OrdersBlockData }) => (
//   <div className={`orders summary impact-${block.impactLevel}`}>
//     <p>Total Orders: {block.orders?.length || 0}</p>
//     {block.subBlocks?.map((subBlock, i) => <InfoBlockComponent key={i} block={subBlock} />)}
//   </div>
// );

// // Main Component
// const OrdersBlockComponent = ({ block }: { block: OrdersBlockData }) => {
//   switch (block.variant) {
//     case 'list':
//       return <List block={block} />;
//     case 'table':
//       return <Table block={block} />;
//     case 'summary':
//       return <Summary block={block} />;
//     default:
//       return <List block={block} />;
//   }
// };

// export default OrdersBlockComponent;



"use client"
import { Package, ShoppingBag, TrendingUp } from "lucide-react"

export interface OrdersBlockData {
  variant: "list" | "table" | "summary"
  impactLevel: "low" | "normal" | "high"
  orders?: { id: string; total: number; status: string }[]
  subBlocks?: any[]
}

// Helper function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "text-green-600 bg-green-50"
    case "processing":
      return "text-blue-600 bg-blue-50"
    case "shipped":
      return "text-purple-600 bg-purple-50"
    case "cancelled":
      return "text-red-600 bg-red-50"
    case "pending":
      return "text-yellow-600 bg-yellow-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

// List variant component
const List = ({ block }: { block: OrdersBlockData }) => {
  const orders = block.orders || []

  // Impact level styling
  const containerClasses = {
    low: "space-y-2",
    normal: "space-y-3",
    high: "space-y-4",
  }

  const itemClasses = {
    low: "border border-gray-100 rounded p-2 flex items-center",
    normal: "border border-gray-200 rounded-md p-3 shadow-sm flex items-center",
    high: "border border-gray-300 rounded-lg p-4 shadow flex items-center hover:shadow-md transition-all duration-200",
  }

  const idClasses = {
    low: "text-sm font-medium",
    normal: "text-base font-medium",
    high: "text-lg font-bold",
  }

  const totalClasses = {
    low: "text-sm text-gray-600",
    normal: "text-base text-gray-700",
    high: "text-lg text-gray-800 font-medium",
  }

  const statusClasses = {
    low: "text-xs px-2 py-0.5 rounded-full",
    normal: "text-sm px-2.5 py-0.5 rounded-full",
    high: "text-sm px-3 py-1 rounded-full font-medium",
  }

  return (
    <div className={`w-full ${containerClasses[block.impactLevel]}`}>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className={itemClasses[block.impactLevel]}>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <span className={idClasses[block.impactLevel]}>Order #{order.id}</span>
                <span className={totalClasses[block.impactLevel]}>{formatPrice(order.total)}</span>
              </div>
              <div className="mt-1">
                <span className={`${statusClasses[block.impactLevel]} ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
            {block.impactLevel === "high" && (
              <button className="ml-4 text-primary hover:text-primary/80">View Details</button>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">No orders found</div>
      )}
    </div>
  )
}

// Table variant component
const Table = ({ block }: { block: OrdersBlockData }) => {
  const orders = block.orders || []

  // Impact level styling
  const tableClasses = {
    low: "min-w-full divide-y divide-gray-200 border border-gray-100",
    normal: "min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md shadow-sm",
    high: "min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow",
  }

  const headerClasses = {
    low: "bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2 px-3",
    normal: "bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider py-3 px-4",
    high: "bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider py-3 px-6",
  }

  const cellClasses = {
    low: "px-3 py-2 whitespace-nowrap text-sm",
    normal: "px-4 py-3 whitespace-nowrap text-sm",
    high: "px-6 py-4 whitespace-nowrap text-base",
  }

  const rowClasses = {
    low: "",
    normal: "hover:bg-gray-50",
    high: "hover:bg-gray-50 transition-colors duration-150",
  }

  const idClasses = {
    low: "text-gray-900",
    normal: "text-gray-900 font-medium",
    high: "text-gray-900 font-medium",
  }

  const totalClasses = {
    low: "text-gray-600",
    normal: "text-gray-700 font-medium",
    high: "text-gray-800 font-semibold",
  }

  const statusClasses = {
    low: "text-xs px-2 py-0.5 rounded-full",
    normal: "text-sm px-2.5 py-0.5 rounded-full",
    high: "text-sm px-3 py-1 rounded-full font-medium",
  }

  return (
    <div className="w-full overflow-x-auto">
      {orders.length > 0 ? (
        <table className={tableClasses[block.impactLevel]}>
          <thead>
            <tr>
              <th className={headerClasses[block.impactLevel]}>Order ID</th>
              <th className={headerClasses[block.impactLevel]}>Total</th>
              <th className={headerClasses[block.impactLevel]}>Status</th>
              {block.impactLevel === "high" && <th className={headerClasses[block.impactLevel]}>Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className={rowClasses[block.impactLevel]}>
                <td className={cellClasses[block.impactLevel]}>
                  <div className={idClasses[block.impactLevel]}>#{order.id}</div>
                </td>
                <td className={cellClasses[block.impactLevel]}>
                  <div className={totalClasses[block.impactLevel]}>{formatPrice(order.total)}</div>
                </td>
                <td className={cellClasses[block.impactLevel]}>
                  <span className={`${statusClasses[block.impactLevel]} ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                {block.impactLevel === "high" && (
                  <td className={cellClasses[block.impactLevel]}>
                    <button className="text-primary hover:text-primary/80">View Details</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-8 text-gray-500">No orders found</div>
      )}
    </div>
  )
}

// Summary variant component
const Summary = ({ block }: { block: OrdersBlockData }) => {
  const orders = block.orders || []

  // Calculate summary data
  const totalOrders = orders.length
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0)
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

  // Count orders by status
  const ordersByStatus = orders.reduce((acc: Record<string, number>, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {})

  // Impact level styling
  const containerClasses = {
    low: "grid grid-cols-1 md:grid-cols-3 gap-2",
    normal: "grid grid-cols-1 md:grid-cols-3 gap-4",
    high: "grid grid-cols-1 md:grid-cols-3 gap-6",
  }

  const cardClasses = {
    low: "border border-gray-100 rounded p-3 bg-white",
    normal: "border border-gray-200 rounded-md p-4 bg-white shadow-sm",
    high: "border border-gray-300 rounded-lg p-5 bg-white shadow hover:shadow-md transition-all duration-200",
  }

  const titleClasses = {
    low: "text-sm text-gray-500",
    normal: "text-base text-gray-600",
    high: "text-lg text-gray-700",
  }

  const valueClasses = {
    low: "text-xl font-medium mt-1",
    normal: "text-2xl font-semibold mt-2",
    high: "text-3xl font-bold mt-2",
  }

  const statusContainerClasses = {
    low: "mt-4 space-y-1",
    normal: "mt-6 space-y-2",
    high: "mt-8 space-y-3",
  }

  const statusItemClasses = {
    low: "flex justify-between items-center text-sm",
    normal: "flex justify-between items-center",
    high: "flex justify-between items-center font-medium",
  }

  return (
    <div className={`w-full ${containerClasses[block.impactLevel]}`}>
      {/* Total Orders */}
      <div className={cardClasses[block.impactLevel]}>
        <div className="flex items-start justify-between">
          <div>
            <p className={titleClasses[block.impactLevel]}>Total Orders</p>
            <p className={valueClasses[block.impactLevel]}>{totalOrders}</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            <ShoppingBag className="text-primary" size={block.impactLevel === "high" ? 24 : 20} />
          </div>
        </div>
      </div>

      {/* Total Sales */}
      <div className={cardClasses[block.impactLevel]}>
        <div className="flex items-start justify-between">
          <div>
            <p className={titleClasses[block.impactLevel]}>Total Sales</p>
            <p className={valueClasses[block.impactLevel]}>{formatPrice(totalSales)}</p>
          </div>
          <div className="p-2 bg-green-50 rounded-full">
            <TrendingUp className="text-green-600" size={block.impactLevel === "high" ? 24 : 20} />
          </div>
        </div>
      </div>

      {/* Average Order Value */}
      <div className={cardClasses[block.impactLevel]}>
        <div className="flex items-start justify-between">
          <div>
            <p className={titleClasses[block.impactLevel]}>Average Order</p>
            <p className={valueClasses[block.impactLevel]}>{formatPrice(averageOrderValue)}</p>
          </div>
          <div className="p-2 bg-blue-50 rounded-full">
            <Package className="text-blue-600" size={block.impactLevel === "high" ? 24 : 20} />
          </div>
        </div>
      </div>

      {/* Orders by Status */}
      {block.impactLevel !== "low" && Object.keys(ordersByStatus).length > 0 && (
        <div className={`${cardClasses[block.impactLevel]} md:col-span-3`}>
          <p className={titleClasses[block.impactLevel]}>Orders by Status</p>
          <div className={statusContainerClasses[block.impactLevel]}>
            {Object.entries(ordersByStatus).map(([status, count]) => (
              <div key={status} className={statusItemClasses[block.impactLevel]}>
                <span className={`px-2 py-0.5 rounded-full ${getStatusColor(status)}`}>{status}</span>
                <span>{count} orders</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Variant mapping
const variants = {
  list: List,
  table: Table,
  summary: Summary,
}

// Main component
const OrdersBlockComponent = ({ block }: { block: OrdersBlockData }) => {
  const VariantComponent = variants[block.variant]

  return (
    <section className="orders-block py-4">
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

export default OrdersBlockComponent

