import { useEffect } from 'react';
import Link from 'next/link';
import { useOrdersStore } from '@/lib/models/__stores__/orders/orders.store';
import { Order, User } from '@/payload-types';

interface OrdersPageProps {
    user: User | any; // Adjust type based on your User type
    orders: Order[];
    error?: string;
  }
const OrdersScreen: React.FC<OrdersPageProps> = ({ user, orders, error }) => {
    // Handle unauthenticated user
    if (!user) {
      return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">You need to log in</h1>
          <p className="text-gray-600 mb-6">
            Please log in to view your orders.
          </p>
          <Link
            href="/login" // Payload's default login route
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Go to Login
          </Link>
        </div>
      );
    }
  
    // Handle error state
    if (error) {
      return (
        <div className="container mx-auto p-4">
          <p>Error: {error}</p>
        </div>
      );
    }
  
    // Handle case where there are no orders
    if (orders.length === 0) {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
          <p>You have no orders yet.</p>
        </div>
      );
    }
  
    // Render the orders table
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">${order.total.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{order.status || 'N/A'}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default OrdersScreen;